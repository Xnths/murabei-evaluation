import axios, { AxiosRequestConfig, Method } from "axios";

const baseUrl = process.env.LOCAL_API_BASE_URL as string;

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions<Body> {
  body?: Body;
  headers?: Record<string, string>;
}

async function request<Response, Body = undefined>(
  method: HTTPMethod,
  path: string,
  options?: RequestOptions<Body>
): Promise<Response> {
  const url = `${baseUrl}${path}`;

  const config: AxiosRequestConfig = {
    url,
    method: method as Method,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    data: options?.body,
  };

  const response = await axios<Response>(config);
  return response.data;
}

export const api = {
  get: <Response>(path: string, headers?: Record<string, string>) =>
    request<Response>("GET", path, { headers }),

  post: <Response, Body>(
    path: string,
    body: Body,
    headers?: Record<string, string>
  ) => request<Response, Body>("POST", path, { body, headers }),

  put: <Response, Body>(
    path: string,
    body: Body,
    headers?: Record<string, string>
  ) => request<Response, Body>("PUT", path, { body, headers }),

  delete: <Response>(path: string, headers?: Record<string, string>) =>
    request<Response>("DELETE", path, { headers }),
};
