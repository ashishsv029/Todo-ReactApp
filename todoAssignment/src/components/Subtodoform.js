import React, { useState } from "react"
import { FaAlignJustify, FaPlus } from "react-icons/fa"
import { useHistory } from "react-router-dom"
import {FormGroup,Input,InputGroup,InputGroupAddon,Button,Form,Container} from "reactstrap"
import {v4} from "uuid"
const SubtodoForm=({todo,setTodos,todos})=>{ 
    const history=useHistory()
    const [todoString,setTodoString]=useState("")
    const handleSubmit=e=>{
        e.preventDefault()
        if(todoString===""){
            return alert("please enter the sub todo")}
        const stodo={
            todoString,  //todoString:todoString
            id:v4()
        }
        
        todos.find(el=>el.id===todo.id).subtodos.push(stodo)
        setTodoString("");
        //updating subtodos in local storage
        const localTodos=JSON.parse(localStorage.getItem("todos") )
        localTodos.map(el=>{
            if(el.id===todo.id)
            {
                el.subtodos.push(stodo)
            }
        })
        localStorage.setItem("todos",JSON.stringify(localTodos))

       
        history.push("/todo/"+todo.id)
    }


    return(
        
        <Form onSubmit={handleSubmit} style={{width:"80%",margin:"auto"}}>
            <FormGroup >
                <InputGroup>
                
                    <Input type="text" name="todo" id="todo" placeholder="Enter a sub todo" value={todoString} onChange={e=>setTodoString(e.target.value)} />
                    <InputGroupAddon addonType="prepend">
                        <Button color="success" ><span className="float-left" style={{color:"white"}}  ><FaPlus /></span></Button>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
        </Form>
        
    )
}



export default SubtodoForm