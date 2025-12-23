"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  },[])

  async function fetchUser(){

     try{

     	setUserLoading(true);

     	const {data} = await axios.get("/api/user");

     	console.log("data ",data);

     	if(data.success){
     		setUser(data.user);
     	}else{
     		console.log("context error", data.message);
     	}

     }catch(err){
     	console.log(" context error" ,err.message);
     }finally{
     	setUserLoading(false);
     }

  }

  return (
    <GlobalContext.Provider value={{ user, userLoading, setUser, fetchUser }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobal = () => useContext(GlobalContext);
