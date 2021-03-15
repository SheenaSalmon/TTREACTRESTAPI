import React, { useContext, useState ,useEffect} from "react";
import {CourseContext} from "./Context";
import ErrorDisplay from './ErrorsDisplay';

export default function UpdateCourse(props) {
    const context =useContext(CourseContext);
    const [description,setDescription] =useState("");
    const [title,setTitle] =useState("");
    const [estimatedTime,setEstimatedTime]=useState("")
    const [materialsNeeded,setMaterialsNeeded]= useState("")
    const [errors, setErrors]=useState(null);


    useEffect(()=>{

      //Loads the Course information and populates there respective state values
        context.actions.getCourseDetail(props.match.params.id).then(()=>
        {
            const course=context.currentCourse;
            if(course.description)
            {setDescription(course.description);}

            if(course.title)            
            {setTitle(course.title)}

            if(course.estimatedTime)
            {setEstimatedTime(course.estimatedTime);}

            if(course.materialsNeeded)
            {setMaterialsNeeded(course.materialsNeeded);}
        })
        

    },[])

    const handleChange=(e)=>  {
        switch (e.target.name) {
            case "description":
                setDescription(e.target.value);                
                break;
            case "title":
                setTitle(e.target.value);
                break;
            case "estimatedTime":
                setEstimatedTime(e.target.value);
                break;
            case "materialsNeeded":
                setMaterialsNeeded(e.target.value)
                break;        
            default:
                break;
        }
    }

    //Send update request;sets errors if any are returned, otherwise redirect the user to the main page
    const handleSubmit=(e)=>
    {
     
        e.preventDefault();
        const course ={...context.currentCourse,description,title,estimatedTime,materialsNeeded};
        
       context.actions.updateCourse(course).then((out)=>
       {
          setErrors(out);
          if(out.length <=0)
         {props.history.push("/")}
       });
    }

    return(

        <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
        {errors? <ErrorDisplay errors={errors} />:""}
          <form onSubmit={handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    value={title} onChange={handleChange} /></div>
                <p>By </p>
              </div>

              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..."  onChange={handleChange} value={description}/></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={estimatedTime} onChange={handleChange} /></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."  value={materialsNeeded} onChange={handleChange} /></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={(e)=>{ e.preventDefault(); props.history.push("/")}}>Cancel</button></div>
          </form>
        </div>
      </div>
    )
    
}
