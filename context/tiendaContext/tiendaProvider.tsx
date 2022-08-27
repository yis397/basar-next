import React, { createContext ,useReducer,FC} from 'react';
import Cookies from 'js-cookie';
import { apiBasar } from '../../services/http/apiBasar';
import { useRouter } from 'next/router';
import { IProducto } from '../../interfaces/models';
import { tiendaReducer } from './tiendaReducer';


interface TiendaProps {
    carrito:[],
    addOneCarrito:(data:IProducto)=>void
    
}
export interface TiendaState {
    carrito: any

}
const INICIAL:TiendaState={
    carrito:[],

}
interface Prop{
    children:JSX.Element
}
export const TiendaContext = createContext({} as TiendaProps );
export const TiendaProvider=({children}:Prop) =>{
    const route = useRouter();
    const [state, dispatch] =useReducer (tiendaReducer,INICIAL);
    React.useEffect(() => {
        initCarrito()
    }, []);
    const initCarrito=()=>{
        if (state.carrito.lenght==0) {
            const carr=JSON.parse(Cookies.get('carrito')??"")
            if(carr==="")return
            dispatch({type:'add-tcarrito',payload:carr})
        }
    }
    const addOneCarrito=async(data:IProducto)=>{
        const resp=await apiBasar.post('carrito',{idProducto:data._id})
        if ((resp.data.msg as string).includes('Error'))return route.push('/')
        dispatch({type:'add-carrito',payload:data})
    }


    return (
        <TiendaContext.Provider
         value={{
            ...state,
            addOneCarrito
            
        }}>
        {children}

        </TiendaContext.Provider>
    );
}

