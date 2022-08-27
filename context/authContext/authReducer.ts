
import { IUser } from '../../interfaces';
import { AuthState } from './authProvider';



type AuthActionType = 
   | { type: 'Login', payload: IUser } 
   | { type: 'Logout' } 
   | { type: 'Update-Direccion',payload:any } 
   | { type: 'add-Carrito',payload:string[] } 


export const authReducer = ( state: AuthState, action: AuthActionType ): AuthState => {

   switch (action.type) {
        case 'Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }

        case 'Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined,
            }
        case 'Update-Direccion':
            return {
                ...state,
                user:{...state.user!,direccion:action.payload}
            }
        case 'add-Carrito':
        
            return {
                ...state,
                user:{...state.user!,carrito:action.payload??""}
            }


       default:
          return state;
   }

}