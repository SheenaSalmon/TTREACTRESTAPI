import React, {useState} from "react"
import Data from "./Data";

const CourseContext=React.createContext();

function CourseContextProvider(props){
    
    
    const [courses,setCourses]=useState([]);

     const [authenticatedUser,setAuthenticatedUser] =useState(null);
     const [currentCourse,setCurrentCourse] = useState({});
     const [materials,setMaterials]=useState("");

     const data = new Data();

     const signIn = async (username, password) =>
     {
         const user = await data.getUser(username, password);

         if(user !== null)
         {
             setAuthenticatedUser(user)
         }
         

     }

     const signOut =() =>{
         setAuthenticatedUser(null);
     }

     const loadCourses = async ()=>{
         const courseList= await data.getCourses();
         if (courseList !== null)
         {
             setCourses(courseList);
         }
     }

     
     const getCourseDetail = async (id)=>{
        const course= await data.getCourse(id);

        if (course !== null)
        {
            //console.log(`The course is ${Object.entries(course)} from in getCourseDetail`)
            await setCurrentCourse(course);

            if (course.materialsNeeded !==null)
           { setMaterials(course.materialsNeeded.split("*").filter((mat)=>mat !== "").map((material,i)=>
            {
                return <li key={course.id+i}>{material}</li>
            }
            ));}
        }
    }

     const value={
         authenticatedUser:authenticatedUser,
         courses:courses,
         currentCourse:currentCourse,
         materials:materials,
         data:data,
         actions:{
             signIn:signIn,
             signOut:signOut,
             loadCourses:loadCourses,
             getCourseDetail: getCourseDetail
         }
     }

    

    return(
        
            <CourseContext.Provider value={value}>

                {props.children}
            </CourseContext.Provider>
    )
}

export {CourseContextProvider, CourseContext}