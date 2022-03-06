import axios from 'axios'
import router from "../router/index"
import { Message } from 'element-ui'


const request = axios.create({
  baseURL: 'http://127.0.0.1:9000',
  timeout: 5000
})
request.interceptors.request.use(
  (config)=>{
    const token = localStorage.getItem('token');
    if(token) config.headers.Authorization = `Bearer${token}`;
    return config;
  },
  error =>Promise.reject(error)
)
request.interceptors.response.use(
  (response) =>response,
  ({response})=>{
    const {status,data} = response
    if(status===401) router.push('/admin')
    Message.error(data)
   return Promise.reject(data)
  }
)

export default request;