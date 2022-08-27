import React, { FC } from 'react'
import Head from 'next/head'
import Navbar from '../ui/Navbar';

interface Prop{
  titulo:string;
  descripcion:string;
  children:JSX.Element
}
const HomeLayout:FC<Prop>=({children,titulo,descripcion})=> {

  return (
    <>

   <Head>
    <title>{titulo}</title>
    <meta name='description' content={descripcion}/>
    <meta name='og:title' content={titulo}/>
    <meta name='og:description' content={descripcion}/>
   </Head>
   <nav>
   <Navbar/>
   </nav>
   <main>
    {children}
   </main>
    </>
  )
}

export default HomeLayout