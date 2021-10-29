import React, { useState, useEffect } from "react";
import './App.css';
//Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  

  //functions
  const filterHandler =  () => {
    switch (status){
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }

  };

  useEffect(() => {
    getLocalTodos();
  },[]);

  //useEffect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  },[todos,status]);

  

  //save to Local
  const saveLocalTodos  = () =>{
    
      localStorage.setItem("todos",JSON.stringify(todos));
    
  };

  const getLocalTodos  = () =>{
    if(localStorage.getItem("todos")===null){
      localStorage.setItem("todos",JSON.stringify([]));
    }
    else{
     let todolocal =JSON.parse(localStorage.getItem("todos"));
     setTodos(todolocal);
    }
  };

  return (
    <div className="App">
      <header>
      <h1>Prathamesh's Todo List</h1>
    </header>
    <Form  
      setStatus={setStatus} 
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText} 
      inputText={inputText}  
      />
    <TodoList 
      todos = {todos} 
      setTodos={setTodos} 
      filteredTodos={filteredTodos}/>
      </div>
  );
}

export default App;
