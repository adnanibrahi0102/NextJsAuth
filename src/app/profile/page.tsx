"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const profile = () => {
  const router = useRouter();
  const [data,setData]=useState("");

  const getUserDetails = async() =>{
    try {
      const response= await axios.post('/api/users/me');
      console.log(response.data);
      setData(response.data._id);
    } catch (error:any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const logout=async()=>{
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error:any) {
      console.log(error);
      toast.error(error.message);
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
     <h2>Profile Page</h2>
     <hr />
     <h2>{data}</h2>
    </div>
  )
}

export default profile
