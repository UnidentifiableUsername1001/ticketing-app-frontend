import React, {useState} from 'react';
import { config } from '../../../config';

export function useCreateDepartment(formData, setFormData) {
    const jwtInStore = sessionStorage.getItem('auth-token');
    const url = `${config.backendUrl}/api/department/new-department`;

    const createDepartment = async (e) => {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }

        console.log(formData);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type': 'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} - ${response.message}`);
            }

            setFormData({
                name: '',
                ticketTypes: [],
                config: {
                    assignmentStrategy: ''
                }
            });
        } catch (error) {
            console.log(error);
        }   
    }
    return createDepartment;
};