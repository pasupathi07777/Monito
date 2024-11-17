import { createContext, useContext, useState } from "react";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase";
const ContextProvider = createContext()

export const Context = ({ children }) => {
    
   
  
   
   
    function logout(){
        signOut(auth).then(() => {
          
        }).catch((error) => {
           
        });
    }

  
    return (
        <ContextProvider.Provider value={{
          
             logout
         
            

        }}>
            {children}

        </ContextProvider.Provider>

    )

}
export const useService = () => useContext(ContextProvider);
export default Context