import { toast } from "sonner";
import api from "../config/axios";
import { isAxiosError } from "axios";
import { User } from "../types";

export async function getUser() {

    try {
        const { data } = await api<User>('/users')
        return data

    } catch (error) {
        if (isAxiosError(error))
            toast.error(error.response?.data.error)

    }

}
