const API_URL = import.meta.env.VITE_API_URL as string
const API_TOKEN = import.meta.env.VITE_API_TOKEN as string
const NGROK_SKIP_WARNING = import.meta.env.VITE_NGROK_SKIP_BROWSER_WARNING as string | undefined

export interface ApiError extends Error {
  status: number
}

async function parseError(res: Response): Promise<string> {
  try {
    const body = await res.json()
    if (body?.message) {return Array.isArray(body.message) ? body.message.join(', ') : String(body.message)}
    if (body?.errors) {return Object.values(body.errors).flat().join(', ')}
  } catch {
    // Ignore
  }
  return res.statusText
}

export async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(NGROK_SKIP_WARNING ? { 'ngrok-skip-browser-warning': NGROK_SKIP_WARNING } : {}),
    ...(options.headers as Record<string, string>),
  }

  if (API_TOKEN) {
    headers['Authorization'] = `Bearer ${API_TOKEN}`
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })

  if (res.status === 204) {return undefined as T}

  if (!res.ok) {
    const message = await parseError(res)
    const error = new Error(message) as ApiError
    error.status = res.status
    throw error
  }

  return res.json() as Promise<T>
}
