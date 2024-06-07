import axios from "axios"
 const basepath = axios.create({
    baseURL:"http://localhost:4000/api"
 })

export default basepath