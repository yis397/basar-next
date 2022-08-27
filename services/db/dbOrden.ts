import { jwst } from "../../helpers";
import { db } from "."
import Producto from "../../models/Producto";
import Orden from "../../models/Orden";

export const getCompras=async(token:string)=>{
    const idUser=await jwst.isValidToken(token)
    db.connect();
    const compras=await Orden.find({'cliente':{$in:idUser}}).select('items precioEnvio precioTotal estado creado').lean()
    db.disconnect()

    return JSON.parse(JSON.stringify(compras))
 }

 export const getVentas=async(token:string)=>{
    const idUser=await jwst.isValidToken(token)
    db.connect();
    const compras=await Orden.find({'usuario':{$in:idUser}}).select('items precioEnvio precioTotal estado creado').lean()
    db.disconnect()

    return JSON.parse(JSON.stringify(compras))
 }