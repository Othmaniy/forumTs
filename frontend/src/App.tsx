
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Form from "./component/Form"
import Header from "./component/Header"
import Login from "./component/Login";
import Questions from "./component/Questions";
import Answer from "./component/Answer";

function App() {
 
  

  return (

    <Router>
    <>
    <Header />
    <Routes>
     <Route path="/" element ={<Form />}/>
     <Route path="/login" element ={<Login />}/>
     <Route path="/questions" element ={<Questions/>}/>
     <Route path="/questions/:id" element ={<Answer/>}/>
    </Routes>
    {/* <Route path="/login" element={<Login/>} */}

    </>
    </Router>
  )
}

export default App
