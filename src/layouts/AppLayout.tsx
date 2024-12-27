
import { useQuery } from '@tanstack/react-query'
import { getUser } from "../Api/DevTreeApi";
import { Navigate } from "react-router-dom";
import Devtree from "../components/Devtree";

export default function AppLayout() {

    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 1,
        refetchOnWindowFocus: false,
    })
    if (isLoading) return 'cargando...'
    if (isError) {
        return <Navigate to={'/'} />
    }

    if (data) return <Devtree data={data} />
}
