import axios, {AxiosResponse, InternalAxiosRequestConfig } from 'axios';
let BackendUrl = "http://10.0.2.2:3002";
const apiClient = axios.create({
    baseURL: BackendUrl,
    headers: {
        'Content-Type': 'application/json', // Thêm header Content-Type
    },
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

export const getTransactionsByMonth = async (userId: any, year: any, month: any) => {
    try {
      const response = await axios.get(
        `/api/v1/transaction/get-all-transactions-by-month-user-id`,
        {
          params: {
            userId,
            year,
            month,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  };
