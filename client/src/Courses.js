import React, {useContext} from "react";
import {CourseContext} from "./Context";
import Course from "./Course";
import {Link} from "react-router-dom"

//maps through courses and display each of the course and the create course button 
export default function Courses(props)
{

        const context = useContext(CourseContext);
        context.actions.loadCourses();

        const courses= context.courses.map( (course) =>
        {
             return  <div key ={course.id} className="grid-33"><Course   course={course}/></div>
        })
    return(

        <div className="bounds">
                {courses}

            <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </Link></div>

        </div>


    )
}
