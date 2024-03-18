
// ============================================= WORK IN PROGRESS =============================================

import { PropsWithChildren, useContext } from "react"
import { AuthContext } from "../../context/AuthContext";

interface IRestrictedProps {
  minimumRole:('user'|'business'|'admin')
}

export default function Restricted(props:PropsWithChildren<IRestrictedProps>) {

  const { minimumRole, children } = props;
  
  const auth = useContext(AuthContext)
  const userRole = auth?.userDetails

  return (
    {children}
  )
}

// ============================================= WORK IN PROGRESS =============================================