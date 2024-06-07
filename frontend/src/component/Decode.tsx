interface User{
    token:string
    userid:string
    Username:string
    lastname:string
    role:string

}

const getuser = async (): Promise<User | null> => {
    console.log("inside get user");
    const usertoken = localStorage.getItem("user");
    const token = usertoken ? JSON.parse(usertoken) : null;
    console.log("User from localStorage:", token);
  
    if (token) {
      console.log("Token found:", token); // Add this line to check if token exists
      const decodetoken = await decodepayload(token);
      console.log("Decoded token:", decodetoken); // Add this line to check if decoding works
      const user: User = {
        token: token,
        userid: decodetoken.id,
        Username: decodetoken.name,
        lastname: decodetoken.lastname,
        role: decodetoken.role,
      };
      return user;
    } else {
      return null;
    }
  };

//I am going numb my soul is feeling 

//to decode token we use decoder 
const decodepayload =(token:string)=>{
    console.log("inside decode");
    console.log("Token to decode:", token)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g,'+').replace(/_/g,'/');
    const jsonpayload = decodeURIComponent(
        atob(base64)
        .split('')
        .map((c)=>`%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`).join('')
    );
    console.log("Decoded payload:", jsonpayload);
    return JSON.parse(jsonpayload);
}



export default getuser;

