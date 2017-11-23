import React, { Component } from 'react';
import Login from './components/login'
import Register from './components/register'
import NewProject from './components/newProject'
import Dashboard from './components/dashboard'
import Navbar from "./components/navbar";
import Perfil from "./components/perfil";
import PL from "./components/projectList";
import Search from "./components/search";
import VerProyecto from "./components/verproyecto";
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div >

          <Navbar history = {this.props.history} />
          <Route exact path='/' component={PL} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Register} />
          <Route path="/newProject" component={NewProject} />
          <Route path="/perfil" component={Perfil} />
          <Route path="/verproyecto" component={VerProyecto} />
          <Route path="/search" component={Search} />
        </div>
      </Router>
    );
  }
}

export default App;
