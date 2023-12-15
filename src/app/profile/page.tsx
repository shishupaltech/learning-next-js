"use client";
import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast";
import  {useRouter}  from "next/navigation";
import { useState } from "react";
export default function ProfilePage(){
    const router = useRouter();
    const [data,setData] = useState('nothing');
    const logout =async ()=>{
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');

        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        try {
            console.log("working");
            const res = await axios.get('/api/users/me', {
                headers: {
                    'Content-Type': 'application/json',
                    // Include any other headers needed, such as CSRF token
                },
                withCredentials: true, // Ensure credentials are sent with the request
            });
            console.log("working2",res);
            console.log(res);
            setData(res.data.data._id);
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-white">Profile</h1>
            <hr />
            <p className="text-white">Profile page</p>
            <h2 className="p-3 rounded bg-green-500">{data==='nothing'?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button 
             onClick={logout}
             className="bg-purple-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            <button 
             onClick={getUserDetails}
             className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get User Details</button>

        </div>
    )
}