import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import { IconButton, Link } from '@mui/material';
import NextLink from 'next/link';
import { IProducto } from '../../interfaces/models';
import { Loading } from '../ui/loading';

interface Prop{
  product:IProducto
}
const CardProduct=({product}:Prop)=> {

  if (!product.slug) {

    return (
       <Loading/>
    )
  }
  return  (
    <Card sx={{width:"100%", maxWidth: 300,maxHeight:500,marginLeft:1,marginTop:10}}>
  
      <NextLink href={`/product/${product.slug}`} passHref prefetch={ false } >
        <Link>

      <CardMedia
        sx={{'&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],},borderRadius:10,width:"80%"}}
        component="img"
        alt="green iguana"
        height="50%"
        image={product.img??'https://res.cloudinary.com/dzysn25nh/image/upload/v1661554179/noImageproduct_pign4w.png'}
      
      />


        </Link>
      </NextLink>

  
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.descripcion}
        </Typography>
      </CardContent>
      <CardActions>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <FavoriteIcon />
    </IconButton>
        
      </CardActions>
    </Card>
  );
}

export default CardProduct