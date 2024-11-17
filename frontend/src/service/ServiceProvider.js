import { createContext, useContext, useState } from "react";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase";
const ContextProvider = createContext()

export const Context = ({ children }) => {

    const  PORT  =process.env.REACT_APP_API_URL
    // const  PORT  = "http://localhost:5000"
    console.log(PORT)
    
   
  
   
   
    function logout(){
        signOut(auth).then(() => {
          
        }).catch((error) => {
           
        });
    }

  
    return (
        <ContextProvider.Provider value={{
          
             logout,PORT
         
            

        }}>
            {children}

        </ContextProvider.Provider>

    )

}
export const useService = () => useContext(ContextProvider);
export default Context