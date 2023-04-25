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
import ForgotPass from './Auth/ForgotPass'
import AdminRoute from '../Components/Routes/AdminRoute'
import AdminDashboard from './Admin/AdminDashboard'

const MainRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/dashboard' element={<PrivateRoute />}>
              <Route path='user' element={<DashBoard />} />
            </Route>
            <Route path='/dashboard' element={<AdminRoute />}>
              <Route path='admin' element={<AdminDashboard />} />
            </Route>
            <Route path='/register' element={<Register />}/>
            <Route path='/forgot-password' element={<ForgotPass />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/about' element={<AboutPage />}/>
            <Route path='/contact' element={<ContactPage />}/>
            <Route path='*' element={<PagenotFound />}/>
        </Routes>
      
    </div>
  )
}

export default MainRoutes
