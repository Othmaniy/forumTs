import express from "express";
import userrouter from "./api/router/user.router"
import questionRouter from "./api/router/question.router"
import answerRouter from "./api/router/anwer.router"
const app = express();
import cors from "cors"


app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors(
    {origin:"http://localhost:5173"}
));
app.use("/api/users",userrouter)
app.use("/api/questions",questionRouter)
app.use("/api/answers",answerRouter)
app.listen(4000,()=>{
    console.log("listening to port yuio jjkk ithink ");
})
