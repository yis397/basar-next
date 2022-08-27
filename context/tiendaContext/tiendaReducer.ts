import {TiendaState} from './tiendaProvider'
import { IProducto } from '../../interfaces/models';

type TiendaActionType = 
   | { type: 'add-carrito', payload: IProducto }
   | { type: 'add-tcarrito', payload: [IProducto] }


export const tiendaReducer = ( state: TiendaState, action: TiendaActionType ): TiendaState => {

   switch (action.type) {
        case 'add-carrito':
            return {
                carrito:[...state.carrito,action.payload]
            }
        case 'add-tcarrito':
            return {
                carrito:action.payload
            }


       default:
          return state;
   }

}