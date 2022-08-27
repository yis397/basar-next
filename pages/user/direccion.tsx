import React, { useContext } from 'react'
import { Box ,TextField,Typography,OutlinedInput,Button} from '@mui/material'
import HomeLayout from '../../components/layout'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/authContext/authProvider';
interface IDireccion{
  estado:string,
  ciudad:string,
  codigo:string,
  direccion:string,
  tel:string,
}
 const DireccionPage=()=> {
  const router = useRouter();
  const{updateDireccion,user}=useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm<IDireccion>();
  const uploadProducto=async(data:IDireccion)=>{
    const msg=await updateDireccion(data)
    if(!msg.includes('Erro'))return router.back()
    
  }
  return (
    <HomeLayout titulo={'datos'} descripcion={'datos'}  >
             <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"80"}}>

<Box
component="form"

sx={{
  '& .MuiTextField-root': { m: 1, width: '25ch' },
   padding:5,
   backgroundColor:'whitesmoke',
   boxShadow:"inherit",
   height:"80vh",
   width:"90vw",
   
}}
onSubmit={handleSubmit(uploadProducto)}
noValidate
autoComplete="off"
>
<Typography variant='h3' sx={{paddingBottom:5,fontWeight:'bold',color:'coral',textAlign:'center'}}>
  Ingrese sus Datos de Envio
</Typography>
  
  <div>

   <TextField
   helperText=" "
   id="demo-helper-text-aligned-no-helper"
   label="Nombre"
   defaultValue={user?.nombre}
   
  />
  <TextField
   helperText=" "
   id="demo-helper-text-aligned-no-helper"
   label="Apellido"
   defaultValue={user?.apellido}
  />
  </div>


  <div>

   <TextField
   id="demo-helper-text-aligned-no-helper"
   label="Estado"
   {...register('estado',{
    required:'Campo requerido'
   })}
   error={!!errors.estado}
   helperText={errors.estado?.message}
   defaultValue={user?.direccion?user?.direccion.estado:''}
  />
  <TextField
   id="demo-helper-text-aligned-no-helper"
   label="Ciudad"
   {...register('ciudad',{
    required:'Campo requerido'
   })}
   error={!!errors.ciudad}
   helperText={errors.ciudad?.message}
   defaultValue={user?.direccion?user?.direccion.ciudad:''}
  />
  <TextField

   id="demo-helper-text-aligned-no-helper"
   label="C.p"
   {...register('codigo',{
    required:'Campo requerido'
   })}
   error={!!errors.codigo}
   helperText={errors.codigo?.message}
   defaultValue={user?.direccion?user?.direccion.codigo:''}
  />
  <TextField
   id="demo-helper-text-aligned-no-helper"
   label="tel"
   {...register('tel',{
    required:'Campo requerido'
   })}
   error={!!errors.tel}
   helperText={errors.tel?.message}
   defaultValue={user?.direccion?user?.direccion.tel:''}
  />
  </div>
  <TextField 
    id="demo-helper-text-aligned-no-helper"
    label="Calle completa"
    fullWidth
    {...register('direccion',{
      required:'Campo requerido'
     })}
     error={!!errors.direccion}
     helperText={errors.direccion?.message}
     defaultValue={user?.direccion?user?.direccion.direccion:''}
  />
 <Box sx={{weight:"100vw",height:20,display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:5}}>
<Button variant="contained" type='submit'  size="large" sx={{fontSize:10,backgroundColor:"coral",height:50}}><Typography variant="button">
  Confirmar  Datos</Typography></Button>
  <Button onClick={()=>router.push('/')} variant="contained"  size="large" sx={{fontSize:10,backgroundColor:"red",height:50}}><Typography variant="button">
  Cancelar</Typography></Button>
</Box>
 


</Box>
 </Box>
    </HomeLayout>
  )
}
export default DireccionPage
