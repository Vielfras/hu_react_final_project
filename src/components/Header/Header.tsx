import './Header.css'
import { FaCircleUser, FaMagnifyingGlass } from "react-icons/fa6";
import { BiSolidCircle } from "react-icons/bi";
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const elmDocument = document.querySelector('html') as HTMLHtmlElement

export default function Header() {

  const [theme, setTheme] = useState('light')

  const auth = useContext(AuthContext)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'; // Determine the new theme based on the current one
    setTheme(newTheme); // Update the state with the new theme
    elmDocument.setAttribute('data-bs-theme', newTheme); // Set the attribute based on the new theme
  }

  return (
    <div className='Header'>

      <div className="navbar navbar-light navbar-expand-xl px-2 border-bottom pb-4">

        {/* ---- Logo ------------------------------------------------------------------------------------------------------------------------------------------ */}
        <Link to={'/'} className="navbar-brand">
          <BiSolidCircle size={30} color='red' />
          <BiSolidCircle size={30} color='orange' style={{ marginLeft: '-15px', opacity: '0.7' }} />
          <span style={{ fontWeight: '500', fontFamily: 'monospace' }}>BizCard</span>
        </Link>

        {/* ---- Search ---------------------------------------------------------------------------------------------------------------------------------------- */}
        <div className="col-lg-5 mx-auto w-50">
          <div className="input-group">
            <input className="form-control border-end-0 border rounded-3" type="search" id="header-search-input" /> {/*value="search"*/}
            <span className="input-group-append">
              <button style={{ marginLeft: '-41px' }} className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-3" type="button">
                <FaMagnifyingGlass />
              </button>
            </span>
          </div>
        </div>

        {/* ---- Hamburger ------------------------------------------------------------------------------------------------------------------------------------- */}
        <button className="navbar-toggler ms-2" data-bs-toggle="collapse" data-bs-target="#menu">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ---- Nav Links ------------------------------------------------------------------------------------------------------------------------------------- */}
        <div className="navbar-collapse collapse" id="menu">
          <ul className="navbar-nav ms-auto" style={{ listStyle: 'none' }}>

            {/* ---- Pages ------------------------------------------------------------------------------------------------------------------------------------- */}
            <li className="nav-item mx-2">
              <Link to={'/'} className='nav-link'>Home</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to={'/free'} className='nav-link'>Free</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to={'/user'} className='nav-link'>User</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to={'/business'} className='nav-link'>Biz</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to={'/admin'} className='nav-link'>Admin</Link>
            </li>

            {/* ---- Light\Dark Mode --------------------------------------------------------------------------------------------------------------------------- */}
            <li className="nav-item mx-3 theme-icon my-auto">
              <button type="button" className='dark-light-mode-button' onClick={() => toggleTheme()}><svg fill={theme === 'light' ? 'black' : 'white'} viewBox="0 0 20 20" width="22" height="22"><path d="M10 1.81818C5.48818 1.81818 1.81818 5.48818 1.81818 10C1.81818 14.5118 5.48818 18.1818 10 18.1818C14.5118 18.1818 18.1818 14.5118 18.1818 10C18.1818 5.48818 14.5118 1.81818 10 1.81818ZM10 20C4.48636 20 0 15.5136 0 10C0 4.48636 4.48636 0 10 0C15.5136 0 20 4.48636 20 10C20 15.5136 15.5136 20 10 20Z"></path><path d="M5.51758 14.4869C7.97576 16.9442 11.9603 16.9442 14.4185 14.4869C16.8757 12.0296 16.8757 8.04418 14.4185 5.58691L5.51758 14.4869Z"></path></svg></button>
            </li>

            {/* ---- User Profile ------------------------------------------------------------------------------------------------------------------------------ */}
            <li className="nav-item mx-3">
              <a href='#' className="nav-link">
                <FaCircleUser className={`profile-icon ${auth?.email && 'signed-in'}`} size={24}/>
              </a>
            </li>

          </ul>
        </div>

      </div>

    </div>
  )
}
