import './SignUp.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastsContext } from '../../context/ToastsContext';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';

export default function SignUp() {

  const [firstName, setFirstName] = useState<string>('Arik')
  const [lastName, setLastName] = useState<string>('Lavi')
  const [phone,setPhone] = useState<string>('0525807777')
  const [email, setEmail] = useState<string>('arikla@gmail.com');
  const [password, setPassword] = useState<string>('Arik12345!');
  const [passwordVerification, setPasswordVerification] = useState<string>('Arik12345!');
  const [country, setCountry] = useState<string>('Israel');
  const [city, setCity] = useState<string>('Haifa');
  const [street, setStreet] = useState<string>('Palyam');
  const [houseNumber, setHouseNumber] = useState<string>('12');
  const [zipCode, setZipCode] = useState<string>('21800');
  const [isBusiness, setIsBusiness] = useState<boolean>(true);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const auth = useContext(AuthContext);
  const toasts = useContext(ToastsContext)
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBusy(true)
    if (!auth) { setIsBusy(false); return }

    const userData = {
      name: {
        first:firstName,
        last:lastName,
      },
      phone: phone,
      email: email,
      password: password,
      image: {
        url: 'https://cdns-images.dzcdn.net/images/artist/300b1c998b93b8a62b050a4b10b14b12/264x264.jpg',
        alt: 'You wrote that this is NOT required 😉',
      },
      address: {
        country: country,
        city: city,
        street: street,
        houseNumber: Number(houseNumber),
        zip: Number(zipCode),
      },
      isBusiness: isBusiness,
    }

    console.log(userData)

    const { error } = await auth?.signUp(userData)

    if (error) {
      toasts?.addToast('⚠️', 'Error Signing-Up', error, 'danger')
    } else {
      toasts?.addToast('👍🏼', 'Successfully Signed-Up', `Please sign in with your credentials.`, 'success')
      navigate('/signin')
    }
    setIsBusy(false)
  }

  return (
    <div className='SignUp Page'>
      <h3>Sign-Up Page</h3>
      <br></br>

      <Container>
        <Row>
          <Col></Col>
          <Col xs="auto" className='border border-1 rounded-3 border-secondary-subtle p-5 text-start'>
            <Form onSubmit={handleSubmit}>

              {/* Full Name -------------------------------------------------- */}

              <Row className="mb-4 fw-bold">
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="First" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control type="text" placeholder="Last" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                </Form.Group>
              </Row>

              {/* Phone & Email ---------------------------------------------- */}

              <Row className="mb-4 fw-bold">
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>Phone & Email</Form.Label>
                  <Form.Control type="phone" placeholder="Phone number" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control type="email" placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>
              </Row>

              {/* Password -------------------------------------------------- */}

              <Row className="mb-4 fw-bold">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPasswordVerification">
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control type="password" placeholder="Password again" value={passwordVerification} onChange={(e)=>setPasswordVerification(e.target.value)}/>
                </Form.Group>
              </Row>

              {/* Address ---------------------------------------------------- */}

              <Row className="fw-bold">
                <Form.Group as={Col} controlId="formGridCountry">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="Country" value={country} onChange={(e)=>setCountry(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)}/>
                </Form.Group>
              </Row>

              <Row className="mb-4">
                <Form.Group as={Col} controlId="formGridStreet">
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control placeholder="Street" value={street} onChange={(e)=>setStreet(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridHouseNumber">
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control placeholder="House number" value={houseNumber} onChange={(e)=>setHouseNumber(e.target.value)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZipCode">
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control placeholder="Zip code" value={zipCode} onChange={(e)=>setZipCode(e.target.value)}/>
                </Form.Group>
              </Row>

              {/* Business --------------------------------------------------- */}

              <Row className="mt-4 fw-bold">
                <Form.Label>SignUp as a Business ?</Form.Label>
              </Row>

              <Row className="mt-1">
                <Form.Group className="mb-5" id="formGridIsBusiness">
                  <Form.Check type="checkbox" label="Yes" checked={isBusiness} onChange={(e)=>setIsBusiness(e.target.checked)}/>
                </Form.Group>
              </Row>

              {/* Submit ---------------------------------------------------- */}

              <Row className="fw-bold border-bottom"></Row>

              <Row>
                <Col></Col>
                <Col>
                  <div className="text-center mt-5 d-grid">
                    <Button type='submit' variant='primary' size='sm' disabled={isBusy}>
                      {
                        (isBusy) &&
                        <Spinner
                          className='me-3'
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      }
                      Sign Up
                    </Button>
                  </div>
                </Col>
                <Col></Col>
              </Row>

              {/* ----------------------------------------------------------- */}

            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>

    </div>
  )
}
