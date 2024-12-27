import { toast } from "sonner";
import api from "../config/axios";
import { isAxiosError } from "axios";
import { UpdateForm, User } from "../types";

export async function getUser() {

    try {
        const { data } = await api<User>('/users')
        return data

    } catch (error) {
        if (isAxiosError(error))
            toast.error(error.response?.data.error)

    }

}
export async function updateUser(datos: UpdateForm) {

    try {
        const { data } = await api.patch<string>('/users', datos)
        return data

    } catch (error) {
        if (isAxiosError(error))
          throw new Error(error.response?.data.error)

    }

}
