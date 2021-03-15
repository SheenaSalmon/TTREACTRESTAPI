import React, {useContext, useEffect} from "react"
import {Link} from "react-router-dom";
import ReactMarkdown from "react-markdown"

import {CourseContext} from "./Context"


export default function  CourseDetail(props) {
    const context=useContext(CourseContext);     

     
    useEffect(()=>{
     //Load the course information
        context.actions.getCourseDetail(props.match.params.id)
        

    },[])
   
    //function called to delete course and redirect to main page
    const deleteCourse=(course)=>{
      context.actions.deleteCourse(course).then(()=>
      props.history.push("/")
      )

    }
    const courseInfo=<div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{context.currentCourse.title}</h3>
              <p>By Joe Smith</p>
            </div>
            <div className="course--description">
              {/* Creates a markdown from description data returned from api call */}
             <ReactMarkdown children={context.currentCourse.description}/> 
            </div>
          </div>
          </div>;
    
    //if(authenticatedUser.id===course.User.id)

    const courseHeader= <div className="actions--bar">
    <div className="bounds">
      <div className="grid-100">{
        (context.authenticatedUser && context.authenticatedUser.id==context.currentCourse.User.id)? <span><Link className="button" to={`/courses/${context.currentCourse.id}/update`}>Update Course</Link>
      <Link className="button" to="#" onClick={()=>{deleteCourse(context.currentCourse)}}>Delete Course</Link></span>:""}
      <Link className="button button-secondary" to="/">Return to List</Link></div>
    </div>
  </div>;

  const courseExtras = <div className="grid-25 grid-right">
  <div className="course--stats">
    <ul className="course--stats--list">
      <li className="course--stats--list--item">
        <h4>Estimated Time</h4>
        <h3>{context.currentCourse.estimatedTime}</h3>
      </li>
      <li className="course--stats--list--item">
        <h4>Materials Needed</h4>
         {/* Creates a markdown from description data returned from api call */}
        <ul><ReactMarkdown children={context.currentCourse.materialsNeeded} /> </ul>
      
      </li>
    </ul>
  </div>
</div>    
    
//Displays the course details of the course with the matching id
    return(
        <div>
            {courseHeader}
            {courseInfo}
            {courseExtras}
            </div>

    )
    
}

