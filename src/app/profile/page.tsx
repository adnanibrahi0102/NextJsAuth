"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const profile = () => {
  const router = useRouter();
  const [data, setData] = useState("");

  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/users/me");
      console.log(response.data.data);
      setData(response.data.data._id);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2>Profile Page</h2>
      <hr />
      <h2>
        {data ? (
          <Link href={`/profile/${data}`}>{data}</Link>
        ) : (
          "Nothing avaliable"
        )}
      </h2>
      <hr />
      <button
        onClick={getUserDetails}
        className="px-4 py-2 bg-lime-500 text-black rounded"
      >
        Get user details
      </button>
      <hr />
      <button
        onClick={logout}
        className="px-4 py-2 bg-fuchsia-500 text-black rounded"
      >
        logout
      </button>
    </div>
  );
};

export default profile;
