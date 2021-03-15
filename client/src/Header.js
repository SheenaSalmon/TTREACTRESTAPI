import React,{useContext} from "react";
import {CourseContext} from "./Context";
import {Link} from "react-router-dom"


function Header(){
    const context=useContext(CourseContext);

    const loggedOut =<><Link className="signup" to="/signup">Sign Up</Link><Link className="signin" to="/signin">Sign In</Link></>;
    const loggedIn =<><span>Welcome, {context.authenticatedUser && `${context.authenticatedUser.firstName}  ${context.authenticatedUser.lastName}`}</span><Link to="/signout"> Sign Out</Link></>;

    return(
        <div className="header">
        <div className="bounds">
          <h1 className="header--logo"><Link  to ="/">Courses</Link></h1>
        {/* Display based on whether use is logged in or out */}
          <nav>{context.authenticatedUser ? loggedIn : loggedOut}</nav>
        </div>
      </div>
    )
}

export default Header