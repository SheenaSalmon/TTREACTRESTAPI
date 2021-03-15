import React from "react";

import {Link} from "react-router-dom"
export default function Course({course}) {
   
//Template used for each course
    return(
        <Link className="course--module course--link" to ={`/courses/${course.id}`}><h4 className="course--label"> Course</h4> 
    <h5  className="course--title">{course.title}</h5>
    </Link>
    )

    
    
}
