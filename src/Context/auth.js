import axios from "axios";
import { useState,useContext,createContext, useEffect } from "react";
const Authcontext = createContext()

const AuthProvider = ({children})=>{
    const [Auth,setAuth] = useState({
        user:null,
        token :''
    })
    axios.defaults.headers.common["Authorization"] = Auth?.token
    useEffect(()=>{
        const data = localStorage.getItem('auth')
        if(data){
            const parsedata = JSON.parse(data)
            setAuth({
                ...Auth,
                user:parsedata.user,
                token:parsedata.token
            })
        }
    },[])
    return(
        <Authcontext.Provider value={[Auth,setAuth]}>
            {children}
        </Authcontext.Provider>
    )
}

const useAuth = ()=> useContext(Authcontext)

export{useAuth,AuthProvider}