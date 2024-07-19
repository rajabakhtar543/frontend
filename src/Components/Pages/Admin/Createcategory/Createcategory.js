import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

import toast from 'react-hot-toast';
import axios from "axios";
import CategoryForm from "../../../Form/CategoryForm";
import {Modal} from "antd"
const Createcategory = () => {
  const [Category, setCategory] = useState([]);
  const[name,setname] = useState('')
  const [visible,setVisible]= useState(false)
  const [selected,setSelected]= useState(null)
  const [updatedName,setUpdatedName]= useState("")

  const handleSubmit = async(e)=>{
   e.preventDefault()
   try {
    const {data} = await axios.post('/api/v1/category/create-category',{name})
    if(data?.success){
      toast.success(`Category ${name} Is Created`)
      GetAllCategory();
    }
    else{
      toast.error(data.message)
    }
   } catch (error) {
    console.log(error)
    toast.error('Something Went Wrong In Input Form')
   }
  }


  const GetAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong In getting Category");
    }
  };

  useEffect(() => {
    GetAllCategory();
  }, []);
  
 const handleUpdate =async (e)=>{
  e.preventDefault();
  try {
    const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName})
    if(data.success){
      toast.success(data.message);
      setSelected(null);
      setUpdatedName('');
      setVisible(false);
      GetAllCategory();


    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error);
    toast.error("Something Went Wrong In Updatings Category");
  }

 }
 const handleDelete =async (id)=>{

  try {
    const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`)
    if(data.success){
      toast.success(data.message);
     
      GetAllCategory();


    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error);
    toast.error("Something Went Wrong In Updatings Category");
  }

 }

  return (
    <>

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <Navbar />
         <h1>Manage Categories</h1>
         <div className="p-3 w-50">
          {<CategoryForm handleSubmit={handleSubmit} value={name} setValue={setname}/> }
         </div>
          <div>
            <table className="table table-dark table-striped-columns mt-5">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                
                  {Category?.map((c) => (
                    <>
                    <tr>
                      <td key={c._id}>{c.name}</td>
                      <td>
                        <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true) ; setUpdatedName(c.name); setSelected(c)}}>Edit</button>
                        <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id)}}>Delete</button>
                      </td>
                      </tr>
                    </>
                  ))}
                
              </tbody>
            </table>
          </div>
          <Modal onCancel={()=>setVisible(false)} footer={null} visible ={visible}  ><CategoryForm  value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/></Modal>
        </div>
      </div>
    </div>
    </>
  );
};

export { Createcategory };
