import './Admin.css'

import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import SignInOrUpRequired from '../../components/SignInOrUpRequired/SignInOrUpRequired'

export default function Admin() {

  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <div className='Admin Page'>
      <h3>Admin Page</h3>
      <br></br>

      {
        (auth?.userDetails) && (auth.userDetails.isAdmin) ?
          <p>Welcome {auth.userDetails.name.first} 😊</p>
        :
          <SignInOrUpRequired />
      }

    </div>
  )
}
