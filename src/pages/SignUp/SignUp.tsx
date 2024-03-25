import './SignUp.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastsContext } from '../../context/ToastsContext';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import FormField from '../../components/FormField/FormField';

export default function SignUp() {
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

  const phoneRegex = /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/;
  const nameRegex = /^[A-Za-z]{2,}$/;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d.*\d.*\d)(?=.*[_*&^%$#@!-])[A-Za-z\d_*&^%$#@!-]{8,}$/;
  const [phoneIsValid, setPhoneIsValid] = useState<boolean>(true);
  const [firstNameIsValid, setFirstNameIsValid] = useState<boolean>(true);
  const [middleNameIsValid, setMiddleNameIsValid] = useState<boolean>(true);
  const [lastNameIsValid, setLastNameIsValid] = useState<boolean>(true);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
  const [passwordVerificationIsValid, setPasswordVerificationIsValid] = useState<boolean>(true);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    setFirstNameIsValid(nameRegex.test(value));
  };

  const handleMiddleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMiddleName(value);
    setMiddleNameIsValid(value === '' || nameRegex.test(value));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    setLastNameIsValid(nameRegex.test(value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setPhoneIsValid(phoneRegex.test(value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailIsValid(emailRegex.test(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);

    setPasswordIsValid(passwordRegex.test(value));
  };

  const handlePasswordVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPasswordVerification(value);
    setPasswordVerificationIsValid(value === password);
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
        url: 'https://lorempokemon.fakerapi.it/pokemon',
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

    if (!firstNameIsValid || !middleNameIsValid || !lastNameIsValid || !emailIsValid || !passwordIsValid || !passwordVerificationIsValid) {
      toasts?.addToast('⚠️', 'Error Signing-Up', 'Please correct invalid fields.', 'danger');
      setIsBusy(false);
      return;
    }

    const { error } = await auth?.signUp(userData)
    console.log(error);

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
                <FormField
                  controlId="formGridFirstName" label="Name" type="text" placeholder="First"
                  value={firstName || ''} onChange={handleFirstNameChange}
                  regex={nameRegex} validationMessage="First name must be at least 2 letters." isValid={firstNameIsValid}
                />
                <FormField
                  controlId="formGridMiddleName" label="&nbsp;" type="text" placeholder="Middle (optional)"
                  value={middleName || ''} onChange={handleMiddleNameChange}
                  regex={nameRegex} validationMessage="Middle name must be at least 2 letters." isValid={middleNameIsValid}
                />
                <FormField
                  controlId="formGridLastName" label="&nbsp;" type="text"
                  placeholder="Last" value={lastName || ''} onChange={handleLastNameChange}
                  regex={nameRegex} validationMessage="Last name must be at least 2 letters." isValid={lastNameIsValid}
                />
              </Row>

              {/* Phone & Email ---------------------------------------------- */}

              <Row className="mb-4 fw-bold">
                <FormField controlId="formGridPhone" label="Phone" type="text" placeholder="Phone number" value={phone || ''}
                  onChange={handlePhoneChange} regex={phoneRegex} validationMessage="Please enter a valid phone number." isValid={phoneIsValid}
                />
                <FormField
                  controlId="formGridEmail" label="Email" type="email" placeholder="Email Address" value={email || ''}
                  onChange={handleEmailChange} regex={emailRegex} validationMessage="Please enter a valid email address." isValid={emailIsValid}
                />
              </Row>

              {/* Password -------------------------------------------------- */}

              <Row className="mb-4 fw-bold">
                <FormField controlId="formGridPassword" label="Password" type="password" placeholder="Password" value={password || ''}
                  onChange={handlePasswordChange} regex={passwordRegex} validationMessage="Password must be at least 8 characters long, include 1 capital letter, 1 lowercase letter, at least 1 number, and 1 special character (*_-&^%$#@!)." isValid={passwordIsValid}
                />

                <Col md={6}>
                  <Form.Label>Password Verification</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Verify Password"
                    value={passwordVerification}
                    onChange={handlePasswordVerificationChange}
                    isInvalid={!passwordVerificationIsValid}
                  />
                  {!passwordVerificationIsValid && (
                    <Form.Control.Feedback type="invalid">
                      Passwords must match.
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Row>

              <Row className="m-5 fw-bold border-bottom"></Row>

              {/* Address ---------------------------------------------------- */}

              <Row className="mb-4 fw-bold">
                <FormField controlId="formGridCountry" label="Country" type="text"
                  placeholder="Country" value={country || ''} onChange={(e) => setCountry(e.target.value)}
                />
                <FormField controlId="formGridCity" label="City" type="text"
                  placeholder="City" value={city || ''} onChange={(e) => setCity(e.target.value)}
                />
              </Row>

              <Row className="mb-4 fw-bold">
                <FormField controlId="formGridStreet" label="Street" type="text"
                  placeholder="Street" value={street || ''} onChange={(e) => setStreet(e.target.value)}
                />
                <FormField controlId="formGridHouseNumber" label="House" type="text"
                  placeholder="House number" value={houseNumber || ''} onChange={(e) => setHouseNumber(e.target.value)}
                />
                <FormField controlId="formGridZipCode" label="Zip Code" type="text"
                  placeholder="Zip code" value={zipCode || ''} onChange={(e) => setZipCode(e.target.value)}
                />
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
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>

    </div>
  )
}
