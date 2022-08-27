import { db } from "."
import { jwst } from "../../helpers";
import Producto from '../../models/Producto';
import Usuario from "../../models/Usuario";

export const getSlugsProducts=async()=>{
   db.connect();
   const slugs=await Producto.find().select('slug -_id').lean()
   db.disconnect();
   return slugs
}
export const getProductBySlug=async(slug:string)=>{
    db.connect();
    const product=await Producto.findOne({slug})
    db.disconnect();
    return JSON.parse( JSON.stringify( product ) )
 }
export  const getCarrito=async(token:any)=>{

   const idUser=await jwst.isValidToken(token)
   await db.connect()
   const user=await Usuario.findOne({_id:idUser})
   const products=await Producto.find({"_id":{$in:user?.carrito}}).select('img nombre precio cantidad slug _id').lean()
   await db.disconnect() 

   return JSON.parse( JSON.stringify( products ) )
}
export const misProduct=async(token:any)=>{
   const user=await jwst.isValidToken(token)
   const products=await Producto.find({vendedor:user})
   return JSON.parse( JSON.stringify( products ) )
}