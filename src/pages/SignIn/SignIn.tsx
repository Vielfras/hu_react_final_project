import './SignIn.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastsContext } from '../../context/ToastsContext';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import FormField from '../../components/FormField/FormField';

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
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={12}>
          <div className='SignIn Page text-center' style={{ maxWidth: "600px", margin: "auto" }}>
            <h3>Sign-In</h3>
            <form onSubmit={handleSubmit}>
              <FormField controlId="formBasicEmail" label="" type="email" 
                placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
              />
              <FormField controlId="formBasicPassword" label="" type="password" 
                placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}
              />

              <Button type='submit' variant='primary' size='sm' disabled={isBusy} className="mt-4">
                {isBusy && (
                  <Spinner
                    className='me-2' as="span" animation="border"
                    size="sm" role="status" aria-hidden="true"
                  />
                )}
                Sign In
              </Button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}