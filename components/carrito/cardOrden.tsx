import { Box, Button, Card, CardMedia, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import { AuthContext } from '../../context/authContext/authProvider';
import { IItem } from '../../interfaces/models';


interface cardProp{
    item:IItem,estado:string,comprado:string,idOrden:string,tipo:number
  }
  
 export function ComprasCard({item,estado,comprado,idOrden,tipo}:cardProp) {
    const {updateOrden}=React.useContext(AuthContext)
    const [isEstado, setisEstado] = React.useState(estado);
  
    const cancelar=async()=>{
      setisEstado('cancelado')
      const resp=await updateOrden(idOrden,'delet')
     
    }
    const enviar=async()=>{
      setisEstado('enviado')
      const resp=await updateOrden(idOrden,'put')
     
    }
      
      
    const fecha=comprado.split('T')
      return (
  <Card variant="outlined" sx={{ minWidth: '200px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant='body1' sx={{ alignSelf: 'flex-start' }}>
           {item.nombre}
          </Typography>
          <Typography variant="body2" sx={{color:'GrayText'}}>Comprado:{fecha[0]}</Typography>
        </Box>
  
  
        <NextLink href={`/product/${item.slug}`} passHref prefetch={ false } >
          <Link sx={{position:'relative'}}>
  
        <CardMedia
          sx={{'&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],}}}
          component="img"
          alt="green iguana"
          height="200"
          width="200"
          image={item.img??"https://res.cloudinary.com/dzysn25nh/image/upload/v1661554179/noImageproduct_pign4w.png"}
        />
        
        <Box color={isEstado==='cancelado'?'red':isEstado==='enviado'?'green':'blue'}
            aria-label="Explore Bahamas Islands"
            sx={{ ml: 'auto', fontWeight: 600,position:'absolute',bottom:10,backgroundColor:'azure',width:100,textAlign:'center' }}>
            {isEstado}
          </Box>
          </Link>
        </NextLink>
  
        <Box sx={{ display: 'flex' }}>
          <div>
            <Typography >Precio Tot:</Typography>
            <Typography fontSize="lg" fontWeight="lg">
              ${item.precioUbicado!*item.cantidad}
            </Typography>
          </div>
          <div>
            <Typography >Cantidad:</Typography>
            <Typography fontSize="lg" fontWeight="lg">
              {item.cantidad}
            </Typography>
          </div>
          {
            tipo==2?<Button
            onClick={()=>enviar()}
              disabled={isEstado=='enviado'?true:isEstado=='cancelado'?true:false}
              color='success'
              aria-label="Explore Bahamas Islands"
              sx={{ ml: 'auto', fontWeight: 600 }}
            >
              Enviar
            </Button>:null
          }
          <Button
          onClick={()=>cancelar()}
            disabled={isEstado=='enviado'?true:isEstado=='cancelado'?true:false}
            color='error'
            aria-label="Explore Bahamas Islands"
            sx={{ ml: 'auto', fontWeight: 600 }}
          >
            Cancelar
          </Button>
          
        </Box>
      </Card>
      );
  }