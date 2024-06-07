import React, { useState } from 'react'
import basepath from "./url/Url.tsx"
import { useAuth } from './Auth.tsx';
function Form() {
    const xx =useAuth();
    console.log(xx);
const [name,setName]=useState<string>("");
const [lname,setLName]=useState<string>("");
const [password,setPassword]=useState<string>("");
const [responsemessage,setResponsemessage]=useState<string>("")

const formdata={
    name,
    lname,
    password
}

    const handlesubmit=async(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        console.log("form submitted");
        try{
            const response = await basepath.post("/users/createaccount",formdata)
            console.log("data sent");
            console.log(response);
            setResponsemessage(response.data.message)

        }
        catch(err){
            console.log(err);
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
            <h1 className=' text-center mb-4 text-2xl'>create account <a href="/login" className=' text-lime-300'>login</a> </h1>
            <form onSubmit={handlesubmit} className=' flex flex-col gap-5'>
                <input className=' border rounded-2xl p-3 ' type="text" placeholder='name p-3' name='name' value={name} onChange={(e)=>{setName(e.target.value)}} />
                <input className='border p-3 rounded-2xl' type="text" placeholder='lastname' name='lname' value={lname} onChange={(e)=>{setLName(e.target.value)}} />
                <input className='border p-3 rounded-2xl' type="password" placeholder='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button type='submit'  className=' p-3 rounded-2xl bg-slate-600 hover:bg-slate-300 hover:text-white'>register</button>
                <p>{responsemessage}</p>
            </form>

        </div>
    </section>

    </>
  )
}

export default Form