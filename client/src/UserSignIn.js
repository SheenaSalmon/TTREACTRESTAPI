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
     
    }

      //Signs the user in ther redirector to the prior page
    const handleSubmit=(e)=>
    {
      e.preventDefault();
      context.actions.signIn(email,password).then((user)=>{
      
        if (user !==null)
        {
      
          if (props.location.state)
         { props.history.push(props.location.state.from.pathname);}
         else{
           props.history.push("/")
         }
      
        }
        else

        {
          props.history.push("/")
        }
      })
      
      
      
    }

    return(
        <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          

          <div>


          
              <form>
              <div><input id="email" name="email" type="text" className="" placeholder="Please enter you email address" value={email} onChange={handleChange} autoComplete="username"/></div>
              
              <div><input id="password" name="password" type="password" className="" placeholder="Password" value={password} onChange={handleChange}
              autoComplete="current-password"/></div>
              <div className="grid-100 pad-bottom">
                  <button className="button" type="submit" onClick={(e)=>{handleSubmit(e)}}>Sign In</button>
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