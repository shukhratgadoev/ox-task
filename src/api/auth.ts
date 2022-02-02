import { instance } from "./base"

export type SignInParams = {
    username: string,
    password: string,
    subdomain: string
}

export const signIn = async (params: SignInParams) => {
    const response = await instance.request({
        url: '/security/auth_check',
        method: 'POST',
        data: `_username=${params.username}&_password=${params.password}&_subdomain=${params.subdomain}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    localStorage.setItem('ox_token', response.data.token)
    
    return response
}