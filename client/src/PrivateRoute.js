import React,{ useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {CourseContext} from './Context'

//Private Route HOC that renders the component passed in  only if the user is authenticated.   Otherwise, the user is redirected to the sign in page
export default function PrivateRoute({component:Component, ...rest})
{
    const context=useContext(CourseContext);
    return(<Route  {...rest} render={props => context.authenticatedUser? (<Component {...props}/>) : (
    
    <Redirect to={{pathname:'/signin',state:{from:props.location}}} />)
    }
        />)
    
}