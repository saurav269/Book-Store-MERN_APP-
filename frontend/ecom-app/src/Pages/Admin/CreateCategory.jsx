import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import CategoryForm from "../../Components/Form/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    //  console.log('hello')
    try {
      const { data } = await axios.post(
        "http://localhost:5200/api/v1/category/create-category",
        { name }
      );
      console.log(data);
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("wrong");
    }
    setName("")
  };

  //For get all the categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5200/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went Wrong for getting categories");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //FOR UPDATE CATEGORY
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(e)
      const { data } = await axios.put(
        `http://localhost:5200/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} has been updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

    //FOR DELETE CATEGORY
    const handleDeleteSubmit = async (pId) => {
      try {
        // console.log(e)
        const { data } = await axios.delete(
          `http://localhost:5200/api/v1/category/delete-category/${pId}`,
        );
        if (data.success) {
          toast.success(`category has been deleted`);
          getAllCategory();
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-4 p-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage All Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
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
                          <button
                            className="btn btn-warning ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(ele.name);
                              setSelected(ele)
                            }}
                          >
                            Edit
                          </button>
                          <button className="btn btn-danger ms-2" onClick={() => {handleDeleteSubmit(ele._id)}}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdateSubmit}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
