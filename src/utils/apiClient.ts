import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosInstance,
} from 'axios';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

const createApiClient = (baseURL: string, apiKey?: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use(
    (config: AdaptAxiosRequestConfig) => {
      if (apiKey) config.params = { ...config.params, apikey: apiKey };
      return config;
    },
    (error) => Promise.reject(error),
  );
  return client;
};

export default createApiClient;
