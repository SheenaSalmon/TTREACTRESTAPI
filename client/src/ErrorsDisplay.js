
import React, {useState,useContext}from 'react'

export default function ErrorsDisplay(props) {
    let errorsDisplay =null;
    const errors=props.errors;
    if(errors && errors.length)
    {
        errorsDisplay=(

            <div>
                <h2 className="validation--errors--label">Validation errors</h2>

                <div className="validation-errors">
                <ul>
                    {errors.map((error,i)=><li key={i}>{error}</li>)}
                </ul>

                </div>

            </div>
        )
    }
    return errorsDisplay;
    
}