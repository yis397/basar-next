import Usuario from '../models/Usuario';
export interface IUser {
    id?     : string;
    nombre     : string;
    apellido     : string;
    correo?    : string;
    password?: string;
    rol?    : string;
    estado?:boolean;
    creado ?  :string;
    direccion?:IDireccion;
    carrito?:string[]
}
export interface IProducto{
    _id:string,
    nombre:string,
    cantidad:number,
    precio:number,
    img?:string,
    vendedor?:string,
    marca?:string,
    tags?:tags,
    slug:string,
    descripcion?:string,
    precioTotal?:number,
}
export interface IOrden{
    _id:string
    usuario:string,
    cliente:string,
    direccion:IDireccion,
    items:[IItem],
    estado:Testado,
    creado:string
}
interface IDireccion{
    estado:string,
    ciudad:string,
    codigo:string,
    direccion:string,
    tel:string,
    precioEnvio?:number,
    precioTotal?:number,
}
export interface IItem{
    productID:string,
    nombre:string,
    slug:string,
    img:string,
    cantidad:number,
    precioUbicado?:number
}
type Testado='cancelado'| 'procesando'|'enviado';
type tags=
    |"electronica"
    |"ropa"
    |"alimentos"
