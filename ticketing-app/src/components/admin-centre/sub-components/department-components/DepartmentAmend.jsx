import React from 'react'
import { useAppContext } from "../../../../context/authContext";
import { CreateDepartment } from './createDepartment';

export function DepartmentAmend() {

    return (
        <div>
            <div className='create-department'>
                <CreateDepartment/>
            </div>
            <div className='edit-department'>

            </div>
        </div>
    )
}