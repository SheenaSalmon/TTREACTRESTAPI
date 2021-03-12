import React,{useContext, useState} from "react";
import {CourseContext} from "./Context";
import ErrorDisplay from './ErrorsDisplay';
import {Link} from "react-router-dom";

export default function UserSignUp(props){
    const context=useContext(CourseContext);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [confirmedPassword,setConfirmedPassword]=useState("");
    const [errors,setErrors]=useState(null);



    const handleChange=(e)=>{
      
     switch(e.target.name)
     {
       case "email":
         setEmail(e.target.value);
         break;
       case "password":
         setPassword(e.target.value);
         break;
        case "confirmPassword":
            setConfirmedPassword(e.target.value)
            break;
        case "firstName" :
            setFirstName(e.target.value)
            break;
        case "lastName" :
            setLastName(e.target.value)
            break;
         default:
           break;
        
     }
     console.log(`${password}  ${email}`)
    }

    const handleSubmit=(e)=>
    {
      e.preventDefault();
      const user={
          firstName,
          lastName,
          password,
          "emailAddress":email,
          
      }

    //   {
    //     "firstName": "Joe",
    //     "lastName": "Know",
    //     "password": "knowjoe",
    //     "emailAddress": "knowjoe@email.com"
    // }



      context.data.createUser(user).then((out)=>{
        console.log(`This is the user ${user.firstName} ${out}`)
        console.log( Object.entries(out));
        setErrors(out);
   
      }).catch((error)=>{
        console.log(error)
      });
      
    }

    return(
        <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          

          <div>

            <ErrorDisplay errors={errors}/>
            <form onSubmit={handleSubmit}>
            <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={firstName} onChange={handleChange}/></div>
            <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={lastName} onChange={handleChange}/></div>
              <div><input id="email" name="email" type="text" className="" placeholder="Please enter you email address" value={email} onChange={handleChange}/></div>
              
              <div><input id="password" name="password" type="password" className="" placeholder="Password" value={password} onChange={handleChange}/></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Password" value={confirmedPassword} onChange={handleChange}/></div>
              <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">Sign Up</button>
                  <button className="button button-secondary" onClick={(e)=>{e.preventDefault(); props.history.push("/") }}>Cancel</button>
                </div>
            </form>


          </div>


          <p>&nbsp;</p>
         
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>




        </div>
      </div>

    )
}