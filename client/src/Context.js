import React, {useState} from "react"
import Data from "./Data";

const CourseContext=React.createContext();

function CourseContextProvider(props){
    
    
    const [courses,setCourses]=useState([]);

     const [authenticatedUser,setAuthenticatedUser] =useState(null);
     const [currentCourse,setCurrentCourse] = useState({});
     const [password,setPassword]=useState(null);
     const [username,setUserName]=useState(null);
   

     const data = new Data();

     const signIn = async (username, password) =>
     {
         const user = await data.getUser(username, password);

         if(user !== null)
         {
             setAuthenticatedUser(user);
             setPassword(password);
             setUserName(username);
             console.log(`The authenticated user is ${Object.entries(authenticatedUser)}`);
          
         }
         return user;
         

     }

     const createCourse= async (newCourse)=>
     {
           const course = await data.createCourse({"username":username,"password":password},{...newCourse,userId:authenticatedUser.id});
          
        
     }

     const signOut =() =>{
         setAuthenticatedUser(null);
         setUserName(null);
         setPassword(null)
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

        }
    }

     const value={
         authenticatedUser:authenticatedUser,
         courses:courses,
         currentCourse:currentCourse,
        
         data:data,
         actions:{
             signIn:signIn,
             signOut:signOut,
             loadCourses:loadCourses,
             getCourseDetail: getCourseDetail,
             createCourse:createCourse
         }
     }

    

    return(
        
            <CourseContext.Provider value={value}>

                {props.children}
            </CourseContext.Provider>
    )
}

export {CourseContextProvider, CourseContext}