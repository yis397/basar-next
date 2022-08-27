import mongoose, {Schema, model, Model } from 'mongoose';
import { IProducto } from '../interfaces';



const productSchema = new Schema({
    nombre:{
        type:String,
        required:[true,"nombre requerido"]
    },
    cantidad:{
        type:Number,
        required:[true,"cantidad requerido"]
    },
    precio:{
        type:Number,
        required:[true,"precio requerido"]
    },
    img:{
        type:String,
    },
    vendedor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Usuario"
    },
    creado:{
        type:Date,
        default:Date.now()
    },
    marca:{
        type:String,
        required:[true,"Marca requerido"]
    },
    slug:{
        type:String,
        required:[true,"Slug requerido"]
    },
    tags:{
        type: String,
        enum: {
            values: ['electronica','ropa','alimentos'],
            message: '{VALUE} no es un tipo válido'
        }
    },
    descripcion:{
        type: String,
        required:[true,"descripcion requerido"]
    }

});


productSchema.index({ nombre: "text" });

/* let Producto:mongoose.Model<IProducto, {}, {}, {}>;
if (mongoose.models.Product) {
    delete mongoose.models.Product
     Producto = mongoose.models.Product|| model('Producto', productSchema );
}else{
    delete mongoose.models.Producto
    Producto = mongoose.models.Product|| model('Producto', productSchema );
} */
const Producto: Model<IProducto> = mongoose.models.Producto || model('Producto', productSchema );
export default Producto

