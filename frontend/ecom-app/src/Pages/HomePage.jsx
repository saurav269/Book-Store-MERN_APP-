import React from 'react'
import Layout from '../Components/Layout/Layout'
import { useAuth } from '../Context/AuthContext'

const HomePage = () => {
  const [auth, setAuth] = useAuth()
  return (
    <Layout title={'Book Store - Shop Now'}>
        <h1>Home Page</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  )
}

export default HomePage
