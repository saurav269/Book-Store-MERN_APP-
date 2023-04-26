  import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import toast from "react-hot-toast";
import axios from 'axios';
import CategoryForm from '../../Components/Form/CategoryForm';

  
  const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const[name, setName] = useState("")

    //Form function
        const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
          const{data} = await axios.post('http://localhost:5200/api/v1/category/create-category',{name})
          if(data?.success){
            toast.success(`${data.name} is created`)
            getAllCategory()
          }
        }catch(error){
          console.log(error)
          toast.error('wrong')
        }
    };

    //For get all the categories
    const getAllCategory=async()=>{
      try{
        const {data} = await axios.get('http://localhost:5200/api/v1/category/get-category')
        if(data.success){
          setCategories(data.category)
        }
      }catch(err){
        console.log(err)
        toast.error('Something went Wrong for getting categories')
      }
    };
    useEffect(() =>{
      getAllCategory()
    },[])
    return (
      <Layout title={"Dashboard - Create Category"}>
        <div className="container-fluid m-4 p-4">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Manage All Category</h1>
              <div className='p-3 w-50'>
                <CategoryForm 
                handleSubmit={handleSubmit}
                value={name} 
                setValue={setName}
                />
              </div>
              <div className='w-75'>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      {categories?.map((ele) => (
                        <>
                        <tr>
                        <td key={ele._id}>{ele.name}</td>
                        <td>
                          <button className='btn btn-primary'>Edit</button>
                        </td>
                        </tr>
                        </>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  export default CreateCategory
  