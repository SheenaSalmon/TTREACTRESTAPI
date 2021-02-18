import React, {useContext, useEffect, useMemo, useState} from "react"
import {Link} from "react-router-dom"

import {CourseContext} from "./Context"
//import Course from "./Course";

export default function  CourseDetail(props) {
    const context=useContext(CourseContext);
    const [currentCourse,setCurrentCourse]=useState("Hello");
    const [materials,setMaterials]=useState(" ");
    //const {id}=props.match.params
    // let currentCourse=useMemo( () =>{context.actions.getCourseDetail(id);
    
    //     return   context.currentCourse;},[id])
    

    useEffect(()=>{

      
        context.actions.getCourseDetail(props.match.params.id).then(
          ()=>{
             setCurrentCourse(context.currentCourse); 
          }
        )
//         .then( ()=>
//          { 
           
//            if (currentCourse == null)
//            {
//                 //const ulMaterials =currentCourse.materialsNeeded;
//           const mat=currentCourse.materialsNeeded.split("*").map(
//     (material)=>{
//         return <li>{material}</li>
        
//     }
// )
// // setMaterials(mat);
//            }
//           else{
//             setMaterials(currentCourse.materialsNeeded);
//           }
       

// }

//         )
//         .then(
//           ()=>{
//             //const ulMaterials =currentCourse.materialsNeeded;
//           const mat=materials.split("*").map(
//     (material)=>{
//         return <li>{material}</li>
//     }
// )

// setMaterials(mat);
//           }
//         )
       
       
//.split("*");
       //console.log(ulMaterials);


//  setMaterials(materials);

    },[])
    // useEffect(() =>{
        
        
    //     //.then((course)=>{
    // //     setCurrentCourse(course)
    // //    // console.log(Object.values(course))
    // //     // for (let i in course)
    // //     // {

    // //     // }
    // //});
    
        
    // },[])
    
    
    const courseInfo=<div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{context.currentCourse.title}</h3>
              <p>By Joe Smith</p>
            </div>
            <div className="course--description">
              {context.currentCourse.description}
            </div>
          </div>
          </div>;
    
    const courseHeader= <div className="actions--bar">
    <div className="bounds">
      <div className="grid-100"><span><Link className="button" to="update-course.html">Update Course</Link>
      <Link className="button" to="#">Delete Course</Link></span><Link className="button button-secondary" to="/">Return to List</Link></div>
    </div>
  </div>;

// const ulMaterials =context.currentCourse.materialsNeeded;
// //.split("*");

// const materials=ulMaterials.split("*").map(
//     (material)=>{
//         return <li>{material}</li>
//     }
// )
  const courseExtras = <div className="grid-25 grid-right">
  <div className="course--stats">
    <ul className="course--stats--list">
      <li className="course--stats--list--item">
        <h4>Estimated Time</h4>
        <h3>{context.currentCourse.estimatedTime}</h3>
      </li>
      <li className="course--stats--list--item">
        <h4>Materials Needed</h4>
        <ul>{context.materials}</ul>
      
      </li>
    </ul>
  </div>
</div>    
    

    return(
        <div>
            {courseHeader}
            {courseInfo}
            {courseExtras}
            </div>

    )
    
}

///</div>const getCourseDetail = async (id)=>{
//     const course= await data.getCourse(id);
//     if (course !== null)
//     {
//         return(course);
//     }
// }