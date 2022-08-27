
import { GetServerSideProps, NextPage } from 'next';
import { Box, Grid} from '@mui/material';
import React from 'react';
import HomeLayout from '../../components/layout/HomeLayout';

import { IOrden,  } from '../../interfaces/models';
import { Loading } from '../../components/ui';
import { dbOrden } from '../../services/db';
import { ComprasCard } from '../../components/carrito/cardOrden';

interface Props{
  compras:IOrden[]
}

  const VentasPage:NextPage<Props>=({compras})=> {

    return (
        <HomeLayout titulo={'tus Compras'} descripcion={'lista de compras y ordenes'}>
    <Box sx={{ width: '100%',p:5,paddingTop:10}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
        compras.length===0?<Loading/>:
        compras.map((e,t)=>
            <Grid key={e._id} item xs={4}>
              {
                e.items.map((j,i)=>
                  <ComprasCard key={i} item={j} estado={e.estado} comprado={e.creado} idOrden={e._id} tipo={2}/>)
              }
          
        </Grid>)
        }
      </Grid>
    </Box>
        </HomeLayout>
    );
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  
    const compras: any = await dbOrden.getVentas(req.cookies.token??"");
 
    if ( !compras||compras.length==0 ) {
        return {
            redirect: {
                destination: '/user/empty',
                permanent: false,
            }
        }
    }

    return {
        props: {
          compras
        }
    }
}

export default VentasPage;



