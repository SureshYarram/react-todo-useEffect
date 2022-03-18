import { useEffect, useState } from "react";

const axios = require('axios');
export const Todo = ()=>{

    const [text,setText] = useState("");
    const [todos,setTodos]=useState([{
      
    }]);
    const [page,setPage]= useState(1)
   const [limit,setLimit] = useState(4)
  useEffect(()=>{
    GetData();
  },[page]);

  
    const GetData = ()=>{
  axios.get(`http://localhost:4040/Todos?_limit=${limit}&_page=${page}`).then((res)=>{
                  setTodos(res.data);
  })
    }
    function Ascending(){
      let order = todos.sort((a,b)=>{
        if(a.title<b.title) return -1 
        return 0
      })
      console.log(order);
      setTodos([...order])
    }
    return (
        <div>
            
            <div className="inputdiv">
            <h3>ADD TODO</h3>
            <input type="text" placeholder="Enter Todo" onChange ={(e)=>setText(e.target.value)} />

                <button onClick={()=>{
              fetch("http://localhost:4040/Todos",{
        method:"POST",
        body:JSON.stringify({title:text, status:false}),
        headers:{
            "content-type":"application/json"
                                                   }
                }).then(()=>{
                          GetData();
                   })
}}>Save Todo</button>
            </div>

            <div className="displaydiv">
            {todos.map((t)=>(
                <div key={t.id}>{t.title} </div> 
            ))} 
            </div>


            <div className="buttondiv">
            <button onClick={()=>{
                  setPage(page-1)
            }}>Prev</button>
            <button onClick={()=>{
                setPage(page+1)
            }}>Next</button>
            </div>


           <button onClick={()=>{Ascending()}}>Asending</button>
        </div>
  
               
            
    )
}