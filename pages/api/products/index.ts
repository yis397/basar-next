
import type { NextApiRequest,NextApiResponse } from 'next';

import { db } from '../../../services/db';
import Producto from '../../../models/Producto';
import { jwst } from '../../../helpers';
import { respJson } from '../../../helpers/respJson';
import { IProducto } from '../../../interfaces/models';




export default function handler(req:NextApiRequest,resp:NextApiResponse) {

  switch (req.method) {
    case 'POST':
        
        return addProduct(req,resp);
    case 'GET':
        
        return getProductos(resp);
    default:
        return resp.status(400).json({
            message: 'Bad request'
        })
  }
}


const getProductos=async(resp:NextApiResponse)=>{
    
    await db.connect()
    const products=await Producto.find().select('nombre descripcion precio marca img tags slug -_id').lean();
    const random=await Producto.aggregate(
        [ { $sample: { size: 3 } } ]
     )
    await db.disconnect()
    return resp.status(200).json({
        data:{products,random},
        msg:'ok'
    })
}
const addProduct=async(req:NextApiRequest,resp:NextApiResponse)=>{
    let vendedor:string;
    const {token}=req.cookies??req.headers;
    const {nombre,cantidad,precio,marca,descripcion,tags,img,}=req.body as IProducto
   
    try {
        
        vendedor=await jwst.isValidToken(token as string);
        
    } catch (error) {

        return respJson('Error en validacion',401,resp)
    }
    db.connect()
    try {
        
        await db.connect()
        const newProduct=new Producto({vendedor:vendedor.toLowerCase(),nombre:nombre.toLowerCase(),cantidad,precio,marca:marca?marca.toLowerCase():"",descripcion,slug:nombre.replace(" ","-").toLowerCase()+'_'+(marca??"").toLowerCase(),tags,img})
        newProduct.save()
        await db.disconnect()
    } catch (error) {
        console.log("nop")
        return respJson('Error en Implementacion',401,resp)
    }
    db.disconnect()
    return resp.status(200).json({
        ok:true
    })

}











