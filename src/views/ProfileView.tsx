import { useForm } from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage'
import { UpdateForm, User } from '../types'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateUser, uploadImage } from '../Api/DevTreeApi'
import { toast } from 'sonner'



export default function ProfileView() {
    const queryClient = useQueryClient()

    const data: User = queryClient.getQueryData(['user'])!

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            handle: data.handle,
            description: data.description
        }
    })
    const updateProfile = useMutation({
        mutationFn: updateUser,
        onError: (error) => {

            toast.error(error.message)

        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })
    const handleSubmitupdate = (datos: UpdateForm) => {
        const user: User = queryClient.getQueryData(['user'])!
        user.handle= datos.handle
        user.description= datos.description
        updateProfile.mutate(user)
    }

    const imageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {
            toast.error(error.message)

        },
        onSuccess: (data) => {
            toast.success('Imagen Actualizada. cargando...')
            queryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    image: data.image
                }

            })
        }
    })
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {

            imageMutation.mutate(e.target.files[0])

        }
    }
    return (
        <form
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleSubmitupdate)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register('handle', { required: 'Ingrese Un Handle' })}
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register('description')}
                />
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={onChange}
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}
