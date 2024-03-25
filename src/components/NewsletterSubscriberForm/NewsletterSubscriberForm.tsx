import React, { useState } from 'react';
import "./NewsletterSubscriberForm.css";

interface INewsletterSubscriberForm {
  email: string;
  subPhase: 'before' | 'working' | 'after';
  setEmail: (email: string) => void;
  handleSubscribe: () => void;
};

export default function NewsletterSubscriberForm({ email, subPhase, setEmail, handleSubscribe }: INewsletterSubscriberForm) {
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailIsValid(emailRegex.test(newEmail));
  };

  return (
    <div className='d-flex align-items-center'>
      <input
        type="text"
        value={email}
        onChange={handleEmailChange}
        className={`form-control form-control-sm me-2 ${!emailIsValid ? 'is-invalid' : ''}`}
        placeholder="name@example.com"
        disabled={subPhase === 'after'}
      />
      <div className={!emailIsValid ? 'invalid-feedback d-block' : 'd-none'}>
        Please enter a valid email address.
      </div>
      <button
        onClick={handleSubscribe}
        className={`btn btn-sm ${subPhase === 'after' ? 'btn-success' : 'btn-danger'}`}
        style={{ lineHeight: '18px' }}
        disabled={subPhase === 'after' || !emailIsValid}
      >
        {subPhase === 'before' && 'Subscribe'}
        {subPhase === 'working' && (
          <div className='d-flex'>
            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
            <span role="status">Wait...</span>
          </div>
        )}
        {subPhase === 'after' && 'Success'}
      </button>
    </div>
  );
}
