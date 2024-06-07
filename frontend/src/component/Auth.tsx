import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import getuser from "./Decode";
interface User{
    token:string
    userid:string
    Username:string
    lastname:string
    role:string

}
// Define the shape of the context value
interface AuthContextType {
  islogged: boolean;
  role: string | null;
  setIslogged: React.Dispatch<React.SetStateAction<boolean>>;
  currentuser: User|null;
}

const Authcontext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  
 return useContext(Authcontext)
};

interface AuthcontextProviderProps {
  children: ReactNode;
}

const AuthcontextProvider = ({ children }: AuthcontextProviderProps) => {
    console.log("inside provider");
  const [islogged, setIslogged] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [currentuser, setCurrentuser] = useState<User|null>(null);

  const value = { islogged, role, setIslogged, currentuser };

  useEffect(() => {
    const fetchUser = async () => {
        console.log("inside fetch user");
      try {
        const response = await getuser();
        console.log("Logged user:", response);
        if (response && response.token) {
            setIslogged(true);
            setRole(response.role);
            setCurrentuser(response);
          }
          else{
            console.log("chala ");
          }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Authcontext.Provider value={value}>
      {children}
    </Authcontext.Provider>
  );
};

export { Authcontext, useAuth, AuthcontextProvider };
