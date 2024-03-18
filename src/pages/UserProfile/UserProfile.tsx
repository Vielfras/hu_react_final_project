import './UserProfile.css'

import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function UserProfile() {

  const auth = useContext(AuthContext)

  return (
    <div className='UserProfile Page'>
      <h3>User Profile</h3>
      <br></br>

      {
        (auth?.userDetails) ?
          <>
            <div className='py-3'>
              <div><b>Email:</b> {auth.userDetails.email}</div>
              <div><b>Name:</b> {auth.userDetails.name.first} {auth.userDetails.name.middle} {auth.userDetails.name.last}</div>
              <div><b>Phone:</b> {auth.userDetails.phone}</div>
              <img className='py-4' style={{ width: '100px' }} src={auth.userDetails.image.url} alt={auth.userDetails.image.alt} />
            </div>
            <p>
              <Button type='button' variant='danger' size='sm' onClick={() => auth.signOut()}>Sign Out</Button>
            </p>
          </>
          :
          <>
            <p>You have to be signed-in as a <b>User</b> or <b>Business</b> or <b>Admin</b> to view this page !</p>
            <p>Please <Link to="/signin">sign-in</Link> \ <Link to="/signup">sign-up</Link></p>
          </>
      }

    </div>
  )
}
