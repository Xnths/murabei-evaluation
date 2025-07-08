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

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers || {}),
  };

  const config: RequestInit = {
    method,
    headers,
    ...(options?.body ? { body: JSON.stringify(options.body) } : {}),
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  return (await response.json()) as Response;
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
