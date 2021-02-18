import React,{useContext} from "react";
//import CourseContext from "./Context"
import {Link} from "react-router-dom"
export default function Course({course}) {
    //const context = useContext(CourseContext);

    return(
        <Link className="course--module course--link" to ={`/courses/${course.id}`}><h4 className="course--label"> Course</h4> 
    <h5  className="course--title">{course.title}</h5>
    </Link>
    )

    
    
}
{/* <div class="grid-33"><a class="course--module course--link" href="course-detail.html">
<h4 class="course--label">Course</h4>
<h3 class="course--title">Learn How to Test Programs</h3>
</a></div> */}