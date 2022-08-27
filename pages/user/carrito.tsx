import { Box, Button, Typography } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { CardItem } from '../../components/carrito/Carrito'
import ConfirmarM from '../../components/carrito/ConfirmarM'
import HomeLayout from '../../components/layout'
import { Loading } from '../../components/ui'
import { AuthContext } from '../../context/authContext/authProvider'
import { IProducto } from '../../interfaces'
import { dbProduct } from '../../services/db'

interface Props{
  products:IProducto[]
}
  const CarritoPage:NextPage<Props>=({products})=> {
    const [open, setOpen] = React.useState(false);
    const cantidaes=React.useRef({})
    const [precioTotal, setPrecioTotal] = React.useState(0);
    const [carrito, setCarrito] = React.useState<IProducto[]>(products)
    const {updateCarrito,addCarritoUser,user}=React.useContext(AuthContext)
  React.useEffect(() => {
    let tot=0
    let cantidades={}
    const newList=products.map(e=>e._id.toString())
    for (let i = 0; i < products.length; i++) {
      const id=products[i]._id.toString()
       tot+=products[i].precio
       cantidades={...cantidades,[id]:{
        productID:id,
        cantidad:1
       }}
      }
      cantidaes.current={...cantidades}
    setPrecioTotal(tot)
    updateCarrito(newList)
  }, []);

    const setPrecio=(precioT:number,preAnter:number,id:string,cantidad:number)=>{ 
      cantidaes.current={...cantidaes.current,[id]:{
        productID:id,
        cantidad:cantidad
       }}
          const valor=(precioTotal-preAnter)+precioT
          setPrecioTotal(valor) 
    }

    const deletItem=(id:any)=>{
       const newlist=carrito!.length!==1?carrito?.filter(e=>e._id.toString()!=id.toString()):[]
       setCarrito(newlist)
       addCarritoUser(id.toString())
    } 
  return (
    <HomeLayout titulo={'carrito'} descripcion={'sadsaf'}>
    
   
      <Box sx={{paddingTop:10,display:"flex",justifyContent:"space-between",flexDirection:"column"}}>
      {
        !carrito?.length?<Loading/>
        :<>
        {carrito.map((p:IProducto,i:any)=>(
            <CardItem delet={deletItem} key={p._id.toString()} productos={p} setPrecio={setPrecio}/>
        )
        )}
        
        </>
      }
          <Typography textAlign={'center'} variant='h5' marginBottom={5} fontSize={'50'} fontWeight={'semibold'}>Precio Total:$ {precioTotal}</Typography>
      <Box sx={{weight:"100vw",height:20,display:"flex",justifyContent:"center",alignItems:"center",marginTop:5}}>
      <Button onClick={()=>setOpen(true)} disabled={carrito.length!=0?false:true} variant="contained"  size="large" sx={{fontSize:10,backgroundColor:"coral",height:50,marginBottom:10}}><Typography variant="button">
          Realizar Compra</Typography></Button>
          
      </Box>
      <ConfirmarM preciototal={precioTotal} producttotal={cantidaes.current} open={open} handleClose={()=>setOpen(false)}/>
      </Box>
    </HomeLayout>
  )
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
  const products=await dbProduct.getCarrito(req.cookies.token)

  if (!products|| products.length===0) {
    return {
      redirect:{
        destination:'/user/empty',
        permanent: false,
      }
    }
  }

  return {
      props: {
        products
      }
  }
}
export default CarritoPage
