import React, { useEffect, useReducer, useState } from "react"
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom"
import { Button, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, ListGroup, ListGroupItem } from "reactstrap";
import { v4 } from "uuid";
import SubtodoForm from "./Subtodoform";
const Subtodos=()=>{

    let {id}=useParams()
    const localsubtodos=JSON.parse(localStorage.getItem("todos"));
    const [currentTodo,setCurrentTodo]=useState({})
    const [subtodoitem,setSubtodoitem]=useState([])
    //const onlysubtodos={};
    const history=useHistory()
    useEffect(() => {
        localsubtodos.map(el=>{
            if(el.id===id)
            {
                setCurrentTodo(el)
                el.subtodos.map(eee=>{subtodoitem.push(eee)})
            }
        })
        
    }, [id])

    const [editbar,seteditbar]=useState("none")
    const [todoString,setTodoString]=useState("")
    const [selectedtodoid,setselectedtodoid]=useState("")
    const editsubtodo=(id)=>{
        seteditbar("")
        subtodoitem.map(sti=>{
            if(sti.id===id)
            {
                setTodoString(sti.todoString)
            }
        })
        setselectedtodoid(id)
    }

    const handleSubmit=e=>{
        e.preventDefault()
        if(todoString===""){
            return alert("please enter anyvalue to update todo")}
        subtodoitem.map(st=>{
            if(st.id===selectedtodoid)
                {
                    st.todoString= todoString
                }
            })
        
        
        localsubtodos.map( obj=>{
            if(obj.id===id)
            {
                
                obj.subtodos.map(st=>{
                   
                   if(st.id===selectedtodoid)
                   {
                    console.log("st.todostring=",st.todoString,"todoString=",todoString)
                    st.todoString=todoString
                   }
               })
            }
        })
        //console.log("UPDATED TODOS=",localsubtodos)
        localStorage.setItem("todos",JSON.stringify(localsubtodos))
        alert("updated successfully")
        seteditbar("none")

    }
    const [newtodoString,setNewTodoString]=useState("")
    const [alltodos,setalltodos]=useState([])
    //-------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        const localalltodos=JSON.parse(localStorage.getItem("todos"))
        setalltodos(...alltodos,localalltodos)
    }, [])
    const [a,seta]=useState(0)
    
    const handleadd=(e)=>{
        e.preventDefault();
        console.log("alltodos before=",alltodos)
        if(newtodoString===""){
            return alert("please enter a todo")
        }
            const stodo={
                todoString:newtodoString, 
                id:v4()
            }
            
        alltodos.map(el=>{
                if(el.id===id)
                {
                    console.log("elleel=",el)
                    el.subtodos.push(stodo)
                    
                }
            })
        //subtodoitem.push(stodo)
        setNewTodoString("")
        setSubtodoitem([...subtodoitem,stodo])
        setalltodos(alltodos)
        localStorage.setItem("todos",JSON.stringify(alltodos))
        
        
    }
    //------------------------------------------------------------------------------------------------------------------


    useEffect(() => {
        console.log("subtodoitem changed")
    }, [subtodoitem])

    const [displayitem,setdisplayitem]=useState("")



    const deletesubtodo=(idr)=>{
        console.log("idr=",idr)
        console.log("befire=",subtodoitem)
        //subtodoitem.filter(e=>e.id!==idr)
        let temp=[]
        subtodoitem.map( obj=>{
            if(obj.id!==idr)
            {
                temp.push(obj)  
            }
            
        })
        setSubtodoitem(temp)
        console.log("after=",subtodoitem)
        localsubtodos.map( obj=>{
            const temp=[]
            if(obj.id===id)
            {
                obj.subtodos.map(jk=>{
                    if(jk.id!==idr)
                    {
                        temp.push(jk)
                    }
        
                }
                
                )
                obj.subtodos=temp;   
            }
        })
        //console.log("UPDATED TODOS=",localsubtodos)
        //setdisplayitem("none")
        //history.push("/todo/"+id)
        localStorage.setItem("todos",JSON.stringify(localsubtodos))
        
        
        
    }
    return(
        
        <Container fluid>
            <h2 style={{textAlign:"center",padding:"10px",marginBottom:"2rem",color:"black"}}> {currentTodo.todoString} todos :</h2>
            <div style={{width:"85%",margin:"auto"}}>

            <div style={{display:editbar}}>
            <Form onSubmit={handleSubmit} >
            <FormGroup >
                <InputGroup>
                    <Input type="text" name="todo" id="todo" placeholder="Enter a todo" value={todoString} onChange={e=>setTodoString(e.target.value)} />
                    <InputGroupAddon addonType="prepend">
                        <Button color="success">Update</Button>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
            </Form>
            </div>


            <div style={editbar==="none"?{display:""}:{display:"none"}}>
            <Form onSubmit={handleadd} >
            <FormGroup >
                <InputGroup>
                    <Input type="text" name="todo" id="todo" placeholder="Enter a new todo" value={newtodoString} onChange={e=>setNewTodoString(e.target.value)} />
                    <InputGroupAddon addonType="prepend">
                    <Button  color="success" ><span className="float-left" style={{color:"white"}}  ><FaPlus /></span></Button>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
            </Form>
            </div>
            
                <ListGroup className="mt-5 mb-2 items">
                    {subtodoitem?(subtodoitem.map(todo=>(
                        <ListGroupItem key={todo.id} style={{display:displayitem}}>
                            {todo.todoString}
                            <span className="float-right" style={{color:"red"}} onClick={()=>{deletesubtodo(todo.id)}} ><FaTrash /></span>
                            <span className="float-right" style={{color:"blue",marginRight:"1rem"}} onClick={()=>{editsubtodo(todo.id)}} ><FaPencilAlt /></span>
                            
                        </ListGroupItem>
                    ))):"No Items Available"}
                </ListGroup>
                <br/>
                
            </div>
        
        </Container>
                    
    )
}

export default Subtodos