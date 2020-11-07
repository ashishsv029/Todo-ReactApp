import React, { useEffect, useState } from "react"
import {ListGroup,ListGroupItem} from "reactstrap"
import  {FaAlignJustify, FaPlus, FaTrash} from "react-icons/fa"
import TodoForm from "./TodoForm"
import Subtodoform from "./Subtodoform"
import { useHistory } from "react-router-dom"

const Todos=({todos,markComplete,setTodos})=>{
    
    const history=useHistory()
    const addSubTodo=()=>{
        console.log("form for adding subtodo")
    }
   
    return(
        <ListGroup className="mt-3 mb-2 items">
            {todos.length!==0?(todos.map(todo=>(
                <>
                <ListGroupItem key={todo.id} onClick={addSubTodo}>
                <span className="float-left" style={{color:"blue",fontSize:"1rem"}} onClick={()=>{history.push("/todo/"+todo.id)}} >< FaAlignJustify/></span>
                    <div  style={{display:"inline",marginLeft:"1rem",width:"100%"}}>
                    <span style={{fontSize:"1rem"}}>{todo.todoString}</span>
                    </div>
                    
                    <span className="float-right" style={{color:"red",fontSize:"1rem"}}  onClick={()=>markComplete(todo.id)}><FaTrash /></span>
                </ListGroupItem>
                
                <Subtodoform todo={todo} setTodos={setTodos} todos={todos}/>
                
                </>
            ))):(<h6 style={{textAlign:"center"}}>No Todos Yet...</h6>)}
        </ListGroup>
    )
}

export default Todos