import React from 'react'
import { AuthLayout } from '../../components/layout'
import { Login } from '../../components/user'

export default function LoginPage() {
  return (
   <AuthLayout titulo={'login'}>
    <Login/>
   </AuthLayout>
  )
}
