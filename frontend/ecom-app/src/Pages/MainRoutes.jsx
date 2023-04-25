import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'
import PagenotFound from './PagenotFound'
import Register from './Auth/Register'
import Login from './Auth/Login'
import DashBoard from './User/DashBoard'
import PrivateRoute from '../Components/Routes/PrivateRoute'

const MainRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/dashboard' element={<PrivateRoute />}>
              <Route path='' element={<DashBoard />} />
            </Route>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/about' element={<AboutPage />}/>
            <Route path='/contact' element={<ContactPage />}/>
            <Route path='*' element={<PagenotFound />}/>
        </Routes>
      
    </div>
  )
}

export default MainRoutes
