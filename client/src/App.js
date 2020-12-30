import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from  'react';


function App() {
let [courses, setCourses]=useState([]);
useEffect(()=>{
  axios.get('http://localhost:5000/api/courses')
  .then(response => {
    //console.log(response);
  setCourses(response.data);
  } )
  .catch(error => {
    console.log('Error fetching and parsing data', error);
  });}
  ,[]);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

    <div>{courses.map( (course) =>{ return ( <div key={course.id}><h1> {course.title}</h1> 
    <p>{course.description}</p></div>)})} Hello</div>
    </div>
  );
}

export default App;
