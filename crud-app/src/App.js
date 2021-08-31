import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import {  Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Navbar from "./components/Navbar";
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';

 

const App = () => {
    return (



<>


<Navbar />



<Switch>

<Route exact path="/">
<Home /> 
</Route>



<Route path="/login">
<Login />
</Route>

<Route path="/signup">
<Signup />
</Route>

<Route path="/logout">
 <Logout />
</Route>



<Route>
    
    <Errorpage />
        
    
</Route>

</Switch>



</>

        )
}

export default App
