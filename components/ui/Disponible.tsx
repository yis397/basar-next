import { Box, Button,Typography} from '@mui/material'
import React from 'react'

interface Prop{
  valor:number,
  catidad:(catidad:number)=>void
}
export const Disponible=({valor,catidad}:Prop)=>{
  const [cantidad, setCantidad] = React.useState<number>(1);
  const mas=()=>{
    if(cantidad==valor)return
    setCantidad(cantidad + 1)
    catidad(cantidad + 1)
  }
  const menos=()=>{
    if(cantidad==1)return
    setCantidad(cantidad - 1)
    catidad(cantidad - 1)
  }
  return (
    <Box sx={{flexDirection:"row",display:"flex",justifyContent:"space-around",marginTop:3,marginBottom:4,width:200}}>
              <Button onClick={menos} variant="contained" sx={{fontSize:10,height:20 ,backgroundColor:"GrayText"}}><h3>Menos</h3></Button>
              <Typography variant="subtitle1" color='tomato' sx={{fontWeight:'bold'}} component="div">
              ( {cantidad} )
              </Typography>
              <Button onClick={mas} variant="contained" sx={{fontSize:10,backgroundColor:"GrayText",height:20 }}><h3>Mas</h3></Button>
            </Box>
  )
}
