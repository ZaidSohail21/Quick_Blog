// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import {useNavigate} from "react-router-dom"
// import toast from "react-hot-toast";

// axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

// const AppContext=createContext();

// export const AppProvider=({children})=>{
//     const navigate=useNavigate();

//     const [token,setToken]=useState(null)
//     const [blogs,setBlogs]=useState([])
//     const [input,setInput]=useState("")
//     // data.message
//     const fetchBlog=async()=>{
//         console.log("fetchBlog function called"); 
//         try {
//             const {data}=await axios.get('/api/blog/all');
//             data.success ? setBlogs(data.blogs):toast.error(data.message)
//             if(data.success){
//                 console.log('data fetch sucessfullu')
//             }
//             else{
//                 console.log("data not fetch successfully")
//             }

//         } catch (error) {
//             toast.error(error.message)
//         }
//     }

//     useEffect(()=>{
//         fetchBlog();
//         const token=localStorage.getItem('token')
//         if(token){
//             setToken(token)
//             axios.defaults.headers.common['Authorization']=`${token}`;
//         }
//     },[])

//     const value={
//         axios,token,setToken,blogs,setBlogs,input,setInput
//     }
//     return(
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     )
// }

// export function useAppContext(){
//     return useContext(AppContext)
// }

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const AppContext = createContext();

export function AppProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlog=async()=> {
    console.log("📡 fetchBlog function called");
    try {
      const { data } = await axios.get("/api/blog/all");
      console.log(data.success);
      
      if (data.success) {
        setBlogs(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBlog();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `${storedToken}`;
    }
  }, []);

  const value = {
    axios,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
  };

  return <AppContext.Provider value={value}>
    {children}
    </AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
