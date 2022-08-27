import { Box, Grid, Typography } from '@mui/material'
import { IProducto } from '../../interfaces';

import CardProduct from './CardProduct';

interface Prop{
  product:IProducto[]
}
export const ProductList=({product}:Prop)=> {

  return (
    <Box sx={{width:"95vw",
    marginTop:10,
    padding:0,
    justifyContent:"center",
    alignItems:"center",
    paddingLeft:7}}>

    <Grid container spacing={4}>
        {
          !product?
           <Typography>espere</Typography>
          : product.map((e,i)=> (
                <CardProduct 
                key={i}
                    product={e} 
                />
            ))
        }
    </Grid>
    </Box>
  )
}