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
           
          
         }
         return user;
         

     }

     

     const createCourse= async (newCourse)=>
     {
           const course = await data.createCourse({"username":username,"password":password},{...newCourse,userId:authenticatedUser.id});
           return course;
          
        
     }

     const updateCourse= async (course)=>
     {
         if(authenticatedUser)
           {
               if(authenticatedUser.id===course.User.id)
            
                {
                    const updatedCourse = await data.updateCourse({"username":username,"password":password},{...course,userId:authenticatedUser.id});
        
                    return updatedCourse;
                }
                else
            {return ["You do not have permission to update this course"]}
        
        
        
        }
           else{
               return ["please login"];
           }
          
        
     }

     const deleteCourse= async ( course)=>
     {
         if(authenticatedUser){
             if (authenticatedUser.id===course.User.id)
       {await data.deleteCourse({username,password},course)
      
    }
       else{
           alert("You do not have permission to delete this course")
       }

    }

       
       else{
           alert("Please log in");
       }
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
             createCourse:createCourse,
             deleteCourse,
             updateCourse
         }
     }

    

    return(
        
            <CourseContext.Provider value={value}>

                {props.children}
            </CourseContext.Provider>
    )
}

export {CourseContextProvider, CourseContext}