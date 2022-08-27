import { Box } from '@mui/material'
import Head from 'next/head'
import React from 'react'

interface Prop{
  titulo:string,
  children:JSX.Element
}
export const AuthLayout=({titulo,children}:Prop)=> {
  return (
    <>
    <Head>
      <title>{titulo}</title>
    </Head>
    <main>
            <Box display='flex' justifyContent='center' alignItems='center' height="calc(100vh - 200px)">   
                { children }
            </Box>
        </main>
    </>
  )
}
