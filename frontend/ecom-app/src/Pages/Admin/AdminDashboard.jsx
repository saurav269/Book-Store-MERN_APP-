import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import { useAuth } from '../../Context/AuthContext'

const AdminDashboard = () => {
  const[auth] = useAuth()
  return (
   <Layout>
    <div className="container-fluid m-4 p-4">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
           <div className="card w-75 p-3">
            <h2>Admin Name : {auth?.user?.name}</h2>
            <h2>Admin Email : {auth?.user?.email}</h2>
            <h2>Admin Contact : {auth?.user?.phone}</h2>
           </div>
        </div>
      </div>
    </div>
   </Layout>
  )
}

export default AdminDashboard
