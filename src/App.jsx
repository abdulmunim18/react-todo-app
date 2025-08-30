import { useState, useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import Navbar from './components/Navbar.jsx'
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinish, setshowfinish] = useState(true)



useEffect(() => {
  let todoString=localStorage.getItem("todos")
  if(todoString){
  let Todos=JSON.parse(localStorage.getItem("todos"))
  settodos(Todos)
  }
}, [])

  const savetls=()=>{
    localStorage.setItem("todos", JSON.stringify(todos))  
  }
  const handledelete =(e, id)=>{
 let newTodos=todos.filter(item=>{
  return item.id!==id
})
 settodos(newTodos); 
 savetls();  
  }
  const handleedit =(e, id)=>{
    let t= todos.filter(i=>i.id===id)
settodo(t[0].todo)
 let newTodos=todos.filter(item=>{
  return item.id!==id
})
 settodos(newTodos);
 savetls();  
  }
  const handlechange =(e)=>{
settodo(e.target.value)
  }
  const handleadd =()=>{
settodos([...todos, {id:uuidv4(), todo, isCompleted: false}])
settodo("")
savetls();
  }
  const handlecheck=(e) => {
 let id=e.target.name;
 let index=todos.findIndex(item=>{
  return item.id===id});
 let newTodos=[...todos];
 newTodos[index].isCompleted=!newTodos[index].isCompleted;
 settodos(newTodos);   
  savetls();
}

const togglefinish=(e) => {

  setshowfinish(!showfinish);
 }


  return (
    <>
      <Navbar />

      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[40%]">
      <h1 className='font-bold text-center text-xl'>iTask - Manage your tasks at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-3">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handlechange} value={todo} type="text" className='w-full rounded-sm' />
          <button onClick={handleadd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6 w-1/3'>Save</button>
          </div>
        </div>
        <input onChange={togglefinish} type="checkbox" checked={showfinish}  /><label className='mx-2' htmlFor="show">Show Finished</label>
        <div className="h-[1px] bg-black opacity-15"></div>
          <h2 className='text-xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className='text-center font-bold my-5'>No todos available</div>}
          {todos.map(item=>{

           return (showfinish || !item.isCompleted) && <div key={item.id} className="todo flex justify-between bg-white my-3 p-3 rounded-md">
            <div className="flex gap-5">
            <div className="checkbox">
              <input name={item.id} onChange={handlecheck} type="checkbox" checked={item.isCompleted} />
            </div>
            <div className={item.isCompleted?"line-through" :""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleedit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 '><FaEdit /></button>
              <button onClick={(e)=>{handledelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 '><MdDelete />
                    </button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
