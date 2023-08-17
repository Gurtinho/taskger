import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../shared/contexts/AuthContext';
import { Private } from './Private';

import { Home } from '../pages/Home';
import { Signin } from '../pages/Signin';
import { Signup } from '../pages/Signup';
import { Dashboard } from '../pages/Dashboard';

export const Router = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* rotas públicas */}
                    <Route path='/' element={<Home />} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/signup' element={<Signup />} />
                    {/* rotas privadas */}
                    <Route path='/dashboard' element={<Private element={<Dashboard />} />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}