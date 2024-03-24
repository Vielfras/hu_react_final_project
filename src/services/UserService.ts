import { jwtDecode } from 'jwt-decode'
import { IUserSigninJwtPayload, IUserSignup } from '../interfaces/UserInterfaces'
import { IUserDetails } from '../interfaces/UserInterfaces'
import { apiBase } from '../config'


export const doSignIn = async (email: string, password: string): Promise<{ error: string | null, result?: IUserDetails | undefined }> => {
  try {
    const response = await fetch(`${apiBase}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await response.text()

    if (!response.ok) {
      return { error: data }
    }

    await saveToken(data)

    const { error, result } = await fetchUserDetails();
    if (error) {
      return { error }
    }

    return { error: null, result }
  }
  catch (err) {
    const errMessage = (err as Error).message
    return { error: errMessage }
  }
}


export const doSignUp = async (userData: IUserSignup): Promise<{ error: string | undefined }> => {
  try {
    const response = await fetch(`${apiBase}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data }
    }

    return { error: undefined }
  }
  catch (err) {
    const errMessage = (err as Error).message
    return { error: errMessage }
  }
}


const saveToken = async (token: string): Promise<void> => {
  localStorage.setItem('userToken', token)
}


export const removeToken = async (): Promise<void> => {
  localStorage.removeItem('userToken')
}


export const getToken = async (): Promise<string | null> => {
  const token = localStorage.getItem('userToken')
  if (token) {
    return token
  } else {
    return null
  }
}


const decodeToken = async (token: string): Promise<IUserSigninJwtPayload> => {
  return jwtDecode<IUserSigninJwtPayload>(token)
}


export const fetchUserDetails = async (): Promise<{ error: string | null, result?: IUserDetails | undefined }> => {
  const token = await getToken()
  if (!token) {
    return { error: `Can't read token from local storage` }
  }

  const { _id } = await decodeToken(token)
  try {
    const response = await fetch(`${apiBase}/users/${_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    })

    if (!response.ok) {
      return { error: `Error fetching the user's details (${response.statusText})` }
    }

    const userDetails: IUserDetails = await response.json()

    return { error: null, result: userDetails }
  } catch (err) {
    const errMessage = (err as Error).message
    return { error: `Error fetching the user's details (${errMessage})` }
  }
}
