import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { Button, Container, ListGroup, ListGroupItem } from "reactstrap"

const DeletedTodos=()=>{
    const history = useHistory();
    const [deletedTodos,setDeletedTodos]=useState([])
    useEffect(() => {
        const localdeletes=localStorage.getItem("expired_todos")
        setDeletedTodos(JSON.parse(localdeletes))
    }, [])
    return(
        <Container fluid>
            <h4 style={{textAlign:"center",padding:"10px",marginBottom:"2rem"}}> Deleted Todos</h4>
            
            <div style={{width:"85%",margin:"auto"}}>
                <ListGroup className="mt-5 mb-2 items">
                    {deletedTodos?(deletedTodos.map(todo=>(
                        <ListGroupItem key={todo.id}>
                            {todo.todoString}
                    <span style={{float:"right"}}>{todo.time}<br/> {todo.date}</span>
                        </ListGroupItem>
                    ))):"No Items Available"}
                </ListGroup>
                <br/>
                <Button style={{backgroundColor:"green",color:"white"}} onClick={()=>{history.push("/")}}>See Current Todos</Button>
                <Button style={{backgroundColor:"blue",color:"white",float:"right"}} onClick={()=>{localStorage.removeItem("expired_todos");setDeletedTodos([])}}>Remove History</Button>

            </div>
            
        </Container>
    )
}

export default DeletedTodos