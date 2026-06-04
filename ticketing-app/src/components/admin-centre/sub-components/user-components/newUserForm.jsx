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
            ...formData,
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
            <button type='button' 
                    className='cursor-pointer gap-2 w-1/2 grid grid-cols-2 p-2 text-bgMain font-bold text-xl
                    border-b border-wisePaleGrey transition delay-75 duration-300 ease-in-out hover:border-bgMain 
                    hover:scale-105' 
                    onClick={() => setShowForm(!showForm)}>
                    <span className='text-left'>Add new user</span>
                    <span className='text-right'>{showForm === false ? <><FontAwesomeIcon icon={faChevronDown}/></> : <><FontAwesomeIcon icon={faAngleUp}/></>}</span>
            </button>
            <div className={` 
                    ${showForm ? 'block opacity-100' : 'hidden opacity-0'}
                    transition-all bg-wiseNavy shadow-wiseSkin shadow-sm p-7 rounded-md outline-1 outline-wiseSkin
                `}>
                <form onSubmit={newUserHandler} className='grid grid-cols-1 gap-10 text-wiseOffWhite'>
                    <div className='grid grid-cols-1 gap-2'>
                        <label htmlFor='firstName'>First Name:</label>
                        <input
                            type='text'
                            name='firstName'
                            value={newFormData.firstName}
                            onChange={updateEventHandler}
                            placeholder='John'
                        />
                    </div>
                    <div className='grid grid-cols-1 gap-2'>
                        <label htmlFor='lastName'>Last Name:</label>
                        <input
                            type='text'
                            name='lastName'
                            value={newFormData.lastName}
                            onChange={updateEventHandler}
                            placeholder='Smith'
                        />
                    </div>
                    <div className='grid grid-cols-1 gap-2'>
                        <label htmlFor='jobTitle'>Job title:</label>
                        <input
                            type='text'
                            name='jobTitle'
                            value={newFormData.jobTitle}
                            onChange={updateEventHandler}
                        />
                    </div>
                    <div className='grid grid-cols-1 gap-2'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='text'
                            name='email'
                            value={newFormData.email}
                            onChange={updateEventHandler}
                            placeholder='firstName.lastName@businessdomain.com'
                        />
                    </div>
                    <div className='grid grid-cols-1 gap-2'>
                        <label htmlFor='password'>Password:</label>
                        <input
                            type='text'
                            name='password'
                            value={newFormData.password}
                            onChange={updateEventHandler}
                            placeholder="Set a default password (immediate reset at next log in)"
                        />
                    </div>
                    <div className='grid grid-cols-1 gap-2'>
                        <label htmlFor='department'>Department:</label>
                        <Select
                            value={newFormData.departmentId}
                            options={departments}
                            onChange={(selectedOption) => handleExplicitChange('departmentId', selectedOption)} />
                    </div>
                    <div className='grid grid-cols-1 gap-2'>
                        <label htmlFor='role'>Permission Level:</label>
                        <div className='text-wiseNavy'>
                            <Select
                                value={newFormData.role}
                                options={roleOptions}
                                onChange={(selectedOption) => handleExplicitChange('role', selectedOption)} />
                        </div>
                    </div>
                    <button type='submit' className='cursor-pointer'>Add User</button>
                </form>
            </div>
        </div>
    )
};