import React, { useEffect, useState } from 'react'
import basepath from './url/Url';
import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from './Auth';
interface answerTypes{
    username:string
    userid:number
    fetchedanswer:string
}
function Answer() {
    const auth = useAuth();
    const uid=auth?.currentuser?.userid
    const [answers,setAnswers]=useState<answerTypes[]>([]);
    const [qanswer,setQanswer]=useState<string>("")
    const [addresponse,setaddresponse]=useState<string>("")
    const qid=parseInt(useLocation().pathname.split("/")[2]);
    const data={
        answertext:qanswer,
        userid:uid,
        questionid:qid

    }
    const handlesubmit =async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
          const response = await basepath.post("/answers/createanswer",data)
          setaddresponse(response.data.message)
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
                setaddresponse(errorObj.response.data.message);
            } else if (errorObj.message) {
                setaddresponse(errorObj.message);
            } else {
                setaddresponse('An unknown error occurred.');
            }
        }

    }
    console.log(qanswer);
        console.log("answers");
        console.log(qid);
    useEffect(()=>{
        const fetchAnswer= async()=>{
            try{
                const response = await basepath.get(`/answers/getanswerforquestion/${qid}`);
                console.log(response);

                setAnswers(response.data.data);
            }
            catch(err){
                console.log(err);
            }

        }
        fetchAnswer()
    },[qid])
    console.log(answers);

  return (
    <>
    <section className=' flex flex-col gap-4 items-center justify-center w-screen'>
        <div>
            <h1 className=' text-2xl'>answer</h1>
        </div>
        {answers.map((a)=>(
             <div className=' flex flex-row content-evenly w-3/4 justify-between'>
            
             <div>
                 {a.username}
             </div>
              {a.fetchedanswer}
             <div>
     
             </div>
             </div>
        ))}
   
       <div className=' w-full flex items-center justify-center'>
       <form className='w-full flex flex-col items-center justify-center gap-3' onSubmit={handlesubmit}>
            <input type="text" placeholder='answer question' className='border-2 border-black rounded-2xl w-3/4 h-[50px]' onChange={(e)=>setQanswer(e.target.value)} />
            <button className='w-24 bg-red-50 p-4 rounded-lg' type='submit'>send</button>
            <p>{addresponse}</p>
          </form>
       </div>
    </section>
    
    
    </>
  )
}

export default Answer