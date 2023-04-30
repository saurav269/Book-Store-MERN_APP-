import React, { useEffect, useState } from 'react'
import Layout from './../../Components/Layout/Layout';
import UserMenu from '../../Components/Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

const Orders = () => {
    const[orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth()

    const getOrders = async() =>{
        try{
            const {data} = await axios.get('http://localhost:5200/api/v1/auth/orders')
            setOrders(data)
        }catch(err){
            console.log(err)
        }
    };
    useEffect(() =>{
        if(auth?.token) getOrders();
    },[auth?.token]);

  return (
    <Layout title={'Your Orders'}>
        <div className="container-flui p-3 m-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    <h1>All Orders</h1>
                    <p>{JSON.stringify(orders, null, 4)}</p>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Orders
