import slugify from "react-slugify";
import ErrorMessage from "../ErrorMessage";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { searchHandler } from "../../Api/DevTreeApi";
import { Link } from "react-router-dom";

export default function SearchForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            handle: ""
        }
    })

    //mutaciones
    const findHandle = useMutation({
        mutationFn:searchHandler
    })

    const handle = watch('handle')
    const handleSearch = () => {
        const slug = slugify(handle)
        findHandle.mutate(slug)
    }
    return (
        <form
            onSubmit={handleSubmit(handleSearch)}
            className="space-y-5">
            <div className="relative flex items-center  bg-white  px-2">
                <label
                    htmlFor="handle"
                >devtree.com/</label>
                <input
                    type="text"
                    id="handle"
                    className="border-none bg-transparent p-2 focus:ring-0 flex-1"
                    placeholder="elonmusk, zuck, jeffbezos"
                    {...register("handle", {
                        required: "Un Nombre de Usuario es obligatorio",
                    })}
                />

            </div>
            {errors.handle && (
                <ErrorMessage>{errors.handle.message}</ErrorMessage>
            )}

            <div className="mt-10">
            {findHandle.isPending && <p className="text-center">Cargando...</p>}
            {findHandle.error && <p className="text-center text-red-600 font-black">{findHandle.error.message}</p>}
            {findHandle.data && <p className="text-center text-cyan-500 font-black">{findHandle.data} ir a <Link to={'/auth/register'} state={slugify(handle)} className="text-yellow-500">Registrarse</Link></p>}
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Obtener mi DevTree'
            />
        </form>
    )
}
