import React, { useState, useEffect } from 'react';
import useGetDepartments from '../../../../hooks/department-fetch/useGetDepartments';
import useAssignableUsers from '../../../../hooks/user-fetch-hooks/useGetAllUsers';
import useUpdateUser from '../../../../hooks/user-fetch-hooks/useUpdateUser';
import Select from 'react-select';
import { useGetOneUser } from '../../../../hooks/user-fetch-hooks/useGetOneUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export function UpdateUserForm(){

    const [updateFormData, setUpdateFormData] = useState({
        jobTitle: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordResetRequired: undefined,
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
    
    const updateEventHandler = (event) => {
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
        <div className='top-div grid grid-cols-1 gap-10 font-lato'>
            <button type='button' className='form-dropDown-button' onClick={() => setShowForm(!showForm)}>
                <div className='width-full flex flex-row justify-between relative z-10'>
                    <span className=''>Edit Existing User</span>
                    <span className=''>
                        {showForm === false ? 
                            <><FontAwesomeIcon icon={faChevronDown}/></> 
                            : 
                            <><FontAwesomeIcon icon={faAngleUp}/></>}
                    </span>
                </div>
            </button>
            <div className={` 
                    ${showForm ? 'block opacity-100' : 'hidden opacity-0'}
                    transition-all bg-wiseNavy shadow-wiseSkin shadow-sm p-7 rounded-md outline-1 outline-wiseSkin
                `}>
                <form onSubmit={updateUserHandler} className='grid grid-cols-7 gap-10 text-wiseOffWhite'>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='selectUser'>Select a user:</label>
                        <Select
                            className='text-wiseNavy'
                            value={targetUserId}
                            options={allUsers}
                            onChange={(selectedOption) => setTargetUserId(selectedOption)} />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='firstName'>First Name - <span className='text-wiseDarkPink'>Current: {user ? user.firstName : ""}</span></label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='firstName'
                            value={updateFormData.firstName}
                            onChange={updateEventHandler}
                        />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='lastName'>Last Name - <span className='text-wiseDarkPink'>Current: {user ? user.lastName : ""}</span></label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='lastName'
                            value={updateFormData.lastName}
                            onChange={updateEventHandler}
                        />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='jobTitle'>Job title - <span className='text-wiseDarkPink'>Current: {user ? user.jobTitle : ""}</span></label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='jobTitle'
                            value={updateFormData.jobTitle}
                            onChange={updateEventHandler}
                        />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='email'>Email - <span className='text-wiseDarkPink'>Current: {user ? user.email : ""}</span></label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='email'
                            value={updateFormData.email}
                            onChange={updateEventHandler}
                        />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='password'>Password Reset Required?</label>
                        <input
                            className='admin-form-control'
                            type='checkbox'
                            name='password'
                            value={updateFormData.passwordResetRequired}
                            onChange={updateEventHandler}
                        />
                    </div>
                     <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='department'>Department:</label>
                        <Select
                            className='text-wiseNavy'
                            value={updateFormData.departmentId}
                            options={departments}
                            onChange={(selectedOption) => handleExplicitChange('departmentId', selectedOption)} />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='role'>Permission Level - <span className='text-wiseDarkPink'>Current: {user ? user.role : ""}</span></label>
                        <div>
                            <Select
                                className='text-wiseNavy'
                                value={updateFormData.role}
                                options={roleOptions}
                                onChange={(selectedOption) => handleExplicitChange('role', selectedOption)} />
                        </div>
                    </div>
 
                 <button 
                    type='submit' 
                    className='cursor-pointer p-1 bg-wiseSkin text-lg font-normal transition duration-200
                            hover:bg-bgMain hover:text-wiseDarkPink hover:outline hover:outline-offset-2 hover:outline-wiseSkin 
                            col-start-3 col-span-3 text-center'>
                        Update Details
                </button>
                </form>
            </div>
        </div>
    )
}