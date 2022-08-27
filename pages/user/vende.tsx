import { GetServerSideProps, NextPage } from 'next';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, Link, CardMedia, IconButton, Stack } from '@mui/material';
import React from 'react';

import HomeLayout from '../../components/layout/HomeLayout';
import { IOrden, IProducto,  } from '../../interfaces/models';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { apiBasar } from '../../services/http/apiBasar';
import { dbProduct } from '../../services/db';
import NextLink from 'next/link';
import CardProduct from '../../components/productos/CardProduct';
import { PhotoCamera } from '@mui/icons-material';


interface IProductodata{
    nombre:string,
    marca:string,
    cantidad:number,
    precio:number,
    tags:string,
    descripcion:string,
  }
  interface Props{
    products:IProducto[]
  }

  const VendePage:NextPage<Props>=({products})=> {
 
    const router = useRouter();
    const [isOk, setisOk] = React.useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<IProductodata>();
    const [tags,setTags]=React.useState("electronica")
    const inputFileRef = React.useRef<HTMLInputElement | null>(null);

      const uploadProducto=async(data:IProductodata)=>{
        if (!inputFileRef.current?.files?.length) {
          alert('Please, select file you want to upload');
          return;
      }
      setisOk(true)
      const formData = new FormData();
      Object.values(inputFileRef.current.files).forEach(file => {
          formData.append('file', file);
      })

        const url=await apiBasar.post('products/addProduct',formData)
        if(!url.data.ok)return setisOk(false)
        const resp=await apiBasar.post('products/',{...data,img:url.data.url,tags})
        if(resp.data.ok)router.push('/')
  
      }

    return (

        <HomeLayout titulo={'vende ahora'} descripcion={'vende y diviertete'}>
<Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"80",flexDirection:'column'}}>
    <Box sx={{ width: '100%',p:5,paddingTop:10,   backgroundColor:'whitesmoke',borderRadius:0,height:"80vh",marginTop:50}}>
      <Typography sx={{textAlign:"center",fontWeight:"bold",color:'coral',fontSize:25}}>
        Tus Productos en Venta
      </Typography>
      {
        (products as IProducto[]).length===0
        ?      <Typography sx={{textAlign:"center",fontWeight:"bold",color:'coral',fontSize:25}}>
        No tiene productos en venta
      </Typography>
        :
    <Grid container spacing={4} sx={{height:"auto"}}>
        {
           products.map((e,i)=> (
            <CardProduct 
                key={i}
                    product={e} 
                />
            ))
        }
    </Grid>
      }
    </Box>

    <Box sx={{ width: '100%',p:5,paddingTop:10,   backgroundColor:'whitesmoke',}}>
    <Typography sx={{textAlign:"center",fontWeight:"bold",color:'coral',fontSize:25}}>
        Vende el producto que tu quieras
      </Typography>

    <form  noValidate onSubmit={handleSubmit(uploadProducto)}>
    <Stack direction="row" alignItems="center" spacing={2} display="flex" justifyContent="center" marginTop={10} marginBottom={5}>
{/*       <Button variant="contained" component="label">
        Upload
        <input ref={inputFileRef} hidden name="myfile" accept="image/*"  type="file" />
      </Button> */}
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input ref={inputFileRef} hidden accept="image/*" type="file" name="myfile" />
        <PhotoCamera />
      </IconButton>
    </Stack>
      

   <div>
   <TextField
          label="nombre"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          {...register('nombre',{
            required:'Campo requerido'
           })}
           error={!!errors.nombre}
           helperText={errors.nombre?.message}
        />
               <TextField
          label="marca"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          {...register('marca',{
            required:'Campo requerido'
           })}
           error={!!errors.marca}
           helperText={errors.marca?.message}
        />
               <TextField
          label="cantidad"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          {...register('cantidad',{
            required:'Campo requerido'
           })}
           error={!!errors.cantidad}
           helperText={errors.cantidad?.message}
        />
                       <TextField
          label="precio c/u"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          {...register('precio',{
            required:'Campo requerido'
           })}
           error={!!errors.precio}
           helperText={errors.precio?.message}
        />
   </div>
   <FormControl fullWidth>
           <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
           <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             label="tags"
             value={tags}
             onChange={(e)=>setTags(e.target.value)}   
           >
             <MenuItem value={"electronica"}>electronica</MenuItem>
             <MenuItem value={"ropa"}>ropa</MenuItem>
             <MenuItem value={"alimentos"}>alimentos</MenuItem>
           </Select>
         </FormControl>
   <div>
        <TextField
        fullWidth
          id="outlined-multiline-static"
          label="descripcion"
          multiline
          rows={4}
          {...register('descripcion',{
            required:'Campo requerido'
           })}
           error={!!errors.descripcion}
           helperText={errors.descripcion?.message}
        />
        </div>

        <Box sx={{weight:"100vw",height:20,display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:5}}>
<Button disabled={isOk} variant="contained" type='submit'  size="large" sx={{fontSize:10,backgroundColor:"coral",height:50}}><Typography variant="button">
  Confirmar  Datos</Typography></Button>
  <Button onClick={()=>router.push('/')} variant="contained"  size="large" sx={{fontSize:10,backgroundColor:"red",height:50}}><Typography variant="button">
  Cancelar</Typography></Button>
</Box>
        
    </form>
    </Box>

</Box>
        </HomeLayout>
    );  
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
  const products=await dbProduct.misProduct(req.cookies.token)
  
  return {
      props: {
        products
      }
  }
}
export default VendePage