import './App.css';
import { useState, useEffect } from "react";

function App() {

  const API_BASE = "http://localhost:3500";
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    getTask();
    console.log(taskList);
  }, [])

  const getTask = async () => {
    await fetch(API_BASE + "/getTasks")
    .then(res => res.json())
    .then(data => setTaskList(data))
    .catch(err => console.error("Error: ", err));
  }

  const deleteTask = async (id) => {
    const result = await fetch(API_BASE + "/deleteTasks/" + id, {
      method: "DELETE"
    });
    
    getTask();
  }

  const addTask = async () => {
    const result = await fetch (API_BASE + "/createTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task: newTask
      })
    })

    getTask();

  }

  return (
    <div className="App">
    <h1>Your To-do List</h1>

    <div className='add'>
      <input 
      type="text"
      className="add-task" 
      onChange = {event => setNewTask(event.target.value)}
      value={newTask} />
      <button className='add-task-button' onClick={addTask}>Add Task</button>
    </div> 

   <br></br>
    {taskList.map(todo => (
      <div className='todos'>
        <div className='text'>{todo.task}</div>
        <button className='delete' onClick={() => deleteTask(todo._id)}>x</button>
      </div>
    ))}
 

    </div>
  );
}

export default App;
