import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import  { isAxiosError } from "axios";
import { toast } from "sonner";
import api from "../config/axios";



export default function LoginViews() {
    const navigate = useNavigate()
    const initialValues: LoginForm = {
        email: '',
        password: '',

    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
   
    const handlerLogin = async (datos: LoginForm) => {
        try {
           
            const response = await api.post('auth/login', datos)
            toast.success(response.data[1])
            localStorage.setItem('AUTH_TOKEN', response.data[0])
            navigate('/admin')
           
        } catch (error) {
            if(isAxiosError(error)){

                toast.error(error.response?.data.error)
            }
        }
       

    }
    return (
        <>
            <h1 className="text-4xl text-white font-bold">Login</h1>
            <form
                onSubmit={handleSubmit(handlerLogin)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('email', {
                            required: "El email es obligatorio", pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password', {
                            required: 'El password es requerido'
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
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
