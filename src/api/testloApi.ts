import axios from 'axios'

const tesloApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// El use se conoce como un middleware lo cual no es otra cosa que una funcion que se ejecuta
// siempre que pase por la request, la configuracion que se le provee contiene todo lo que se hace
// en la peticion.

// El interceptor se utiliza para aplicar configuraciones adicionales a las peticiones
tesloApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export { tesloApi };