import { NextApiRequest,NextApiResponse } from "next";
import { respJson } from "../../../helpers";
import { autorizacion } from '../../../helpers/autorizacion';
import { IItem, IProducto } from '../../../interfaces/models';
import Producto from '../../../models/Producto';
import { db } from "../../../services/db";
import Orden from '../../../models/Orden';
import Usuario from '../../../models/Usuario';

export default function handler(req:NextApiRequest,resp:NextApiResponse) {
    console.log(req.method);
  switch (req.method) {
    case 'DELETE':
        return cancelarOrden(req,resp)
    case 'PUT':
      return enviarOrden(req,resp)
    default:
        return respJson('error en metodo',400,resp)
  }

}

  const cancelarOrden=async(req:NextApiRequest,resp:NextApiResponse)=>{
    const idUser=await autorizacion(req)
    if(!idUser)respJson('error en autenticacion',400,resp)
    const {id}=req.query
    await db.connect()
    await Orden.updateOne({_id:id},{estado:'cancelado'})
    await db.disconnect()
    resp.status(200).json({
      msg:'ok'
    })
  }
  const enviarOrden=async(req:NextApiRequest,resp:NextApiResponse)=>{
    const idUser=await autorizacion(req)
    if(!idUser)respJson('error en autenticacion',400,resp)
    const {id}=req.query
    await db.connect()
    await Orden.updateOne({_id:id},{estado:'enviado'})
    await db.disconnect()
    resp.status(200).json({
      msg:'ok'
    })
  }