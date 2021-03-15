
import React,{useEffect,useState} from "react"


import {Link,BrowserRouter as  Router, Switch,Route}  from "react-router-dom"
import PrivateRoute from './PrivateRoute'
import Header from "./Header"
import Courses from "./Courses"
import CourseDetail from "./CourseDetail"
import UserSignIn from "./UserSignIn";
import UserSignUp from "./UserSignUp"
import UserSignOut from "./UserSignOut";
import CreateCourse from "./CreateCourse";
import UpdateCourse from "./UpdateCourse";

function App() {

  
  return (
    <div className="App">
      <Router>
     <Header />
     <hr />
    <Switch>
      <Route exact path="/" component={Courses}/>
      <PrivateRoute path="/courses/create" component={CreateCourse} />
      <Route exact path="/courses/:id" component={CourseDetail}/>
      <PrivateRoute path="/courses/:id/update" component={UpdateCourse}/>
      <Route path="/signin"  component={UserSignIn}/>
      <Route path="/signup"  component={UserSignUp}/>
      <Route path="/signout" component={UserSignOut} />
     
    </Switch>

      </Router>
    </div>
  );
}

export default App;
