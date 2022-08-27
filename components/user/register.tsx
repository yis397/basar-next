import React,{useState,useContext} from 'react'
import { Box,TextField,Grid,Chip,Button,Typography, Link } from '@mui/material'

import NextLink from 'next/link';
import {useForm} from "react-hook-form";
import { IMsg } from '../../interfaces';
import { AuthContext } from '../../context/authContext/authProvider';
import { useRouter } from 'next/router';




interface IData{
    name:string,
    apellido:string,
    email:string,
    password:string,
    password2:string,
}
export  function Register() {
    const ruta =useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<IData>();
    const {registrar}=useContext(AuthContext)
    const [isOk, setisOk] = React.useState(false)

    const  [error, seterror] = useState({valor:"",estado:false});
    const registro=async(datos:IData)=>{
        setisOk(true)
       const msg:string=await registrar(datos)
       if(msg.includes('Error')){
        setisOk(false)
        seterror({valor:msg,estado:true})
    return}
       ruta.push(ruta.query.p?.toString()||"/")

    }
  return (
    <Box sx={{height:"80vh",width:"50vw",background:"coral",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",marginTop:10}}> 
        <form  noValidate onSubmit={handleSubmit(registro)}>
                <Box sx={{ width: 350, padding:'10px 20px',background:"white",borderRadius:10,marginTop:5,paddingTop:3}}>
                    <Grid container spacing={2}>
                        <Typography variant='subtitle1' fontSize={20} fontWeight={"bold"} color={"coral"} component="h3" sx={{marginLeft:3}}>Vamos.. Registrate</Typography>
                        {
                            error.valor.length!=0?<Grid item xs={12}>
                            <Chip 
                                label={error.valor}
                                color={
                                    error.estado?"error":"success"
                                }
                                className="fadeIn"
                            />
                        </Grid>:null
                        }
                        
                        
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                label="Nombre"
                                variant="filled"
                                fullWidth 
                                {...register('name',{
                                    required:'Campo requerido'
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
  
                            </Grid>

                            <Grid item xs={12}>
                            <TextField
                                type="text"
                                label="Apellido"
                                variant="filled"
                                fullWidth 
                                {...register('apellido',{
                                    required:'Campo requerido'
                                })}
                                error={!!errors.apellido}
                                helperText={errors.apellido?.message}
                                
                            />
                            </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                label="Correo"
                                variant="filled"
                                fullWidth 
                                {...register('email',{
                                    required:'Campo requerido',
                                    pattern:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                variant="filled"
                                fullWidth
                                {...register('password',{
                                    required:'Campo requerido'
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Verifica contraseña"
                                type='password'
                                variant="filled"
                                fullWidth
                                {...register('password2',{
                                    required:'Campo requerido'
                                })}
                                error={!!errors.password2}
                                helperText={errors.password2?.message}
                                
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                color="secondary"
                                className='circular-btn'
                                size='large'
                                disabled={isOk}
                                fullWidth>
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink 
                                href={ "*" } 
                                passHref>
                                <Link underline='always'>
                                    ¿Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
    </Box>
  )
}
