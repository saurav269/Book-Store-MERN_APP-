import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import toast from 'react-hot-toast';
// import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const navigate = useNavigate()

    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            const res = await axios.post("http://localhost:5200/api/v1/auth/register", 
            {name, email, password, phone, address}
            );
            if(res && res.data.success){
                toast.success(res.data && res.data.message)
                navigate('/login')
                alert('User Register Successfully..🤩')
            }else{
                toast.error(res.data.message)
            }
        }catch(err){
            console.log(err)
            toast.error('Something went Wrong')
        }

    }
  return (
    <Layout title={"Register - Book App"}>
      <div className="register">
        <h2>Register Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder='Name'
              required
            />
          </div>
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
          <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
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
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder='Phone Number'
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder='Address'
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Register
