import React, { useContext, useState} from "react";
import {CourseContext} from "./Context";
import {Link} from "react-router-dom"

export default function UserSignIn(props){
    const context=useContext(CourseContext);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");


    const handleChange=(e)=>{
      
     switch(e.target.name)
     {
       case "email":
         setEmail(e.target.value);
         break;
       case "password":
         setPassword(e.target.value);
         break;
         default:
           break;
        
     }
     console.log(`${password}  ${email}`)
    }

    const handleSubmit=(e)=>
    {
      e.preventDefault();
      context.actions.signIn(email,password).then((user)=>{
        console.log(`This is the user ${user}`)
        if (user !==null)
        {
          props.history.push("/courses/1");
          console.log(`The user is authenticated ${context.authenticatedUser.firstName}`)
        }
        else

        {
          props.history.push("/")
        }
      }).catch((error)=>{
        console.log(error)
      });
      
    }

    return(
        <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          

          <div>


            <form onSubmit={handleSubmit}>
              <div><input id="email" name="email" type="text" className="" placeholder="Please enter you email address" value={email} onChange={handleChange}/></div>
              
              <div><input id="password" name="password" type="password" className="" placeholder="Password" value={password} onChange={handleChange}/></div>
              <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">Sign In</button>
                  <button className="button button-secondary" onClick={(e)=>{e.preventDefault(); props.history.push("/") }}>Cancel</button>
                </div>
            </form>


          </div>


          <p>&nbsp;</p>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>




        </div>
      </div>

    )
}