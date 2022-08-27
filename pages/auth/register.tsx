import React from 'react';
import { AuthLayout } from '../../components/layout';
import { Register } from '../../components/user';

function RegisterPage() {
    return (
       <AuthLayout titulo={'resgister'} >
          <Register/>
       </AuthLayout>
    );
}

export default RegisterPage;