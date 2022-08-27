export interface IRegistro{
    nombre:string,
    apellido:string,
    correo:string,
    password:string,
    password2:string,
}
export interface ILogin{

    correo:string,
    password:string,

}
export interface IMsg{
    valor :string,
    estado:string,
}