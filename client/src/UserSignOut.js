import React ,{useContext,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {CourseContext} from './Context'

export default function UserSignOut(props) {
 const context=useContext(CourseContext);
    useEffect(()=>{
context.actions.signOut();
    },[])
   
    

    return(
        <Redirect to="/" />
    
    )
    
}