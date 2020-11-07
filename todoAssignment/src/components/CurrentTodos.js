import React,{useReducer, useState,useEffect} from "react"
import {Button, Col, Container, Row} from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { useHistory } from "react-router-dom";
import Todos from "./Todos"
import TodoForm from "./TodoForm"

const CurrentTodos=()=>{

    const history = useHistory();
    const [todos,setTodos]=useState([])
    
    useEffect(() => {
        
        //storing the existing todos in localtodos and again updating the state..this happens immediately before the component loads
        const localTodos=localStorage.getItem("todos") 
    
        if(localTodos){   
            setTodos(JSON.parse(localTodos))
        }

        const localexpiredTodos=localStorage.getItem("expired_todos") 
        
        if(localexpiredTodos){   
            setExpired_todos(JSON.parse(localexpiredTodos))
        }
    }, [])


    const addTodos=async todo=>{
        setTodos([...todos,todo])
    }


    //when there is atleast 1 todo
    useEffect(() => {
        localStorage.setItem("todos",JSON.stringify(todos))
    }, [todos]) 

    
    const [expired_todos,setExpired_todos]= useState([])

    const addExpiredtodos=async todo=>{
        todo.date=new Date()
        todo.time=new Date().toLocaleTimeString();
        setExpired_todos([...expired_todos,todo])
    }
    useEffect(() => {
        localStorage.setItem("expired_todos",JSON.stringify(expired_todos))
    }, [expired_todos])
    
    
    
    const markComplete=id=>{
        
        console.log(new Date())
        todos.map(todo=>{
            if(id===todo.id){
                addExpiredtodos(todo);
            }
        })
        
        setTodos(todos.filter(todo=>todo.id!==id))
    }


    return (
        <Container fluid>
            <h4 style={{textAlign:"center",padding:"10px",marginBottom:"2rem"}}> Enter your todos below</h4>
            <div style={{width:"85%",margin:"auto"}}>
                <TodoForm addTodos={addTodos} />
                <br/>    
                <Button style={{backgroundColor:"red"}} onClick={()=>{history.push("/deletedTodos")}}>See Expired Todos</Button>
            </div>
            <div style={{padding:"20px",textAlign:"center"}}>
                <h3>Current Todos</h3>
            </div>
            <div style={{width:"85%",margin:"auto"}}>
                <Todos todos={todos} markComplete={markComplete} setTodos={setTodos}/>   
            </div>
        </Container>
    )
}

export default CurrentTodos