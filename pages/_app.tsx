import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/authContext/authProvider'
import { TiendaProvider } from '../context/tiendaContext/tiendaProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TiendaProvider>
      <Component {...pageProps} />

      </TiendaProvider>
    </AuthProvider>
  )
}

export default MyApp
