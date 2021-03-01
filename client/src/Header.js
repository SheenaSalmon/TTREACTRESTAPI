import React,{useContext} from "react";
import {CourseContext} from "./Context";
import {Link} from "react-router-dom"


function Header(){
    const context=useContext(CourseContext);

    const loggedOut =<><Link className="signup" to="/signup">Sign Up</Link><Link className="signin" to="/signin">Sign In</Link></>;
    const loggedIn =<><b>Welcome, {context.authenticatedUser && context.authenticatedUser.firstName}</b><Link to="/signout"> Sign Out</Link></>;

    return(
        <div className="header">
        <div className="bounds">
          <h1 className="header--logo"><Link  to ="/">Courses</Link></h1>
          <p>{context.authenticatedUser? context.authenticatedUser.emailAddress : ""}</p>
          <nav>{context.authenticatedUser ? loggedIn : loggedOut}</nav>
        </div>
      </div>
    )
}

export default Header