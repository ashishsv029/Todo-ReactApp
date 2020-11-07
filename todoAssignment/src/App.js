import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container } from "reactstrap"
import CurrentTodos from "./components/CurrentTodos"
import DeletedTodos from "./components/DeletedTodos"
import Subtodos from "./components/Subtodos";
import {HashRouter} from "react-router-dom";
const App=()=>{
    return (
    <Container fluid style={{minHeight:"100vh",backgroundColor:"grey"}}>
        <div style={{padding:"50px",textAlign:"center"}}>
                <h1 style={{color:"white"}}> Todo App</h1>
                <h6 style={{color:"lightBlue"}}>Developed by Nag Ashish SV</h6>
        </div>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={CurrentTodos} />
            <Route exact path="/deletedtodos" component={DeletedTodos} />
            <Route exact path="/todo/:id" component={Subtodos} />
          </Switch>
        </HashRouter> 
    </Container>
        

    )
}

export default App