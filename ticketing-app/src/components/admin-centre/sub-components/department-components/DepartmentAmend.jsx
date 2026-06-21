import React from 'react'
import { useAppContext } from "../../../../context/authContext";
import { CreateDepartment } from './createDepartment';
import { EditDepartment } from './editDepartment';

export function DepartmentAmend() {

    return (
        <div className='grid gap-10'>
            <div className='create-department'>
                <CreateDepartment/>
            </div>
            <div className='edit-department'>
                <EditDepartment/>
            </div>
        </div>
    )
}