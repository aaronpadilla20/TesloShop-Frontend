import { tesloApi } from "../../api/testloApi"
import type { AuthResponse } from "../interfaces/auth.response";

export const loginAction = async (email: string, password: string): Promise<AuthResponse> => {
    try {

        const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
            email: email,
            password: password
        })

        return data;

    } catch (error) {
        throw error;
    }
}
