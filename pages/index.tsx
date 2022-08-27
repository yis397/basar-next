import type { NextPage } from 'next'

import HomeLayout from '../components/layout'
import { ProductList } from '../components/productos'
import { Loading, Swiper } from '../components/ui'
import { useProducts } from '../hooks/useProducts';
const Home: NextPage = () => {
   const{data,loading}=useProducts('/products')
  return (
    <HomeLayout titulo='Tienda-Home' descripcion='una pagina para comprar muchas cosas'>

       {loading? <Loading/>:
       <>
      <Swiper products={data.data.random}/>
      <ProductList product={data.data.products}/>
       </>
      }

    </HomeLayout>
  )
}

export default Home
