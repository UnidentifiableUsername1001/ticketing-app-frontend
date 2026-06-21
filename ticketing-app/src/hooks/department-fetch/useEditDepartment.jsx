import React, { useState } from 'react';
import { config } from '../../../config';

export function useEditDepartment (formData, stateFunction, deptId) {
    const jwtInStore = sessionStorage.getItem('auth-token');

    const handleUpdateDept = async (e) => {
        e.preventDefault();
        
        try {
            const destructDeptId = typeof deptId === 'object' ? deptId.value : deptId;
            const url = `${config.backendUrl}/api/department/edit-department/${destructDeptId}`

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`
                }, 
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status} ${response.message}`);
            }

            stateFunction({
                name: '',
                ticketTypes: {},
                config: {
                    assignmentStrategy: ''
                }
            });
        } catch (e) {
            console.log(e);
        };
    }

    return handleUpdateDept;
}   