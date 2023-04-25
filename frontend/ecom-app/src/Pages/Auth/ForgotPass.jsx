

  import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import '../../Style/login.css';
  
  const ForgotPass = () => {
    const [email, setEmail] = useState("")
    const [newpassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()

    //Form Functionality
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            const res = await axios.post("http://localhost:5200/api/v1/auth/forgot-password", 
            {email,
             newpassword,
             answer,
            }
            );
            if(res && res.data.success){
                toast.success(res.data && res.data.message)
                alert('Password Reset Successfully..🤩')
               //redirecting to login
                navigate('/login')
            }else{
                toast.error(res.data.message)
            }
        }catch(err){
            console.log(err)
            toast.error('User Not Registered')
        }
    }

    return (
       <Layout title={'Forgot-Password - Book Store App'}>
            <div className="lgform-container">
          <form onSubmit={handleSubmit}>
          <h3 className='title'>Reset Password</h3>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder='Email'
                required 
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                placeholder='Enter your favourite book name'
                required 
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                placeholder='Enter New Password'
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Reset
            </button>
          </form>
        </div>
        </Layout>
    )
  }
  
  export default ForgotPass
  