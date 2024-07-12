import React, { useEffect, useState } from "react";
import axios  from "axios";
import "./App.css";


function TodoList() {
  const [input, setInput] = useState("");// to get the value from the user 
  const [tasks, setTasks] = useState([]);// to store the value from api and also update it 

  // Function to update input state when input changes
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  // USEEFFECT IS USEDN WHENEVER ANY THINK UPADATE OR DELETE RENDER THE PAGE AND CALL THE GET API TO GET THE CURRENT DATA
useEffect(()=>{
    GetTask();

},[]);
 // to get the data from the database like what user has already enter his task 
const GetTask=async()=>{
    try{
        const TaskList=await axios.get("http://localhost:3100");
            // console.log(" fetch data is :",TaskList);
            // when we get the data from the database we store the data into tasks;
            setTasks(TaskList.data);
           
            }
              
            
        catch(err){
            console.log(err)
        }
    }

  // Function to handle form submission
  const handleAddTask = (e) => {
    e.preventDefault(); // Prevents default form submission behavior
// IF (INPUT) IS USED IF USER HAS NOT ENTER ANY VALUE THEN SHOW A ALERT MESS IF HAS ENTER THA VALUE FOLLW THE FORWARD PROCESS
    if (input){
        const TaskPrint=async()=>{
            const Resp=await axios.post("http://localhost:3100/list",{
                input:input
            }) .then(Resp=>{
                // console.log( " SEND DATA ",Resp);
                setTasks([...tasks, Resp.data]); // Update tasks state with new task, // Add new task to tasks array
                setInput(""); // Clear input field after adding task
            }).catch(err=>{
                console.log(err)
            })
        }
        TaskPrint();
    }else{
        alert("Enter the task ")
    }
   

    
  };

  async function DelList(id) {
    try {
      const response = await axios.delete(`http://localhost:3100/list-del/${id}`);
    //   console.log("Deleted data :", response.data);
  
      // Update tasks state by filtering out the deleted task,Filter out the deleted task from tasks state
      setTasks(tasks.filter(task => task._id !== id));
  
      // Clear input field by resetting input state
      setInput("");
  
    } catch (err) {
      console.error("Error deleting task:", err);
      // Handle error, e.g., display an error message to the user
      // Example: setError('Failed to delete task');
    }
  }
  
  return (
    <>
      <div className="todo-container">
        <h1>Todo List</h1>
        <form onSubmit={handleAddTask} className="add-task">
          <input type="text" value={input} onChange={handleInputChange} id="task-input" placeholder="Enter task..."/>
          <button type="submit">Add Task</button>
        </form>
        <ul id="task-list">
          {
            // here turnery operater is used bcz if their is no task is adden show a mess to the user if their are task then show task list to user 
          tasks.length >0  ?(
            tasks.map((task, index) => (
                <li key={task._id}>
                  {task.input}
                  <button onClick={()=>{DelList(task._id)}} className="delete-button"> Delete</button>
                </li>
              )
          )
           )
          
          :
          <h1> Task is not Added</h1>
          
          }
        </ul>
      </div>
    </>
  );
}

export default TodoList;
