import { NextApiRequest, NextApiResponse } from "next"
import { jwst, respJson } from "../../../helpers"
import Usuario from '../../../models/Usuario';
import { db } from "../../../services/db";

export default function handler(req: NextApiRequest,res: NextApiResponse) 
  {
    switch (req.method) {
      case 'GET':
        
        return getPerfil(req,res)
      case 'POST':
        
        return updatePerfil(req,res)
    
      default:
        return respJson('error en metodo',400,res)
    }
  }

  const getPerfil=async(req: NextApiRequest,res: NextApiResponse)=>{
    
    const {token}=req.headers??req.cookies;
    if(!token)respJson('error en autenticacion',400,res)
    const idUser=await jwst.isValidToken(token as string)
    await db.connect()
    const user=await Usuario.findOne({_id:idUser})
    await db.disconnect()

    if(!user)respJson('error en usuario',400,res)
    return res.status(200).json({
        msg:"ok",
        user
    })
  }
  const updatePerfil=async(req: NextApiRequest,res: NextApiResponse)=>{
    const {token}=req.cookies??req.headers;
    const {direccion}=req.body
 
    if(!token)respJson('error en autenticacion',400,res)
    const idUser=await jwst.isValidToken(token as string)
    await db.connect()
    try {
        
        await Usuario.updateOne({_id:idUser},{direccion:{...direccion}})
    } catch (error) {
        respJson('error en actualizar',400,res)
        console.log("error");
    }
    await db.disconnect()
    
    return res.status(200).json({
        msg:"ok",
    })
  }