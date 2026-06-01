import React, { useState } from 'react';
import { useAppContext } from "../../../context/authContext";
import { useNavigate } from "react-router";
import useGetDepartments from '../../../hooks/useGetDepartments';
import  useAssignableUsers from '../../../hooks/user-fetch-hooks/useGetAllUsers';
import { config } from '../../../../config';
import useNewUser from '../../../hooks/user-fetch-hooks/useNewUser';
import useUpdateUser from '../../../hooks/user-fetch-hooks/useUpdateUser';
import Select from 'react-select';

export default function UserAmmend() {
    
    const [formData, setFormData] = useState({
        jobTitle: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordResetRequired: null,
        departmentId: "",
        role: ""
    });

    const [targetUserId, setTargetUserId] = useState({});
    const [userRole, setUserRole] = useState({});
    const [targetDepartment, setTargetDept] = useState({});
    const departments = useGetDepartments();
    const users = useAssignableUsers();
    const newUserHandler = useNewUser(formData, setFormData);
    const updateUserHandler = useUpdateUser(formData, setFormData, targetUserId);

    const roleOptions = [
        {value: 'Admin', label: 'Admin'},
        {value: 'Manager', label: 'Department Manager'},
        {value: 'User', label: 'Standard user'}
    ];
    
    const updateEventHandler = (event) => {
        let targetName = event.target.name;
        let targetValue = event.target.value;

        setFormData({
            ...formData,
            [targetName]: targetValue
        });
    };

    return (
        <div className='top-div'>
            <div className='new-user bg-red-300'>
                <form>
                    <h1 className='title'>Add New User</h1>
                    <div>
                        <label htmlFor='firstName'>First Name:</label>
                        <input
                            type='text'
                            name='firstName'
                            value={formData.firstName}
                            onChange={updateEventHandler}
                            placeholder='John'
                        />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name:</label>
                        <input
                            type='text'
                            name='lastName'
                            value={formData.lastName}
                            onChange={updateEventHandler}
                            placeholder='Smith'
                        />
                    </div>
                    <div>
                        <label htmlFor='jobTitle'>Job title:</label>
                        <input
                            type='text'
                            name='jobTitle'
                            value={formData.jobTitle}
                            onChange={updateEventHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='text'
                            name='email'
                            value={formData.email}
                            onChange={updateEventHandler}
                            placeholder='firstName.lastName@businessdomain.com'
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password:</label>
                        <input
                            type='text'
                            name='password'
                            value={formData.password}
                            onChange={updateEventHandler}
                            placeholder="Set a default password (immediate reset at next log in)"
                        />
                    </div>
                    <div>
                        <label htmlFor='department'>Department:</label>
                        <Select
                            value={targetDepartment}
                            options={departments}
                            onChange={(selectedOption) => setUserRole(selectedOption)} />
                    </div>
                    <div>
                        <label htmlFor='role'>Permission Level:</label>
                        <div>
                            <Select
                                value={userRole}
                                options={roleOptions}
                                onChange={(selectedOption) => setUserRole(selectedOption)} />
                        </div>
                    </div>
                    <button type='submit' className='cursor-pointer'>Add User</button>
                </form>
            </div>
            <div className='update-user bg-blue-300'>
                <form>
                    
                </form>
            </div>
        </div>
    )
};

