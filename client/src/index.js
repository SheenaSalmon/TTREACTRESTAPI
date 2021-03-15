import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/global.css";
import App from './App';
import {CourseContextProvider} from "./Context" //import the CourseContextProvider , so Contentext can be used across the app

ReactDOM.render(
  <CourseContextProvider>
     <App />
  </CourseContextProvider>
   
  ,
  document.getElementById('root')
);

