import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginViews from './views/LoginViews'
import RegisterViews from './views/RegisterViews'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'
import LinkTreeViews from './views/LinkTreeViews'
import ProfileView from './views/ProfileView'
import HandleView from './components/HandleView'
import Errores from './views/Errores'
import Home from './views/Home'


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginViews />} />
                    <Route path='/auth/register' element={<RegisterViews />} />
                </Route>
                <Route path='/admin' element={<AppLayout />}>
                    <Route index={true} element={<LinkTreeViews />} />
                    <Route path='profile' element={<ProfileView/>}/>
                </Route>
                <Route path='/:handle' element={<AuthLayout/>}>
                    <Route element={<HandleView/>} index={true}/>

                </Route>
                <Route path='/404' element={<AuthLayout/>}>
                    <Route element={<Errores/>} index={true}/>

                </Route>
                <Route path='/' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}

