
import { useState,useContext,createContext } from "react";
const Searchcontext = createContext()

const SearchProvider = ({children})=>{
    const [Auth,setAuth] = useState({
        keyword:"",
        result:[]
    })
   
    return(
        <Searchcontext.Provider value={[Auth,setAuth]}>
            {children}
        </Searchcontext.Provider>
    )
}

const useSearch = ()=> useContext(Searchcontext)

export{useSearch,SearchProvider}