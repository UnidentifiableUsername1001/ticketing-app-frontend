import React, { useState, useEffect } from 'react';
import useGetDepartments from '../../../../hooks/department-fetch/useGetDepartments';
import { config } from '../../../../../config';
import useNewUser from '../../../../hooks/user-fetch-hooks/useNewUser';
import Select from 'react-select';

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

    return (
        <div className='top-div'>
            <div className='new-user bg-red-300'>
                <form onSubmit={newUserHandler}>
                    <h1 className='title'>Add New User</h1>
                    <div>
                        <label htmlFor='firstName'>First Name:</label>
                        <input
                            type='text'
                            name='firstName'
                            value={newFormData.firstName}
                            onChange={updateEventHandler}
                            placeholder='John'
                        />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name:</label>
                        <input
                            type='text'
                            name='lastName'
                            value={newFormData.lastName}
                            onChange={updateEventHandler}
                            placeholder='Smith'
                        />
                    </div>
                    <div>
                        <label htmlFor='jobTitle'>Job title:</label>
                        <input
                            type='text'
                            name='jobTitle'
                            value={newFormData.jobTitle}
                            onChange={updateEventHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='text'
                            name='email'
                            value={newFormData.email}
                            onChange={updateEventHandler}
                            placeholder='firstName.lastName@businessdomain.com'
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password:</label>
                        <input
                            type='text'
                            name='password'
                            value={newFormData.password}
                            onChange={updateEventHandler}
                            placeholder="Set a default password (immediate reset at next log in)"
                        />
                    </div>
                    <div>
                        <label htmlFor='department'>Department:</label>
                        <Select
                            value={newFormData.departmentId}
                            options={departments}
                            onChange={(selectedOption) => handleExplicitChange('departmentId', selectedOption)} />
                    </div>
                    <div>
                        <label htmlFor='role'>Permission Level:</label>
                        <div>
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