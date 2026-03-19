import { create } from 'zustand'
import type { User } from '../../interfaces/user.interface'
import { loginAction } from '../actions/login.action'
import { checkAuthAction } from '../actions/check-auth.action'
import { registerAction } from '../actions/register.action'

// type Store = {
//     count: number;
//     inc: () => void;
//     dec: () => void;
// }

// export const useCounterStore = create<Store>()((set) => ({
//     count: 100,
//     inc: () => set((state) => ({ count: state.count + 1 })),
//     dec: () => set((state) => ({ count: state.count - 1 })),
// }))

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthState = {
    // Properties
    user: User | null,
    token: string | null,
    authStatus: AuthStatus,

    // Getters
    isAdmin: () => boolean;

    // Actions
    login: (email: string, password: string) => Promise<boolean>,
    register: (email: string, password: string, fullName: string) => Promise<boolean>,
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    // Implementacion del AuthState
    user: null,
    token: null,
    authStatus: 'checking',

    // Getters
    isAdmin: () => {
        const roles = get().user?.roles || [];
        return roles.includes('admin');
    },

    // Actions
    login: async (email: string, password: string) => {
        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authStatus: 'authenticated' })
            return true;
        } catch (_) {
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            return false;
        }
    },

    register: async (email: string, password: string, fullName: string) => {
        try {
            const data = await registerAction(email, password, fullName);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            return true;
        } catch (_) {
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'not-authenticated' });
    },

    checkAuthStatus: async () => {
        try {
            const { user, token } = await checkAuthAction();
            set({
                user: user,
                token: token,
                authStatus: 'authenticated'
            })
            return true
        } catch (_) {
            set({
                user: undefined,
                token: undefined,
                authStatus: 'not-authenticated'
            })
            return false
        }
    }
}))