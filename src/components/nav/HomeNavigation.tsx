import { Link } from "react-router-dom";


export default function HomeNavigation() {
    return (
        <>
            <Link className="text-white p-2 cursor-pointer text-xs uppercase font-black" to={'/auth/login'}>Iniciar Sesión</Link>
            <Link className="bg-lime-500 text-slate-800 p-2 cursor-pointer text-xs uppercase font-black rounded-lg" to={'/auth/register'}>Registrarse</Link>
        </>
    )
}
