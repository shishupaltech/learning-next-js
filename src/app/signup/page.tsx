'use client';
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from 'next/navigation';
import  axios  from "axios";
import toast from "react-hot-toast";


export default function SignupPage(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:"",
    })
    const [loading,setLoading] = React.useState(true);
    const [buttonDisabled,setButtonDisabled]=React.useState(false);
    const onSignup = async ()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log("Signup success",response.data);
            router.push("/login");
        } catch (error:any) {
            console.log("Signup failed",error.message);
           toast.error(error.message); 
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.email.length >0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-white text-2xl">{loading?"Signup":"Processing"}</h1>
            <hr />
            <label htmlFor="username" className="text-white">username</label>
            <input 
                className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="username"
                type="text" 
                value={user.username}
                onChange={(e)=>setUser({...user,username:e.target.value})}
                placeholder="username"
                />

            <label htmlFor="email" className="text-white">email</label>
            <input 
                className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="text" 
                value={user.email}
                onChange={(e)=>setUser({...user,email:e.target.value})}
                placeholder="email"
                />
            <label htmlFor="password" className="text-white">password</label>
            <input 
                className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type="password" 
                value={user.password}
                onChange={(e)=>setUser({...user,password:e.target.value})}
                placeholder="password"
                />
                <button 
                onClick={onSignup}
                className="p-2 border text-white border-gray-300 rounded-lg focus:outline-none focus:border-gray-600">
                    {buttonDisabled?"No signup":"Signup"}</button>
                <Link href="/login" className="text-white">Visit login page</Link>
        </div>
    )
}