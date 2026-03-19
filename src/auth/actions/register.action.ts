import { tesloApi } from "../../api/testloApi"
import type { AuthResponse } from "../interfaces/auth.response";

export const registerAction = async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
    try {

        const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
            email: email,
            password: password,
            fullName: fullName
        })

        return data;

    } catch (error) {
        throw error;
    }
}
