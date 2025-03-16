type Method = 'POST' | 'GET' | 'HEAD' | 'DELETE'

/** Параметры принимаемые `useFetch` функции */
interface FetchProps {
  url: string
  body?: unknown
  method?: Method
}

/**
 * Вспомогательная функция для отправки запроса на сервер
 *
 *  @param {FetchProps} - параметры для настройки запроса на сервер
 *  @return {T} - ответ с сервера
 *  @throws {Error} - если запрос завершился неудачно
 */
export default async function useFetch<T>({
  url,
  body,
  method = 'GET',
}: FetchProps): Promise<T> {
  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
    })
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`)

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    const contentType = response.headers.get('Content-Type') || ''
    if (!contentType.includes('application/json')) {
      return null as T
    }

    return response.json() as T
  } catch (error) {
    console.error(error)
    throw new Error()
  }
}
