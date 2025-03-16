export interface ServerResponseError {
  message: string | string[]
  error: string
  statusCode: number
}

export interface ServerResponseAuth extends ServerResponseError {
  id: number
  email: string
  password: string
}

export interface ServerResponseAccessToken extends ServerResponseError {
  accessToken: string
}
