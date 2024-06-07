import React, { useEffect, useState } from 'react';
import basepath from './url/Url';
import { Link } from 'react-router-dom';
import { useAuth } from './Auth';

interface Question {
  username: string;
  question: string;
  userid: number;
  qid:number;
}
type questiontypes={
    

}
function Questions() {
    const Auth=useAuth();
    const userId=Auth?.currentuser?.userid
  const [questions, setQuestions] = useState<Question[]>([]);
  const [question,setQuestion]=useState<string>("");
  const [questioresponse,setQuestionresponse]=useState<string>("")

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await basepath.get("/questions/dashboard");
      setQuestions(response.data.messages);
    } catch (error) {
      console.error("Error fetching questions:", error);
      // Optionally handle the error state, e.g., setQuestions([])
    }
  };
  const data={
    question:question,
    userId
  }
const handlesubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
        const response = await basepath.post("/questions/createquestion",data)
        setQuestionresponse(response.data.message)
    }
    catch(err){
        console.log(err);
    }
}
  return (
    <>
      <section className='flex flex-col w-screen justify-center'>
        {questions.map((q) => (
            <Link to={`/questions/${q.qid}`}>
               <div className='flex flex-row bg-slate-100 w-4/5 text-2xl p-4 mx-auto m-2' key={q.qid}>
            <div className='w-1/4'>
              {q.username}:
            </div>
           
            <div>
              {q.question}
            </div>
          </div>
            </Link>
       
        ))}
        <div className='w-full flex items-center justify-center'>
          <form className='w-full flex items-center justify-center gap-3 flex-col' onSubmit={handlesubmit}>
            <input type="text" placeholder='hello' className='border-2 border-black rounded-2xl w-3/4 h-[50px]' onChange={(e)=>setQuestion(e.target.value)} />
            <button className='w-24 bg-red-50 p-4 rounded-lg' type='submit'>send</button>
            <p>{questioresponse}</p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Questions;
