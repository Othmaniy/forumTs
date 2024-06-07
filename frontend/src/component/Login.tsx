import React, { useState } from 'react'
import basepath from './url/Url';

function Login() {
    const [name,setName]=useState<string>("");

const [password,setPassword]=useState<string>("");
const [responsemessage,setResponsemessage]=useState<string>("")

const formdata={
    name,

    password
}

    const handlesubmit=async(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        console.log("form submitted");
        try{
            const response = await basepath.post("/users/login",formdata)
            console.log("data sent");
            console.log(response);
            setResponsemessage(response.data.message)
            if(response.status==200){
                if(response.data.token){
                    localStorage.setItem("user",JSON.stringify(response.data.token))
                }
            }
            

        }
        catch(err){
            console.log(err);
            const errorObj = err as {
                response?: {
                    data?: {
                        message?: string
                    }
                },
                message?: string
            };
        
            if (errorObj.response && errorObj.response.data && errorObj.response.data.message) {
                setResponsemessage(errorObj.response.data.message);
            } else if (errorObj.message) {
                setResponsemessage(errorObj.message);
            } else {
                setResponsemessage('An unknown error occurred.');
            }
        }
    }
  return (
    <>
    <section className=' flex flex-col md:flex-row justify-center items-center mx-auto  w-[800px] h-[600px] gap-6'>
        <div className='flex flex-1'>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus eum suscipit a exercitationem alias corrupti asperiores animi libero quaerat ducimus.
            </p>
        </div>
        <div className=' flex flex-1 flex-col'>
            <h1 className=' text-center mb-4 text-2xl'>signup <a href="/createaccount" className=' text-lime-300'>login</a> </h1>
            <form onSubmit={handlesubmit} className=' flex flex-col gap-5'>
                <input className=' border rounded-2xl p-3 ' type="text" placeholder='name p-3' name='name' value={name} onChange={(e)=>{setName(e.target.value)}} />
                <input className='border p-3 rounded-2xl' type="password" placeholder='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button type='submit'  className=' p-3 rounded-2xl bg-slate-600 hover:bg-slate-300 hover:text-white'>login</button>
                <p>{responsemessage}</p>
            </form>

        </div>
    </section>




    </>
  )
}

export default Login