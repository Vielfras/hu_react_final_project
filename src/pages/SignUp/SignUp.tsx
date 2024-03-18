import './SignUp.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastsContext } from '../../context/ToastsContext';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import FormField from '../../components/FormField/FormField';

export default function SignUp() {

  // const [firstName, setFirstName] = useState<string>('Arik')
  // const [lastName, setLastName] = useState<string>('Lavi')
  // const [phone,setPhone] = useState<string>('0525807777')
  // const [email, setEmail] = useState<string>('arikla@gmail.com');
  // const [password, setPassword] = useState<string>('Arik12345!');
  // const [passwordVerification, setPasswordVerification] = useState<string>('Arik12345!');
  // const [country, setCountry] = useState<string>('Israel');
  // const [city, setCity] = useState<string>('Haifa');
  // const [street, setStreet] = useState<string>('Palyam');
  // const [houseNumber, setHouseNumber] = useState<string>('12');
  // const [zipCode, setZipCode] = useState<string>('21800');
  // const [isBusiness, setIsBusiness] = useState<boolean>(true);
  // const [isBusy, setIsBusy] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>()
  const [middleName, setMiddleName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordVerification, setPasswordVerification] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [city, setCity] = useState<string>();
  const [street, setStreet] = useState<string>();
  const [houseNumber, setHouseNumber] = useState<string>();
  const [zipCode, setZipCode] = useState<string>();
  const [isBusiness, setIsBusiness] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>();

  const auth = useContext(AuthContext);
  const toasts = useContext(ToastsContext)
  const navigate = useNavigate();


  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_*&^%$#@!-])[A-Za-z\d_*&^%$#@!-]{8,}$/;
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailIsValid(emailRegex.test(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordIsValid(passwordRegex.test(value));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBusy(true)
    if (!auth) { setIsBusy(false); return }

    const userData = {
      name: {
        first: firstName,
        middle: middleName,
        last: lastName,
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

    const { error } = await auth?.signUp(userData)

    if (error) {
      toasts?.addToast('⚠️', 'Error Signing-Up', error, 'danger')
    } else {
      toasts?.addToast('👍🏼', 'Successfully Signed-Up', `Please sign in with your credentials.`, 'success')
      navigate('/signin')
    }
    setIsBusy(false)
  }

  //  TODO - Replace all form fields with FormField
  return (
    <div className='SignUp Page'>
      <h3 className="display-6 fw-bold">Sign-Up Page</h3>
      <br></br>

      <Container>
        <Row>
          <Col></Col>
          <Col xs="auto" className='border border-1 rounded-3 border-secondary-subtle p-5 text-start'>
            <Form onSubmit={handleSubmit}>

              {/* Full Name -------------------------------------------------- */}

              <Row className="mb-4 fw-bold">
                <FormField controlId="formGridFirstName" label="Name" type="text"
                  placeholder="First" value={firstName || ''} onChange={(e) => setFirstName(e.target.value)} />
                <FormField controlId="formGridMiddleName" label="&nbsp;" type="text"
                  placeholder="Middle" value={middleName || ''} onChange={(e) => setMiddleName(e.target.value)} />

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control type="text" placeholder="Last" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>
              </Row>

              {/* Phone & Email ---------------------------------------------- */}

              <Row className="mb-4 fw-bold">
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="phone" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Form.Group>

                <FormField
                  controlId="formGridEmail" label="Email" type="email" placeholder="Email Address" value={email || ''}
                  onChange={handleEmailChange}
                  regex={emailRegex} validationMessage="Please enter a valid email address." isValid={emailIsValid}
                />
              </Row>

              {/* Password -------------------------------------------------- */}

              <Row className="mb-4 fw-bold">
                <FormField controlId="formGridPassword" label="Password" type="password" placeholder="Password" value={password || ''} 
                  onChange={handlePasswordChange} regex={passwordRegex} validationMessage="Password must be at least 8 characters long, include 1 capital letter, 1 lowercase letter, at least 1 number, and 1 special character (*_-&^%$#@!)." isValid={passwordIsValid}
                />

                <Form.Group as={Col} controlId="formGridPasswordVerification">
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control type="password" placeholder="Repeat Password" value={passwordVerification} onChange={(e) => setPasswordVerification(e.target.value)} />
                </Form.Group>
              </Row>

              <Row className="m-5 fw-bold border-bottom"></Row>

              {/* Address ---------------------------------------------------- */}

              <Row className="mb-4  fw-bold">
                <Form.Group as={Col} controlId="formGridCountry">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                </Form.Group>
              </Row>

              <Row className="mb-4 fw-bold">
                <Form.Group as={Col} controlId="formGridStreet">
                  <Form.Label>Street</Form.Label>
                  <Form.Control placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridHouseNumber">
                  <Form.Label>House</Form.Label>
                  <Form.Control placeholder="House number" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZipCode">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control placeholder="Zip code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                </Form.Group>
              </Row>

              <Row className="m-5 fw-bold border-bottom"></Row>

              {/* Business --------------------------------------------------- */}

              <Row className="text-center mb-4">
                <Col>
                  <Form.Label className="fw-bold">Sign Up as a Business?</Form.Label>
                  <Form.Group id="formGridIsBusiness" className="d-flex justify-content-center">
                    <Form.Check type="checkbox" label="Yes" checked={isBusiness} onChange={(e) => setIsBusiness(e.target.checked)} />
                  </Form.Group>
                </Col>
              </Row>

              {/* Submit ---------------------------------------------------- */}

              <Row className="m-5 mt-1 mb-1 fw-bold border-bottom"></Row>

              <Row>
                <Col></Col>
                <Col>
                  <div className="text-center mt-4 d-grid">
                    <Button type='submit' variant='primary' size='sm' className="fw-bold" disabled={isBusy}>
                      {isBusy && (
                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                      )}
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
