import './User.css'

import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import SignInOrUpRequired from '../../components/SignInOrUpRequired/SignInOrUpRequired'
import { Button } from 'react-bootstrap'

export default function User() {

  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <div className='User Page'>
      <h3>User Page</h3>
      <br></br>

      {
        (auth?.userDetails) ?
        <>
          <p>Welcome {auth.userDetails.name.first} 😊</p>
          <Button onClick={() => navigate('/mycards')} className='mt-3 mx-3' variant='primary' size='m'>My Cards</Button>
          <Button onClick={() => navigate('/liked-cards')} className='mt-3 mx-3' variant='primary' size='m'>Liked Cards</Button>
        </>
        :
          <SignInOrUpRequired />
      }

    </div>
  )
}
