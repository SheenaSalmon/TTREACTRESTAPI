import React ,{useContext,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {CourseContext} from './Context'

//Sign out the user and redirects to the main page
export default function UserSignOut(props) {
 const context=useContext(CourseContext);
    useEffect(()=>{
context.actions.signOut();
    },[])
   
    

    return(
        <Redirect to="/" />
    
    )
    
}