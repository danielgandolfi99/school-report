import axios, { AxiosRequestConfig } from 'axios';
import useUser from 'hooks/useUser';

const axiosServices = axios.create({ baseURL: 'http://localhost:8081/' });

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

// axiosServices.interceptors.request.use(
//   async (config) => {
//     const user = useUser();
//     if (user?.token) {
//       config.headers['Authorization'] = `Bearer ${user?.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosServices.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401 && !window.location.href.includes('/login')) {
//       window.location.pathname = '/login';
//     }
//     return Promise.reject((error.response && error.response.data) || 'Wrong Services');
//   }
// );

 export default axiosServices;

// export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
//   const [url, config] = Array.isArray(args) ? args : [args];
//   const res = await axiosServices.get(url, { ...config });

//   return res.data;
// };

// export const fetcherPost = async (args: string | [string, AxiosRequestConfig]) => {
//   const [url, config] = Array.isArray(args) ? args : [args];
//   const res = await axiosServices.post(url, { ...config });

//   return res.data;
// };
