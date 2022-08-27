import React,{useContext} from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import {InputBase,Menu,MenuItem,Box, Link, Autocomplete, TextField} from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/authContext/authProvider';
import { apiBasar } from '../../services/http/apiBasar';


interface ISugerencias{
  nombre:string,
  slug:string
}
const Navbar=()=> {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {isLoggedIn,user,logout}=useContext(AuthContext) 

  const navegar = ( url: string ) => {
    handleClose()
    router.push(url);
}
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const [value, setValue] = React.useState([]);
  const defaultProps = {
    options: value,
    getOptionLabel: (option: ISugerencias) => option.nombre,
  };
  const flatProps = {
    options: value.map((option) => option),
  };

  const search=async(e:string)=>{
    if (e==="") {
      return
    }
    const sugerencias=await apiBasar.get('search/'+e)
    setValue(sugerencias.data.lista)
 
  }
  const [inputValue, setInputValue] = React.useState('');
  return (

    <AppBar position="static" sx={{position:"fixed",background:'coral'}}>
  <Toolbar variant="dense"  sx={{ justifyContent:"space-between"}} >
    <div>
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleMenu}>
      <MenuIcon />
    </IconButton>
    <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                
               
  {
  isLoggedIn?
  <Box>
    <MenuItem onClick={()=>logout()}>Cerrar Secion</MenuItem>
    <MenuItem ><NextLink href={'/user/direccion'}>Mi direccion</NextLink></MenuItem>
    <MenuItem onClick={handleClose}>Favoritos</MenuItem>
    <MenuItem ><NextLink href={'/user/compras'}>Mis compras</NextLink></MenuItem>
    <MenuItem ><NextLink href={'/user/ventas'}>Mis ventas</NextLink></MenuItem>
    <MenuItem ><NextLink href={'/user/vende'}>Vende</NextLink></MenuItem>

  </Box>
  : <Box>
  <MenuItem onClick={()=>navegar(`/auth/register?p=${router.asPath}`)}>Registrate</MenuItem>
  <MenuItem onClick={()=>navegar(`/auth/login?p=${router.asPath}`)}>Inciar Secion</MenuItem>
</Box>
 }
                
                
                
              </Menu>

    </div>

     
  <NextLink href={ "/" } 
                                passHref>
                                <Link underline='always' style={{display:'flex',flexDirection:'row', color:'#ffff'}}>
                                  <Typography style={{fontWeight:'bold',fontSize:20,color:'#ffff'}}>B</Typography><Typography>asar</Typography>
                                   
                                </Link>
                            </NextLink>
     

 <Box sx={{display:"flex",flexDirection:"row",width:'80%',justifyContent:"center",alignItems:"center"}}>

      <Autocomplete
      sx={{backgroundColor:"white",borderRadius:30,paddingLeft:1,width:"70%",height:30,}}
        {...defaultProps}
        id="disable-close-on-select"
        disableCloseOnSelect
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          search(newInputValue)
        }}
        inputValue={inputValue}
        renderOption={(props, option) =>(
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <NextLink href={`/product/${option.slug}`}>
              <Link>
              {option.nombre}
              </Link>
            </NextLink>
          </Box>
        )}
        renderInput={(params) => ( 
          
            <TextField  {...params} label="Busca" variant="standard" sx={{bottom:15}}/>

    
        )}
      />
       <IconButton 
      type="submit" color="inherit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
 </Box>








      {isLoggedIn?
    <NextLink href={'/user/carrito'}>
    <IconButton edge="end"  color="inherit" aria-label="menu" sx={{ mr: 5,}}>
      <ShoppingCartIcon />
    </IconButton>

    </NextLink>
    :null}
  </Toolbar>
</AppBar>

  )
}

export default Navbar





