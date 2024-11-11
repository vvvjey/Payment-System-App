import axios, {AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
let BackendUrl = "http://10.0.2.2:3002";
const apiClient = axios.create({
    baseURL: BackendUrl,
    headers: {
        'Content-Type': 'application/json', // Thêm header Content-Type
    },
})
apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        try {
            const tokenString = await AsyncStorage.getItem('jwtToken');
            const token = tokenString ? JSON.parse(tokenString) : null; // Parse the token if it exists
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
                console.log('token',token);
            }
        } catch (error) {
            console.error('Error retrieving JWT token:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Xử lý phản hồi thành công
        return response;
    },
    (error) => {
        // Xử lý lỗi phản hồi
        // if (error.response.status === 401) {
        //     // Customize this message as needed
        //     return Promise.reject(new Error("Unauthorized access. Please check your credentials."));
        // }
        return Promise.reject(error.response.data);
    }
);

export const testApi = (data:any) => {
    return apiClient.post('/api/v1/wallet/test',{data});
};
export const register = (data: { name: string, phoneNumber: string, password: string }) => {
    return apiClient.post('/api/v1/auth/register', data);
};
export const login = (data: any) => {
    return apiClient.post('/api/v1/auth/login', data);
}
export const getDataCreateOrderZalopay = (amount:number)=>{
    return apiClient.post('/api/v1/wallet/create-order-zalopay', {amount});
}
