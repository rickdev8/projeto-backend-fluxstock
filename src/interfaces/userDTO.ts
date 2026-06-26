export interface UserDTO {
    id: string,
    email: string,
    name: string
    password: string 
}

export type UserResponseDTO = Omit<UserDTO, 'password'>
