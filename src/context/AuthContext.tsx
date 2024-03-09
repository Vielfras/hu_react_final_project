import { jwtDecode } from "jwt-decode"
import { createContext, useState } from "react"

interface AuthContextType {
  email:string|null
  isBusiness:boolean
  isAdmin:boolean
  signIn: (email:string, password:string) => Promise<void|string>
  signOut: () => void
}

interface CustomJwtPayload {
  _id:string
  isBusiness:boolean
  isAdmin:boolean
  iat:number
}

export const AuthContext = createContext<AuthContextType|undefined>(undefined);

export default function AuthProvider({children}:{children:React.ReactNode}) {

  const [email,setEmail] = useState<null|string>(null)
  const [isBusiness,setIsBusiness] = useState<boolean>(false)
  const [isAdmin,setIsAdmin] = useState<boolean>(false)

  const signIn = async (email:string, password:string) => {
    try {
      const response = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email,password})
      })
      console.log('response=',response)

      const data = await response.text()
      console.log('data=',data)

      if (!response.ok) throw new Error(data)

      const decoded = jwtDecode<CustomJwtPayload>(data)
      console.log('decoded=',decoded)

      setEmail(email)
      setIsBusiness(decoded.isBusiness)
      setIsAdmin(decoded.isAdmin)

    } catch(err) {
      const errMessage = (err as Error).message
      return errMessage
    }
  }

  const signOut = () => {
    setEmail(null)
    setIsBusiness(false)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ email, isBusiness, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
