import { tesloApi } from "../../api/testloApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthAction = async (): Promise<AuthResponse> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No Token Found');

    try {
        const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
        localStorage.setItem('token', data.token);
        return data;
    } catch (_) {
        localStorage.removeItem('token');
        throw new Error('Token expired or not valid')
    }
}