import React, { useState, useEffect } from 'react';
import useGetDepartments from '../../../../hooks/department-fetch/useGetDepartments';
import useAssignableUsers from '../../../../hooks/user-fetch-hooks/useGetAllUsers';
import useUpdateUser from '../../../../hooks/user-fetch-hooks/useUpdateUser';
import Select from 'react-select';
import { useGetOneUser } from '../../../../hooks/user-fetch-hooks/useGetOneUser'

export function UpdateUserForm(){

    const [updateFormData, setUpdateFormData] = useState({
        jobTitle: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordResetRequired: null,
        departmentId: {},
        role: {}
    });

    const departments = useGetDepartments();

    const allUsers = useAssignableUsers();
    const [targetUserId, setTargetUserId] = useState({});
    const { user } = useGetOneUser(targetUserId);

    const updateUserHandler = useUpdateUser(updateFormData, setUpdateFormData, targetUserId);

    const roleOptions = [
        {value: 'Admin', label: 'Admin'},
        {value: 'Manager', label: 'Department Manager'},
        {value: 'User', label: 'Standard user'}
    ];
    
    const updateEventHandler = (event, setFormData) => {
        let targetName = event.target.name;
        let targetValue = event.target.value;

        setUpdateFormData({
            ...updateFormData,
            [targetName]: targetValue
        });
    };

    const handleExplicitChange = (name, value) => {
        setUpdateFormData({
            ...updateFormData,
            [name]: value
        })
    };

    const [showForm, setShowForm] = useState(false);

    return (
        <div className='top-div'>
            <button type='button' className='cursor-pointer' onClick={() => setShowForm(!showForm)}>Add New User</button>
            <div className={`transition-all ${showForm ? 'block opacity-100' : 'hidden opacity-0'}`}>
                <form onSubmit={updateUserHandler}>
                    <div>
                        <label htmlFor='selectUser'>Select a user:</label>
                        <Select
                            value={targetUserId}
                            options={allUsers}
                            onChange={(selectedOption) => setTargetUserId(selectedOption)} />
                    </div>
                    <div>
                        <label htmlFor='firstName'>First Name - <span>Current: {user ? user.firstName : ""}</span></label>
                        <input
                            type='text'
                            name='firstName'
                            value={updateFormData.firstName}
                            onChange={updateEventHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name - <span>Current: {user ? user.lastName : ""}</span></label>
                        <input
                            type='text'
                            name='lastName'
                            value={updateFormData.lastName}
                            onChange={updateEventHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor='jobTitle'>Job title - <span>Current: {user ? user.jobTitle : ""}</span></label>
                        <input
                            type='text'
                            name='jobTitle'
                            value={updateFormData.jobTitle}
                            onChange={updateEventHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email - <span>Current: {user ? user.email : ""}</span></label>
                        <input
                            type='text'
                            name='email'
                            value={updateFormData.email}
                            onChange={updateEventHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password Reset Required?</label>
                        <input
                            type='checkbox'
                            name='password'
                            value={updateFormData.passwordResetRequired}
                            onChange={updateEventHandler}
                        />
                    </div>
                     <div>
                        <label htmlFor='department'>Department:</label>
                        <Select
                            value={updateFormData.departmentId}
                            options={departments}
                            onChange={(selectedOption) => handleExplicitChange('departmentId', selectedOption)} />
                    </div>
                    <div>
                        <label htmlFor='role'>Permission Level - <span>Current: {user ? user.role : ""}</span></label>
                        <div>
                            <Select
                                value={updateFormData.role}
                                options={roleOptions}
                                onChange={(selectedOption) => handleExplicitChange('role', selectedOption)} />
                        </div>
                    </div>
                    <button type='submit' className='cursor-pointer'>Update Details</button>
                </form>
            </div>
        </div>
    )
}