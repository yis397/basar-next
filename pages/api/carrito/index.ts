import type { NextApiRequest,NextApiResponse } from 'next';
import { db } from '../../../services/db';
import Producto from '../../../models/Producto';
import { autorizacion } from '../../../helpers';
import { respJson } from '../../../helpers/respJson';

import Usuario from '../../../models/Usuario';
import { Product } from '../../../components/productos/Product';




export default function handler(req:NextApiRequest,resp:NextApiResponse) {

  switch (req.method) {
    case 'POST':
        
        return addCarrito(req,resp);
    case 'GET':
        
        return getCarrito(req,resp)
    default:
        return respJson('error en metodo',400,resp)
  }

}
const addCarrito=async(req:NextApiRequest,resp:NextApiResponse)=>{
  
    const idUser=await autorizacion(req);
   
    let isexist=false
    if(!idUser)return respJson('error en autenticacion',400,resp)
    const {idProducto}=req.body;
    
    const exist=await Producto.findOne({_id:idProducto})

    if(!exist)return respJson('error en producto ',500,resp)
    try {
        
        await db.connect()
        const user=await Usuario.findOne({_id:idUser})
        let newList;
        if((user?.carrito??[]).includes(idProducto)){
          if ((user?.carrito??[]).length===1) {
            newList=[]
          }
          newList=(user?.carrito??[]).filter(e=>
            e.toString()!=idProducto)
          
         
          isexist=true
        }else{
            isexist=false
        newList=[...(user?.carrito??[]),idProducto]
        }
  
        await Usuario.updateOne({_id:idUser},{carrito:newList})
  
        await db.disconnect()

        
        return resp.status(200).json({
          msg:'ok',
          exist:isexist
      })

    } catch (error) {

        respJson('error en servidor',400,resp)
    }


}
const getCarrito=async(req:NextApiRequest,resp:NextApiResponse)=>{
    const idUser=await autorizacion(req);
    if(!idUser)respJson('error en autenticacion',400,resp)
    await db.connect()
    const user=await Usuario.findOne({_id:idUser})
    const products=await Producto.find({"_id":{$in:user?.carrito}}).select('img nombre precio cantidad slug _id').lean()
    await db.disconnect()
    return resp.status(200).json({msg:'ok',products})
}
