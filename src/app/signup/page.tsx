"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const router = useRouter();

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        router.push("/login");
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-gray-900 shadow-md shadow-emerald-400 rounded-md p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {loading ? "Processing" : "Signup"}
        </h1>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">
            UserName
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter Your UserName"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full p-2 rounded-sm outline-none border border-gray-300 focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-2 rounded-sm outline-none border border-gray-300 focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full p-2 rounded-sm outline-none border border-gray-300 focus:border-blue-500 text-black"
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <button
            className="px-4 py-2 bg-gray-700 rounded-md w-full shadow-md shadow-emerald-600 hover:bg-slate-950 "
            onClick={onSignup}
          >
            {buttonDisabled ? "No Signup" : "SignUp"}
          </button>
          <p className="font-thin text-sm underline">
            <Link href="/login">Vist Login Page</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
