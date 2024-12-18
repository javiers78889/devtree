import { Link } from "react-router-dom";

export default function LoginViews() {
    return (
        <>
            <h1 className="text-4xl text-white font-bold">Login</h1>
            <form
                onSubmit={() => { }}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
            
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    />
                </div>
               
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    />
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Iniciar Sesión'
                />
            </form>
            <nav className="mt-10">
                <Link className="text-center text-white text-lg block" to={'/auth/register'}>¿No tienes Cuenta?, Registrate.</Link>
            </nav>
        </>
    )
}
