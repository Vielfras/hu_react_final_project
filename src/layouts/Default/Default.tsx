import './Default.css'

import { Route, Routes } from 'react-router-dom'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import Home from '../../pages/Home/Home'
import About from '../../pages/About/About'
import NotFound from '../../pages/NotFound/NotFound'


export default function Default() {
    return (
        <div className='Default'>
            <Header/>

            <Routes>
                <Route path='/home' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                
                <Route path='/' element={<Home/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>

            <Footer/>

        </div>
    )
}

