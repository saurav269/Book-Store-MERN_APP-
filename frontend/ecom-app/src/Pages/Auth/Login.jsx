
  import React, { useState } from 'react'
  import Layout from "../../Components/Layout/Layout";
  import toast from "react-hot-toast";
  import axios from "axios";
  import { useLocation, useNavigate } from "react-router-dom";
  import '../../Style/login.css';
  import { useAuth } from '../../Context/AuthContext';

  const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            const res = await axios.post("http://localhost:5200/api/v1/auth/login", 
            {email, password}
            );
            if(res && res.data.success){
                toast.success(res.data && res.data.message)
                alert('Login Successfully..🤩')
               setAuth({
                ...auth,
                user : res.data.user,
                token : res.data.token,
               })
               localStorage.setItem('auth', JSON.stringify(res.data))

               //for redirecting to specified path or home path
                navigate(location.state || '/')
            }else{
                toast.error(res.data.message)
            }
        }catch(err){
            console.log(err)
            toast.error('User Not Registered')
        }
    }
    return (
        <Layout title={"Login - Book Store App"}>
        <div className="lgform-container">
          <form onSubmit={handleSubmit}>
          <h3 className='title'>Login Form</h3>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder='Email'
                required 
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword"
                placeholder='Password'
                required
              />
            </div>
            <div className='mb-3'>
            <button type="submit" onClick={() => {navigate('/forgot-password')}} className="btn btn-primary">
              Forgot Password
            </button>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </Layout>
    )
  }
  
  export default Login
  