
import React,{useEffect,useState} from "react"

import axios from "axios";
import {Link,BrowserRouter as  Router, Switch,Route}  from "react-router-dom"

import Header from "./Header"
import Courses from "./Courses"
import CourseDetail from "./CourseDetail"

function App() {

  // let [courses, setCourses] = useState([]);

  // useEffect( ()=>
  // {
  //   axios.get('http://localhost:5000/api/courses')
  //   .then(response => {
  //     setCourses(response.data)
  //   })
  //   .catch( error => {
  //     console.log("Error fetching and parsing data")
  //   })
  // },[]

  // )
  return (
    <div className="App">
      <Router>
     <Header />
     {/* <div>{courses.map( (course) =>{ return ( <div key={course.id}><h1> {course.title}</h1> 
    <p>{course.description}</p></div>)})} 
    
    </div> */}
    <Switch>
      <Route exact path="/" component={Courses}/>

      <Route path="/courses/:id" component={CourseDetail}/>
      
    </Switch>

      </Router>
    </div>
  );
}

export default App;
