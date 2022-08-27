import * as React from 'react';
import {Box,IconButton} from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Modal from '@mui/material/Modal';
import { AuthContext } from '../../context/authContext/authProvider';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
interface Prop{
    handleClose:()=>void,
    open:boolean,
    preciototal:number,
    producttotal:any,
}
export default function ConfirmarM({producttotal,preciototal,handleClose,open}:Prop) {
  const {user,createOrden}=React.useContext(AuthContext)
  const  msg = React.useRef("");
const crearOrden=async()=>{
  const isAccept=await createOrden(producttotal)
  msg.current=isAccept?'Compra Confirmada, redireccionando':'error, en comprar'
}
  return (
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirma compra 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            cantidad:{Object.keys(producttotal).length}n productos
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} >
            Precio total: ${preciototal}
          </Typography>
          <Box style={{border: '2px solid #000', borderRadius:10,padding:5}}>
            <Box style={{display:'flex',flexDirection:'row'}}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>Tus datos</Typography>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ ml: 5 }}>
            <ModeEditIcon /> 
          </IconButton>

            </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>Nombre: {user?.nombre} {user?.apellido}</Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>Direccion envio:
            <NextLink href={'/user/direccion'}>
            <Button  variant="contained" sx={{fontSize:10,backgroundColor:"GrayText",height:30 }}><h3>{user?.direccion?.ciudad?'Editar direccion':'No tiene direccion'}</h3></Button>
            </NextLink>
          
           </Typography>
          </Box>
          <Button  onClick={()=>crearOrden()} disabled={msg.current!=''?true:false}  variant="contained"  size="large" sx={{fontSize:10,backgroundColor:"coral",height:50,marginTop:5}}><h3>Comprar</h3></Button>
          <Typography>{msg.current}</Typography>
        </Box>
      </Modal>
  );
}