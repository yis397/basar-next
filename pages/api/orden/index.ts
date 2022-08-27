import { NextApiRequest,NextApiResponse } from "next";
import { respJson } from "../../../helpers";
import { autorizacion } from '../../../helpers/autorizacion';
import { IItem, IProducto } from '../../../interfaces/models';
import Producto from '../../../models/Producto';
import { db } from "../../../services/db";
import Orden from '../../../models/Orden';
import Usuario from '../../../models/Usuario';

export default function handler(req:NextApiRequest,resp:NextApiResponse) {
  switch (req.method) {
    case 'POST':
        return addOrden(req,resp)
    case 'GET':
        return getOrdens(req,resp)

    default:
        return respJson('error en metodo',400,resp)
  }

}
const getOrdens=async(req:NextApiRequest,resp:NextApiResponse)=>{
  const idUser=await autorizacion(req)
   if(!idUser)respJson('error en autenticacion',400,resp)
   await db.connect();
   const ordenes=await Orden.find({cliente:idUser})
   const vendido=await Orden.find({usuario:idUser})
   await db.disconnect();
   console.log(ordenes.length);
   return resp.status(200).json({
    ordenes,
    vendido
   })
}
const addOrden=async(req:NextApiRequest,resp:NextApiResponse)=>{
   const idUser=await autorizacion(req)
   if(!idUser)respJson('error en autenticacion',400,resp)
   const {items,direccion}=req.body
   const idItems=(items as [IItem]).map(e=>e.productID)
   await db.connect();
   const products=await Producto.find({"_id":{$in:idItems}})
   await db.disconnect();
   let produ=groupBy(products,'vendedor',items)
   await db.connect();
   for (let i = 0; i < Object.keys(produ).length; i++) {
    let preciotot=0
    let listItems=[]
    for (let j = 0; j < produ[Object.keys(produ)[i]].length; j++) {
        preciotot+= produ[Object.keys(produ)[i]][j].precioT
        listItems.push({productID:produ[Object.keys(produ)[i]][j].id,cantidad:produ[Object.keys(produ)[i]][j].cantidad,
            precioUbicado:produ[Object.keys(produ)[i]][j].precio,
            img:produ[Object.keys(produ)[i]][j].img,
            nombre:produ[Object.keys(produ)[i]][j].nombre,
            slug:produ[Object.keys(produ)[i]][j].slug,
          })
    }
    
    await new Orden({
        usuario:produ[Object.keys(produ)[i]][0].vendedor,
        cliente:idUser,
        items:listItems,
        precioTotal:preciotot+50,
        precioEnvio:50,
       direccion
    }).save()
    
    preciotot=0
    listItems=[]
   }
   await Usuario.updateOne({_id:idUser},{carrito:[]})
   await db.disconnect();

   
   return resp.status(200).json({
    msg:'ok'
   })
}

function groupBy(objectArray:any, property:any,items:[IItem]) {
    return objectArray.reduce(function (accumulator:any, currentObject:any) {
      let key = currentObject[property.toString()];
      let cantidad=0;
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      for (let i = 0; i < (items as [IItem]).length; i++) {
        if (items[i].productID===currentObject.id) {
            cantidad=items[i].cantidad
        }
        
      }
      accumulator[key].push({
        nombre:currentObject.nombre,
        vendedor:currentObject.vendedor,
        id:currentObject.id,
        cantidad:cantidad,
        precio:currentObject.precio,
        img:currentObject.img,
        slug:currentObject.slug,
        precioT:cantidad*currentObject.precio,

      });
      return accumulator;
    }, {});
  }
