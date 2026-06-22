import React, { useState, useEffect } from 'react';
import useGetDepartments from '../../../../hooks/department-fetch/useGetDepartments';
import { config } from '../../../../../config';
import useNewUser from '../../../../hooks/user-fetch-hooks/useNewUser';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export function NewUserForm() {
        const [newFormData, setNewFormData] = useState({
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

    const newUserHandler = useNewUser(newFormData, setNewFormData);

    const roleOptions = [
        {value: 'Admin', label: 'Admin'},
        {value: 'Manager', label: 'Department Manager'},
        {value: 'User', label: 'Standard user'}
    ];
    
    const updateEventHandler = (event, setFormData) => {
        let targetName = event.target.name;
        let targetValue = event.target.value;

        setNewFormData({
            ...newFormData,
            [targetName]: targetValue
        });
    };

    const handleExplicitChange = (name, value) => {
        setNewFormData({
            ...newFormData,
            [name]: value
        })
    };

    const [showForm, setShowForm] = useState(false);
    
    return (
        <div className='top-div grid grid-cols-1 gap-10 font-lato'>
            <button type='button' className='form-dropDown-button' onClick={() => setShowForm(!showForm)}>
                <div className='width-full flex flex-row justify-between relative z-10'>
                    <span className=''>Add New User</span>
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
                <form onSubmit={newUserHandler} className='grid grid-cols-7 gap-10 text-wiseOffWhite'>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label htmlFor='firstName' className='admin-form-label'>First Name:</label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='firstName'
                            value={newFormData.firstName}
                            onChange={updateEventHandler}
                            placeholder='John'
                        />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label htmlFor='lastName' className='admin-form-label'>Last Name:</label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='lastName'
                            value={newFormData.lastName}
                            onChange={updateEventHandler}
                            placeholder='Smith'
                        />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label htmlFor='jobTitle' className='admin-form-label'> Job title:</label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='jobTitle'
                            value={newFormData.jobTitle}
                            onChange={updateEventHandler}
                            placeholder='Technical Production Manager'
                        />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label htmlFor='email' className='admin-form-label'>Email:</label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='email'
                            value={newFormData.email}
                            onChange={updateEventHandler}
                            placeholder='name@businessdomain.com'
                        />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label htmlFor='password' className='admin-form-label'> Password:</label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='password'
                            value={newFormData.password}
                            onChange={updateEventHandler}
                            placeholder="Set a default password"
                        />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label htmlFor='department' className='admin-form-label'>Department:</label>
                        <Select
                            value={newFormData.departmentId}
                            options={departments}
                            onChange={(selectedOption) => handleExplicitChange('departmentId', selectedOption)} />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label htmlFor='role' className='admin-form-label'>Permission Level:</label>
                        <div className='text-wiseNavy'>
                            <Select
                                value={newFormData.role}
                                options={roleOptions}
                                onChange={(selectedOption) => handleExplicitChange('role', selectedOption)} />
                        </div>
                    </div>
                    <button 
                        type='submit' 
                        className='cursor-pointer p-1 bg-wiseSkin text-lg font-normal transition duration-200
                            hover:bg-bgMain hover:text-wiseDarkPink hover:outline hover:outline-offset-2 hover:outline-wiseSkin 
                            col-start-3 col-span-3 text-center'>
                            Add User
                    </button>
                </form>
            </div>
        </div>
    )
};