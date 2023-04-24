import React from 'react'
import Layout from '../Components/Layout/Layout'
import { Link, Navigate } from 'react-router-dom'


const PagenotFound = () => {

  return (
    <Layout title={'Go back'}>
      <div className='pnf'>
        <h1 style={{fontSize : "90px", fontWeight : "800px"}}>404</h1>
        <h2>Page Not Found!</h2>
        <div className='pnfBtn'>
          <Link to='/'>
          <button>Go Back</button>
          </Link>
        </div>
      </div>

    </Layout>
  )
}

export default PagenotFound
