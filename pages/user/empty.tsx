import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import HomeLayout from '../../components/layout';
import NextLink from 'next/link';

function EmptyPage() {
    return (
        <HomeLayout titulo={'carrito'} descripcion={'sadsaf'}>
         <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' }}}
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography>Su carrito está vació</Typography>
                <NextLink href='/' passHref>
                    <Link typography="h4" color='secondary'>
                        Regresar
                    </Link>
                </NextLink>
            </Box>


        </Box>
    </HomeLayout>
    );
}

export default EmptyPage;