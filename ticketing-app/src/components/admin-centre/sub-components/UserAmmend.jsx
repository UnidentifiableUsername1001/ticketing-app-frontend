import React, { useState } from 'react';
import { useAppContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import { useGetDepartments } from '../../../hooks/useGetDepartments';
import { useAssignableUsers } from '../../../hooks/user-fetch-hooks/useGetAllUsers';
import { config } from '../../../../config';
import useNewUser from '../../../hooks/user-fetch-hooks/useNewUser';
import useUpdateUser from '../../../hooks/user-fetch-hooks/useUpdateUser';

export default function UserAmend() {
    
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

    const [targetUserId, setTargetUserId] = useState(''); 
    const departments = useGetDepartments();
    const users = useAssignableUsers();
    const newUserHandler = useNewUser(formData, setFormData);
    const updateUserHandler = useUpdateUser(formData, setFormData, targetUserId);
    
    const updateEventHandler = (event) => {
        let targetName = event.target.name;
        let targetValue = event.target.value;

        setFormData({
            ...formData,
            [targetName]: targetValue
        });
    };

};

