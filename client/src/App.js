import axios from 'axios';
import logo from './logo.svg';
import './App.css';


function App() {
let CourseOut;
console.log(CourseOut)
  axios.get('http://localhost:5000/api/courses')
  .then(response => {
    console.log(response);
   CourseOut= response.data.map( (course) =>{ return(<div> <h1>course.title</h1> <p>course.description</p></div>)});
   console.log(`This is ${CourseOut}`);
  }
  
  )
  .catch(error => {
    console.log('Error fetching and parsing data', error);
  });
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

    <div>{CourseOut[1]} Hello</div>
    </div>
  );
}

export default App;
