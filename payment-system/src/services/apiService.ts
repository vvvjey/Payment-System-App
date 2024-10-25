import axios, {AxiosResponse, InternalAxiosRequestConfig } from 'axios';
let BackendUrl = "http://10.0.2.2:3002";
const apiClient = axios.create({
    baseURL: BackendUrl
})
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Thêm token vào header nếu có
        // const token = localStorage.getItem('token'); // Hoặc lấy từ Redux store
        // if (token) {
        //     config.headers['Authorization'] = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        // Xử lý lỗi trước khi yêu cầu được gửi đi
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
        return Promise.reject(error);
    }
);

export const testApi = () => {
    return apiClient.get('/wallet/test');
};
export const registerHuong = ()=>{
    return apiClient.post('/api/v1/auth/login');
}