import { NextApiRequest } from "next"
import { jwst } from './index';
export const autorizacion=async(req:NextApiRequest)=>{
    const {token}=req.cookies??req.headers
    if(!token)return null
    try {
        const idUser=await jwst.isValidToken(token as string)
        return idUser
        
    } catch (error) {
        return null
    }
 
}