import './SignIn.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastsContext } from '../../context/ToastsContext';
import { Button, Spinner } from 'react-bootstrap';

export default function SignIn() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isBusy, setIsBusy] = useState<boolean>(false)

  const auth = useContext(AuthContext);
  const toasts = useContext(ToastsContext)

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBusy(true)

    if (!auth) {
      setIsBusy(false);
      return
    }

    const { error } = await auth?.signIn(email, password)

    if (error) {
      toasts?.addToast('⚠️', 'Error Signing-In', error, 'danger')
    } 
    else {
      toasts?.addToast('👍🏼', 'Successfully Signed-In', `Welcome ${auth.userDetails?.name}!`, 'success');

      const redirectTo = auth.userDetails?.isAdmin ? '/admin' : (auth.userDetails?.isBusiness ? '/business' : '/user');

      navigate(redirectTo);
    }

    setIsBusy(false)
  }

  return (
    <div className='SignIn Page'>
      <h3>Sign-In Page</h3>
      <br></br>

      <form onSubmit={handleSubmit}>

        <input
          type='email' value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email'
          required
        />

        <br></br><br></br>

        <input
          type='password' value={password} placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br></br><br></br>

        <Button type='submit' variant='primary' size='sm' disabled={isBusy}>
          {
            (isBusy) &&
            <Spinner
              className='me-2' as="span" animation="border"
              size="sm" role="status" aria-hidden="true"
            />
          }
          Sign In
        </Button>

      </form>
    </div>
  )
}
