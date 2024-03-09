import './User.css'

import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function User() {

  const auth = useContext(AuthContext)

  return (
    <div className='User Page'>
      <h3>User Page</h3>
      <br></br>
      <button onClick={()=>auth?.signIn('admin@gmail.com','Abc!123Abc')} type='button'>SignIn</button>
      <br></br><br></br>
      <div>User Email = {auth?.email}</div>
      <div>Is Business = {auth?.isBusiness.toString()}</div>
      <div>Is Admin = {auth?.isAdmin.toString()}</div>
    </div>
  )
}
