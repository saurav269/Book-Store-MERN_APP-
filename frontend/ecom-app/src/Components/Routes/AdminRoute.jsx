   

   
  import React, { useEffect, useState } from 'react'
  import { useAuth } from '../../Context/AuthContext'
  import { Outlet } from 'react-router-dom'
  import axios from 'axios'
  import Spinner from '../Spinner'
    
    export default function AdminRoute(){
      const [ok, setOk] = useState(false)
      const[auth, setAuth] = useAuth()
  
      useEffect(() =>{
         const authCheck = async() => {
          const res = await axios.get('https://pear-worried-bonobo.cyclic.app/api/v1/auth/admin-auth',{
              headers : {
                  'Authorization' : auth?.token
              }
          })
          if(res.data.ok){
              setOk(true)
          }else{
              setOk(false)
          }
         }
         if(auth?.token) authCheck()
      },[auth?.token])
  
      return ok ? <Outlet /> : <Spinner path='' /> 
    }
    