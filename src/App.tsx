
import './App.css'

import Default from './layouts/Default/Default'

import UserContext from './store/user-contect.js'

export default function App() {

  const 
  return (
    <>
      <UserContext.Provider value={{
        user: {email: '', password: ''},
        isLoggedIn: false,
        login: null,
        

      }}>
        <Default></Default>
      </UserContext.Provider>
    </>
  )
}