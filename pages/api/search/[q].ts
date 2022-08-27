import { NextApiRequest,NextApiResponse } from "next";
import Producto from '../../../models/Producto';
import { db } from "../../../services/db";

export default async function handler(req:NextApiRequest,resp:NextApiResponse){

    const { q = '' } = req.query
    await db.connect()
    const lista=await Producto.find({nombre:{ $regex: `^${q.toString().toLowerCase()}`}}).select('nombre slug -_id')
    .lean();
    await db.disconnect()
    resp.status(200).json({
        lista
    })
    
}