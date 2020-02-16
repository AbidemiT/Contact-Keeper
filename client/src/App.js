import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Navbar from "../src/components/layout/Navbar";
import Home from "../src/components/pages/Home";
import About from "../src/components/pages/About";
import PrivateRoute from "./components/routing/PrivateRoute";
import Register from "../src/components/auth/Register";
import Login from "../src/components/auth/Login";
import Alert from "../src/components/layout/Alert";
import ContactState from  "../src/context/contact/ContactState";
import AlertState from  "../src/context/alert/AlertState";
import AuthState from  "../src/context/auth/AuthState";
import setAuthToken from "./utils/setAuthToken";

const token = localStorage.getItem("token");

  if(token) {
    setAuthToken(token);
  }

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
            <Navbar/>
            <div className="container">
              <Alert/>
              <Switch>
                <PrivateRoute exact path="/" component={Home}></PrivateRoute>
                <Route exact path="/about" component={About}></Route>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/login" component={Login}></Route>
              </Switch>
            </div>
          </Fragment>
        </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
