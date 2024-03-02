import "./Header.css"

import { Link } from 'react-router-dom'

interface IHeader {
}

export default function Header(props: IHeader) {
  return (
    <div className='Header'>
      <Link to={'/home'}>Home</Link>
      <Link to={'/about'}>About</Link>
      <Link to={'/m'}>404</Link>

    </div>
  )
}
