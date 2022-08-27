import mongoose from 'mongoose';
import { IOrden } from '../interfaces/models';


const schemaOrden=new mongoose.Schema({
   usuario:{type:mongoose.Schema.Types.ObjectId,ref:'Usuario',required:true},
   cliente:{type:mongoose.Schema.Types.ObjectId,ref:'Usuario',required:true},
   direccion: {
    estado   : { type: String, required: true },
    ciudad  : { type: String },
    codigo       : { type: String, required: true },
    direccion      : { type: String, required: true },
    tel     : { type: String, required: true },
},
   items:[{
    productID:{type:mongoose.Schema.Types.ObjectId,ref:'Producto',required:true},
    cantidad:{type:Number,required:true},
    precioUbicado:{type:Number,required:true},
    img:{type:String},
    nombre:{type:String},
    slug:{type:String},
   }],
   estado: {
    type: String,
    default: 'procesando',
    emun: ['cancelado', 'procesando','enviado']
},
   precioEnvio:{type:Number,required:true},
   precioTotal:{type:Number,required:true},
   creado:{type:Date,default:Date.now()},
})
const Orden:mongoose.Model<IOrden>=mongoose.models.Orden04||mongoose.model('Orden04',schemaOrden);

export default Orden;