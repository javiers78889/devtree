import { useQuery } from '@tanstack/react-query'
import { Navigate, useParams } from 'react-router-dom'
import { getHandleUser } from '../Api/DevTreeApi'
import Usuarios from '../views/Usuarios'

export default function HandleView() {
  const { handle } = useParams()

  const { data, error, isLoading } = useQuery({
    queryFn: () => getHandleUser(handle!),
    queryKey: ['handle', handle],
    retry: 1
  })

  if (isLoading) return <p className='text-center text-white font-bold text-xl'>Cargando...</p>

  if (error) return <Navigate to={'/404'} />

  if (data) return <Usuarios data={data} />




}
