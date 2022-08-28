import React, { createContext ,useReducer,FC} from 'react';
import Cookies from 'js-cookie';
import { IUser,IRegistro, IMsg, ILogin } from '../../interfaces';
import { apiBasar } from '../../services/http/apiBasar';
import { authReducer } from './authReducer';
import { useRouter } from 'next/router';
import { AnyAaaaRecord } from 'dns';


interface AuthProps {
    isLoggedIn: boolean;
    user?: IUser;
    registrar:(data:any)=>Promise<string>
    login:(data:any)=>Promise<string>
    logout:()=>void,
    updateDireccion:(direccion:any)=>Promise<string>,
    addCarritoUser:(id:string)=>Promise<any>,
    updateCarrito:(lista:string[])=>void,
    createOrden:(data:any)=>Promise<boolean>,
    updateOrden:(idOrden:string,tipo:'put'|'delet')=>Promise<boolean>
    
}
export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}
const INICIAL:AuthState={
  isLoggedIn:false,
  user:undefined
}
interface Prop{
    children:JSX.Element
}
export const AuthContext = createContext({} as AuthProps );
export const AuthProvider=({children}:Prop) =>{
    const route = useRouter();
    const [state, dispatch] = useReducer(authReducer,INICIAL);
    React.useEffect(() => {
        isLogead() 
    }, []);
    const isLogead=async()=>{

        if (!state.user) dispatch({type:'Logout'})
        
        if (Cookies.get('token')&&!state.isLoggedIn) {
            try {
                
                const resp= await apiBasar.get('auth/login')
                if((resp.data.msg as string).includes('Error'))return route.push('/auth/login')
                const direccion=JSON.parse(Cookies.get('direccion')??"" )
                
                dispatch({type:'Login',payload:{...resp.data.user,direccion}})
                const carrito=JSON.parse(Cookies.get('carrito')??"" )
                if (carrito)dispatch({type:'add-Carrito',payload:carrito})
             
                
            } catch (error) {
                route.push('/')
            }
        }
    }
    const registrar=async(data:any)=>{
      
      try {
        const resp= await apiBasar.post('auth/register',{...data,rol:"user"})
        Cookies.set('token',resp.data.token)
        dispatch({type:'Login',payload:{...resp.data.user}})
        return  resp.data.msg
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
          return  (errorMessage as any).response.data.msg??'Error en sitema'
        }
       return 'error'
      }
    }
    const login=async(data:any)=>{
        try {
            const resp= await apiBasar.post('auth/login',{...data})
            Cookies.set('token',resp.data.token)
            if(resp.data.user.direccion.tel)Cookies.set('direccion',JSON.stringify(resp.data.user.direccion))
            Cookies.set('carrito',JSON.stringify(resp.data.user.carrito))
            dispatch({type:'Login',payload:{...resp.data.user}})
            return  resp.data.msg
          } catch (error) {
            
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
              errorMessage = error.message;
              return  (errorMessage as any).response.data.msg??'Error en sitema'
            }
           return 'error'
          }
    }
    const logout=()=>{
        dispatch({type:'Logout'})
        Cookies.remove('token')
        Cookies.remove('direccion')
        Cookies.remove('carrito')
        route.push('/')
    }
    const updateDireccion=async(direccion:any)=>{
        try {
            const resp=await apiBasar.post('auth/perfil',{direccion})
            
            if (resp.data.msg==='ok') {
                Cookies.set('direccion',JSON.stringify(direccion))
                dispatch({type:'Update-Direccion',payload:direccion})
            }
            return resp.data.msg
        } catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
              errorMessage = error.message;
              return  (errorMessage as any).response.data.msg??'Error en sitema'
            }
           return 'error'
        }
      
    }
    const addCarritoUser=async(id:string)=>{
    
        try {
            const resp=await apiBasar.post('carrito',{idProducto:id})
            if ((resp.data.msg as string).includes('Error'))return route.push('/')
            let list:string[];
            if (resp.data.exist) {
                state.user?.carrito??[].filter(e=>e!==id) 
            if((state.user?.carrito??[]).length===1)list=[]
            }else{
                list=state.user?.carrito??[]
                list.push(id)
            }
            dispatch({type:'add-Carrito',payload:list!})
            Cookies.set('carrito',JSON.stringify(list!))
            return resp.data.exist
        } catch (error) {
            return false
        }
    }
   const updateCarrito=(lista:string[])=>{
    Cookies.set('carrito',JSON.stringify(lista))
    dispatch({type:'add-Carrito',payload:lista})
   }
   const createOrden=async(data:any)=>{
    let items=[]
     for (let i = 0; i < Object.keys(data).length; i++) {
        items.push(data[Object.keys(data)[i]])
     }
     try {
         const resp=await apiBasar.post('orden',{items,direccion:state.user?.direccion})
         Cookies.remove('carrito')
         dispatch({type:'add-Carrito',payload:[]})
         setTimeout(() => {
            route.push('/')
         }, 500);
        return true
     } catch (error) {
        return false
     }
   }
   const updateOrden=async(idOrden:string,tipo:'put'|'delet')=>{
    if (tipo=='put') {
        
        try {
          await apiBasar.put('orden/'+idOrden)
          return true
        } catch (error) {
          return false
        }
    }
    try {
        await apiBasar.delete('orden/'+idOrden)
        return true
      } catch (error) {
        return false
      }
   }
    return (
        <AuthContext.Provider
        value={{
            ...state,
            registrar,
            logout,
            login,
            updateDireccion,
            addCarritoUser,
            updateCarrito,
            createOrden,
            updateOrden
            
        }}>
        {children}
        </AuthContext.Provider>
    );
}

