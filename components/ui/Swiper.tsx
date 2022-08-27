import React from 'react'
import { Box, Card, CardContent, CardMedia, IconButton, Typography,Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IProducto } from '../../interfaces/models';
import NextLink from 'next/link';

 const Swiper=( products:any)=> {

  const [product, setproduct] = React.useState(products.products[0]);
  const index=React.useRef(0)
  const [count, setCount] = React.useState(0);
    const change=()=>{
      
     if (index.current===2) {
       setproduct(products.products[0])
       index.current=0
       return
      }
      setproduct(products.products[index.current=index.current+1])
      
    }
    const bucle=()=>{

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          change()
          resolve(true)
          
        }, 5000);

      })
   
    }
    React.useEffect(() => {
       bucle().then((a):any=>setCount(count+1))
    }, [count]);
  return (
    <Box
    sx={{width:"98.9vw",height:"40vh",padding:2,background:"coral" }}>
    <Box sx={{justifyContent:"space-between",with:"100vw",display:"flex",marginTop:5}}>

    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <ArrowBackIcon sx={{float:"left"}} />
    </IconButton>
    <IconButton edge="start" color="inherit" onClick={change} aria-label="menu" sx={{ mr: 2 }}>
      <ArrowForwardIcon sx={{float:"right"}} />
    </IconButton>
    </Box>
    <CardProduct product={product}/>

    </Box>
  )
}
export default Swiper;

  const CardProduct=({product}:{product:IProducto})=> {

    return (
      <Card sx={{ display: 'flex' , height:"95%"}}>
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
              <NextLink href={`/product/${product.slug}`} passHref prefetch={ false } >
                <Link>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
            {product.nombre}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
            {product.marca}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              ${product.precio}
            </Typography>
          </CardContent>
        </Link>
      </NextLink>
        </Box >
        <CardMedia
          component="img"
          sx={{ width: "50%",marginLeft:"auto" }}
          image={product.img??'https://res.cloudinary.com/dzysn25nh/image/upload/v1661554179/noImageproduct_pign4w.png'}
          alt="xbox"
        />
      </Card>
    );
  }