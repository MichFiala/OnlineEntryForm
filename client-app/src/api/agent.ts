import axios, { AxiosResponse } from 'axios';
import { FormValues } from '../common/form/models/form';

axios.defaults.baseURL = "http://localhost:5000/api";


const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
     post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
}
 
const Form = {
    send: (formValues: FormValues) => requests.post<void>('/form', formValues),
}

const agent = {
    Form,
 }
 
 export default agent;