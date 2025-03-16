export interface User {
  id?: number | undefined
  email: string
  password: string
}

export interface UserRegistration extends User {
  confirm_password: string
}
