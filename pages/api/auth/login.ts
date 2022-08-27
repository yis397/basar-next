import { NextApiRequest, NextApiResponse } from "next"
import { jwst, respJson } from "../../../helpers"
import Usuario from '../../../models/Usuario';
import bcrypt from 'bcryptjs';
import { db } from "../../../services/db";
import { autorizacion } from '../../../helpers/autorizacion';


export default function handler(req: NextApiRequest,res: NextApiResponse) 
  {
    
    switch (req.method) {
      case 'POST':
        
        return login(req,res)
      case 'GET':
        
        return isUser(req,res)   
      default:
        return respJson('error en metodo',400,res)
    }
  }
  const login=async(req: NextApiRequest,res: NextApiResponse)=>{
     const {password,correo}=req.body
     db.connect()
     const exist=await Usuario.findOne({correo})
     db.disconnect()
     if(!exist)return respJson('error en usuario',400,res)
     if(!bcrypt.compare(password,exist.password!))return respJson('error en contraseña',400,res)
     const token=jwst.signToken(exist)
     res.status(200).json({
        msg:'ok',
       token,
       user:{
      nombre:exist.nombre,
      apellido:exist.apellido,
      rol:exist.rol,
      direccion:exist.direccion,
      carrito:exist.carrito
    }
     })
  }

  const isUser=async(req: NextApiRequest,resp: NextApiResponse)=>{
    const idUser=await autorizacion(req)
    if(!idUser)respJson('error en autenticacion',400,resp)
   
    db.connect()
     const exist=await Usuario.findOne({_id:idUser})
     db.disconnect()
     if(!exist)return respJson('error en usuario',400,resp)

     const token=jwst.signToken(exist)
     resp.status(200).json({
      msg:'ok',
     token,
     user:{
    nombre:exist.nombre,
    apellido:exist.apellido,
    rol:exist.rol,
  }})
    
  }