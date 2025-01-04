import { toast } from "sonner";
import api from "../config/axios";
import { isAxiosError } from "axios";
import { DevTreeUser, UpdateForm, User } from "../types";

export async function getUser() {

    try {
        const { data } = await api<User>('/users')
        return data

    } catch (error) {
        if (isAxiosError(error))
            toast.error(error.response?.data.error)

    }

}
export async function updateUser(datos: User) {

    try {
        const { data } = await api.patch<string>('/users', datos)
        //console.log(datos)
        return data

    } catch (error) {
        if (isAxiosError(error))
            throw new Error(error.response?.data.error)

    }

}
export async function uploadImage(file: File) {
    let formData = new FormData()

    formData.append('file', file)
    try {
        const { data } = await api.post('/users/image', formData)

        return data
    } catch (error) {
        if (isAxiosError(error))
            throw new Error(error.response?.data.error)

    }

}


export async function getHandleUser(handle: String) {
    try {

        const { data } = await api<DevTreeUser>(`/${handle}`)
        return data
    } catch (error) {
        if (isAxiosError(error))
            throw new Error(error.response?.data.error)
    }

}

export async function searchHandler(handle: String) {
    const obj= {
        'handle': handle
    }
    try {
        const {data} = await api.post<String>('/search',obj)
        return data
    } catch (error) {
        if (isAxiosError(error))
            throw new Error(error.response?.data.error)
    }
}