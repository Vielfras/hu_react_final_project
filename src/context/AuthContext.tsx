import { IUserDetails, IUserSignup } from "../interfaces/UserInterfaces"
import { createContext, useEffect, useState } from "react"
import { doSignIn, doSignUp, fetchUserDetails, removeToken } from "../services/UserService"

interface AuthContextType {
  userDetails:IUserDetails|undefined
  signIn: (email:string, password:string) => Promise<{error:string|null}>
  signUp: ({}:IUserSignup) => Promise<{error:string|undefined}>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType|undefined>(undefined);

export default function AuthProvider({children}:{children:React.ReactNode}) {

  const [userDetails,setUserDetails] = useState<IUserDetails|undefined>(undefined)

  useEffect(()=>{
    const loadUserDetails = async () => {
      const { error, result } = await fetchUserDetails()
      if (error) setUserDetails(undefined)
      setUserDetails(result)
    }
    loadUserDetails();
  },[userDetails])
  
  const signIn = async (email:string, password:string):Promise<{error:string|null}> => {
    let { error,result } = await doSignIn(email,password)

    if (error) { 
      signOut()
      return { error }
    }

    if (result) {
      setUserDetails(result)     // TODO: return result be make sure state is changed before returning a value
      return { error:null }
    }

    return { error:null }
  }

  const signUp = async (userData:IUserSignup):Promise<{error:string|undefined}> => {
    const { error } = await doSignUp(userData)

    if (error) { 
      signOut()
      return { error }
    }

    return { error:undefined }
  }

  const signOut = async () => {
    await removeToken()    
    setUserDetails(undefined)
  }

  return (
    <AuthContext.Provider value={{ userDetails, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}
