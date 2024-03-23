import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Button, Container } from 'react-bootstrap';

import "./Business.css"
import SignInOrUpRequired from '../../components/SignInOrUpRequired/SignInOrUpRequired';

export default function Business() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Container className='BusinessPage'>
      <div>

        <h3>Business Page</h3>
        <br></br>

        {
          (auth?.userDetails) && (auth.userDetails.isBusiness || auth.userDetails.isAdmin) ?
            <div>
              <p>Welcome {auth.userDetails.name.first} 😊</p>
              <Button className='m-5' onClick={() => navigate('/create-card')} variant='primary'>
                Create Card
              </Button>
            </div>
            :
            (auth?.userDetails) ?
              <>
                <p>Welcome {auth.userDetails.name.first} 😊</p>

                <h4 className='mt-5'>Upgrade to Business Plan?</h4>
                {/* TODO - Add an business upgrade page */}
                <Button className='mb-5' onClick={() => navigate('/')} variant='primary'>
                  Upgrade!
                </Button>
              </>
              :
              <SignInOrUpRequired />
        }
      </div>

    </Container >
  );
}
