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
import CreateCategory from './Admin/CreateCategory'
import CreateProduct from './Admin/CreateProduct'
import Users from './Admin/Users'
import Orders from './User/Orders'
import Profile from './User/Profile'
import Products from './Admin/Products'
import UpdateProduct from './Admin/UpdateProduct'
import SearchPage from './SearchPage'
import ProductDetails from './ProductDetails'
import Categories from './Categories'
import CategoryProduct from './CategoryProduct'
import CartPage from './CartPage'
import AdminOrders from './Admin/AdminOrders'

const MainRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/product/:slug' element={<ProductDetails />}/>
            <Route path='/categories' element={<Categories />}/>
            <Route path='/cart' element={<CartPage />}/>
            <Route path='/category/:slug' element={<CategoryProduct />}/>
            <Route path='/search' element={<SearchPage />}/>
            <Route path='/dashboard' element={<PrivateRoute />}>
              <Route path='user' element={<DashBoard />} />
              <Route path='user/orders' element={<Orders/>} />
              <Route path='user/profile' element={<Profile/>} />
            </Route>
            <Route path='/dashboard' element={<AdminRoute />}>
              <Route path='admin' element={<AdminDashboard />} />
              <Route path='admin/create-category' element={<CreateCategory />} />
              <Route path='admin/create-product' element={<CreateProduct />} />
              <Route path='admin/product/:slug' element={<UpdateProduct />} />
              <Route path='admin/products' element={<Products />} />
              <Route path='admin/users' element={<Users />} />
              <Route path='admin/orders' element={<AdminOrders />} />
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
