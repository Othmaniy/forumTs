
import { eq } from "drizzle-orm";
import { db } from "../../src/db/db";
import { answer, usertable } from "../../src/db/schema/userschema";
import { Request,Response } from 'express';

export const createAnswer =async(req:Request,res:Response)=>{
    const {answertext,userid,questionid}=req.body;
    try{
     const result = await db.insert(answer).values({
        answer:answertext,
        an_userid:userid,
        question_id:questionid
     })
     console.log(result);
     if(result[0].affectedRows===1){
        return res.status(200).json({
            message:"answer created successfullly"
        })
     }
   
    
    }
    catch(error){
        console.log(error);
        return res.status(500).json(error)
    }
}

export const  getAnswers =async (req:Request,res:Response)=>{
    const qid = parseInt(req.params.qid);
    try{
        const fetchanswer = await db.select({
            username: usertable.name,
            userid: usertable.id,
            fetchedanswer:answer.answer
          }).from(usertable).innerJoin(answer, eq(usertable.id, answer.an_userid)).where(eq(answer.question_id,qid))
       console.log(fetchanswer);
       if(fetchanswer.length>0){
        return res.status(200).json({
           data:fetchanswer
        })
       }
       else{
        return res.status(500).json({
            message:"no answers for question"
        })
       }
       
    }
    catch(error){

    }

}