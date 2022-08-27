import React from 'react'
import { Disponible, Loading } from '../ui'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import {ButtonBase,CardMedia,Box,IconButton,Button} from '@mui/material';
import { IProducto } from '../../interfaces';
import { useProducts } from '../../hooks/useProducts';
import { AuthContext } from '../../context/authContext/authProvider';
import { GetServerSideProps, GetStaticProps, NextApiRequest, NextPage } from 'next';
import { dbProduct } from '../../services/db';

interface Prop{
  productos:IProducto,
  delet:(id:string)=>void
  setPrecio:(precio:number,preAnter:number,id:string,cantidad:number)=>void
}

export const CardItem=({productos,delet,setPrecio}:Prop)=> {
  const [precio, setprecio] = React.useState(productos.precio);
  const catidad=(valor:number)=>{
    const precioAnt=precio
    setprecio(valor*productos.precio)
    setPrecio(valor*productos.precio,precioAnt,productos._id,valor)
  }
  return (
    <Paper
      sx={{
        maxWidth: "100vw",
        flexGrow: 1,
        marginBottom:5
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{alignItems:"center",display:"flex",justifyContent:"center"}}>
          <ButtonBase sx={{ width: 128, height: 128 }}>
           <CardMedia
        sx={{'&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
          width:"100%"}}}
        component="img"
        alt="green iguana"
        height="100"
        image={productos.img??"https://res.cloudinary.com/dzysn25nh/image/upload/v1661554179/noImageproduct_pign4w.png"}
      />
          </ButtonBase>
        </Grid>

        <Grid item xs={4} sm container sx={{marginLeft:2}}>
          <Grid item xs container direction="column" spacing={2} >
            
            <Grid item xs sx={{alignItems:"center",display:"flex",justifyContent:"center"}}>
             
              <Disponible catidad={catidad} valor={productos.cantidad||0}/>
              <Typography variant="subtitle2" component="div">
              x  ${productos.precio||0}
            </Typography>
            </Grid>
            <Typography variant="subtitle2" component="div">
              Producto:{productos.nombre}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{alignItems:"center",display:"flex",justifyContent:"center"}}>
            <Typography variant="subtitle1" component="div">
              Total:${precio}
            </Typography>
          </Grid>
          
        </Grid>
        <Grid item xs={4} sx={{alignItems:"center",display:"flex",justifyContent:"center"}}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={()=>delet(productos._id)}>
      <DeleteIcon />
         </IconButton>
          </Grid>
      </Grid>
    </Paper>
  )
}