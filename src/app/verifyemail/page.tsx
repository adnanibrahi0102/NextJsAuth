'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


 const VerifyEmailpage = () => {
    // const router = useRouter();
    const [token,setToken]=useState("");
    const [verified , setVerified] = useState(false);
    const [error,setError]=useState(false);

    const verifyEmail=async()=>{
         try {
             await axios.post('/api/users/verifyemail',{token});
             setVerified(true);
             setError(false);
         } catch (error:any) {
            setError(true);
            console.log(error.response.data)
         }
    }

    // extracting token from url
    useEffect(()=>{
     const urlToken =  window.location.search.split("=")[1];
     setToken(urlToken || "");
    },[])
    //  useEffect(()=>{
    //     const {query}= router;
    //     const urlToken :any = query.token;
    //     setToken(urlToken || "");
    //  },[])

    useEffect(()=>{
        if(token.length>0){
            verifyEmail();
        }
    },[token])
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="bg-orange-500 text-black p-2 mt-3">
        {token?`${token}`:"no token"}
        </h2>
        {verified && (
          <div>
              <h2 className="bg-green-500 text-black">Email Verified</h2>
            <Link href="/login">Login</Link>
          </div>
        )}
       {error && (
        <div>
            <h2 className="bg-red-500 text-black">{error}</h2>
        </div>
       )}
    </div>
  )
}

export default VerifyEmailpage;

