import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginViews from './views/LoginViews'
import RegisterViews from './views/RegisterViews'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'
import LinkTreeViews from './views/LinkTreeViews'
import ProfileView from './views/ProfileView'


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<Navigate to="/auth/login/" />} />
                    <Route path='/auth/login' element={<LoginViews />} />
                    <Route path='/auth/register' element={<RegisterViews />} />
                </Route>
                <Route path='/admin' element={<AppLayout />}>
                    <Route index={true} element={<LinkTreeViews />} />
                    <Route path='profile' element={<ProfileView/>}/>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

