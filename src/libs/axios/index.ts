import Axios from 'axios';
import { _env } from '@/config';
import {
  authRequestInterceptor,
  refreshTokenInterceptor,
  rejectErrorInterceptor,
} from './interceptors';

export const axios = Axios.create({
  baseURL: _env?.API_ENDPOINT_URL,
});

axios.interceptors.request.use(authRequestInterceptor, rejectErrorInterceptor);
axios.interceptors.response.use(undefined, refreshTokenInterceptor);
