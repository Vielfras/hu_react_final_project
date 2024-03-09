import { useContext, useState } from 'react'
import './SignIn.css'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {

  const [email,setEmail] = useState('admin@gmail.com');
  const [password,setPassword] = useState('Abc!123Abc');

  const [error,setError] = useState<string|null>(null);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if(auth) {
      const errMessage = await auth.signIn(email,password)
      if (!errMessage) {
        navigate('/')
      } else {
        setError(errMessage)
      }
    }
  }

  return (
    <div className='SignIn Page'>
      <h3>SignIn Page</h3>
      <br></br>

      <form onSubmit={handleSubmit}>

        <input
          type='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder='Enter your email'
          required
        />

        <br></br><br></br>

        <input
          type='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder='Enter your password'
          required
        />

        <br></br><br></br>

        <button type='submit'>SignIn</button>

        <br></br><br></br>

        {
          (error) && <p style={{color:'red'}}>{error}</p>
        }

      </form>
    </div>
  )
}
