
import { json } from "stream/consumers";
import { db } from "../../src/db/db";
import { Request,Response } from 'express';
import { eq } from "drizzle-orm";
import { questions, usertable } from "../../src/db/schema/userschema";

export const createquestion =async(req:Request,res:Response)=>{
    const {question,userId} = req.body;
    try{
        const result = await db.insert(questions).values({
            user_id:userId,
            questions:question
    
        }) 
        if(result[0].affectedRows==1){
            return res.status(200).json({message:"question created sucessfully"})
        }
    }
    catch(error){
        console.log(error);
        return res.status(404).json({message:"failed to create question"})
    }
   


}

export const getsinglequestion =async(req:Request,res:Response)=>{
    const questionid=req.params.id;
    console.log(questionid);;
    const questionidint=parseInt(questionid)
    try{
        const getquestion =  await db.select().from(questions).where(eq(questions.question_id,questionidint));
        if(getquestion.length>0){
            return res.status(200).json({
                data:getquestion[0]
            })
        }
        else{
            return res.status(404).json({
                message:"question not found"
            })
        }
      
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ message: "Failed to retrieve question" });
    }
}

export const updateQuestion= async (req:Request,res:Response)=>{
    const qid = parseInt(req.params.id)
    const {question} =req.body
    try{
        const updateq = await db.update(questions)
        .set({ questions:question })
        .where(eq(questions.question_id, qid));
    if(updateq[0].affectedRows>0){
        return res.status(200).json({
            message:"queston updated sucessfully"
        })
    }
       

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"failed to update question"
        })
    }
  

}

export const dashboard=async(req:Request,res:Response)=>{

    try{
        const result = await db.select({
            username:usertable.name,
            userid:usertable.id,
            question:questions.questions,
            qid:questions.question_id
        }).from(usertable).innerJoin(questions,eq(usertable.id,questions.user_id))

        if(result.length>0){
            return res.status(200).json({messages:result})
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"error happended fetching dashboard"})
    };
    


}