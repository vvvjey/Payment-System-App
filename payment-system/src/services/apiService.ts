import axios, {AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '@env';

// let BackendUrl = "http://10.0.2.2:3002";
let BackendUrl = BACKEND_URL;

const apiClient = axios.create({
    baseURL: BACKEND_URL,
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
                // console.log('token',token);
            }
        } catch (error) {
            console.error('Error retrievingg JWT token:', error);
        }
        return config;
    },
    (error) => {
        // console.log('resspon error',error)
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
        // console.error('Response error:', error); // Log the entire error object
        // console.error('Error message:', error.message); // Network error or message
        // console.error('Error code:', error.code); // Error code if available
        // console.error('Request config:', error.config); // Details of the Axios request
        // if (error.response) {
        //     console.error('Status:', error.response.status); // HTTP status code
        //     console.error('Response data:', error.response.data); // Response payload
        //     console.error('Response headers:', error.response.headers); // Headers from the response
        // } else {
        //     console.error('No response received from server');
        // }
        return Promise.reject(error.response.data);
    }
);

export const testApi = (data:any) => {
    return apiClient.post('/api/v1/wallet/test',{data});
};
export const register = (name: string, phoneNumber: string, password: string ) => {
    return apiClient.post('/api/v1/auth/register', {name,phoneNumber,password});
};
export const login = (data: any) => {
    return apiClient.post('/api/v1/auth/login', data);
}
export const getDataCreateOrderZalopay = (amount:number)=>{
    return apiClient.post('/api/v1/wallet/create-order-zalopay', {amount});
}
export const getUserInforById = (userId:number)=>{
    return apiClient.get(`/api/v1/user/${userId}`);
}
export const tranferMoney = (senderWalletId:number,receiverWalletId:number,amount:any,utr:string,content:string)=>{
    return apiClient.post(`/api/v1/wallet/tranfer-money`,{senderWalletId,receiverWalletId,amount,utr,content});
}
export const getWalletInforByUserId = (userId:number)=>{
    return apiClient.get(`/api/v1/wallet/get-by-id/${userId}`);
}

export const getTransactionsByMonth = async (userId: number, year: number, month: number) => {
    const params = JSON.stringify({
        userId, year, month
    })
    console.log('hehee',params)
    try {
        const response = await apiClient.get(`/api/v1/transaction/get-all-transactions-by-month-user-id/${params}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching transactions by month:', error);
        throw error; 
    }
};
export const getAllTransactions = async (userId: number) => {
    const params = JSON.stringify({
        userId
    })
    console.log('hehe',params)
    try {
        const response = await apiClient.get(`/api/v1/transaction/get-all-transactions-by-user-id/${params}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching all transactions:', error);
        throw error; 
    }
};


