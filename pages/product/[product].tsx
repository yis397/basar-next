import React,{useEffect} from 'react'
import { GetServerSideProps, GetStaticPaths, GetStaticProps,NextPage } from 'next';
import HomeLayout from '../../components/layout/HomeLayout'
import { Product } from '../../components/productos';
import { dbProduct } from '../../services/db';
import { IProducto } from '../../interfaces';
import { Typography } from '@mui/material';



interface Props {
  producto: IProducto
}

const ProductPage:NextPage<Props>=({producto})=>{

  
  
  return (
    <HomeLayout titulo={producto.nombre} descripcion={'asd'} >

    <Product product={producto}/>
    </HomeLayout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const productSlugs = await dbProduct.getSlugsProducts();
  const paths = productSlugs.map(({slug}:any) =>({
    params: {product: slug}
  }))
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params}) => {
  const { product = '' } = params as { product: string };
  const producto = await dbProduct.getProductBySlug( product );
  
  if ( !producto ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      producto
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage


