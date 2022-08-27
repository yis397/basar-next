import React, { useContext } from 'react'
import { Box, Button, Card, CardContent, CardMedia, Typography,IconButton, Grid } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Disponible } from '../ui';
import { IProducto } from '../../interfaces';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/authContext/authProvider';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ConfirmarM from '../carrito/ConfirmarM';
import { TiendaContext } from '../../context/tiendaContext/tiendaProvider';
export const Product=({product}:{product:IProducto})=> {
  const id=product._id.toString()

  const item={[id]:{productID:product._id.toString(),cantidad:1}}
  const router = useRouter();
  const [isCarrito,setCarrito]=React.useState(false);
  const {isLoggedIn,addCarritoUser,user}=useContext(AuthContext)
  const productCantidad=React.useRef(item)
  const precioTotal=React.useRef(product.precio)
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (isLoggedIn&&user?.carrito) {
      user?.carrito.map((e:any)=>{
        e===product._id?setCarrito(true):null
      })
    }
  }, [user?.carrito]);
  const buy=()=>{
    if (!isLoggedIn){
      router.push(`/auth/login?p=${router.asPath}`)
      return
    }
    setOpen(true)
  }
  const addCar=async()=>{
    if(!isLoggedIn)return  router.push(`/auth/login?p=${router.asPath}`)
    const isbool= await addCarritoUser(product._id.toString())
    setCarrito(!isbool)
  }
  const catidad=(valor:number)=>{
    precioTotal.current=valor*product.precio;
    productCantidad.current={[id]:{productID:product._id.toString(),cantidad:valor}}
  }
  return (
    <Box sx={{with:"100vw",height:"90vh",paddingTop:15}}>
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ ml: 5 }} onClick={()=>router.back()}>
      <ArrowBackIcon />
    </IconButton>
    <Grid container >
    <Grid item xs={12} md={6}>
    
      <CardMedia
          component="img"
          sx={{ width: "80%",ml:"15%" }}
          image={product.img??"https://res.cloudinary.com/dzysn25nh/image/upload/v1661554179/noImageproduct_pign4w.png"}
          alt="xbox"
        />
  </Grid>
  <Grid item xs={12} md={6} sx={{padding:5}}>
    

        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h3">
              {product.nombre}
            </Typography>
            <Typography variant="h4" color="text.secondary" component="div">
              {product.marca}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              ${product.precio}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {product.descripcion}
             </Typography>
            <Typography variant="subtitle2" color="text.secondary" component="div" sx={{marginTop:1}}>
              Disponibles:  {product.cantidad}
            </Typography>
            <Disponible catidad={catidad} valor={product.cantidad}/>
            <Button onClick={()=>buy()} variant="contained"  size="large" sx={{fontSize:10,backgroundColor:"coral",height:50}}><h3>Comprar</h3></Button>

            <IconButton onClick={()=>addCar()} edge="start" color="inherit" aria-label="menu" sx={{ ml: 5,color:isCarrito?'red':'black' }}>
                 <ShoppingCartIcon />
               </IconButton>
          </CardContent>
        </Box >
  </Grid>
        
      </Grid>
      <ConfirmarM producttotal={productCantidad.current} preciototal={precioTotal.current} open={open} handleClose={()=>setOpen(false)}/>

    </Box>
  )
}

