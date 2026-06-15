import React, {useState} from 'react';
import { config } from '../../../config';

export function useCreateDepartment(formData, setFormData) {
    const jwtInStore = sessionStorage.getItem('auth-token');
    const url = `${config.backendUrl}/api/new-department`;

    const createDepartment = async (e) => {
        e.preventDefault();
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
                ticketTypes: {},
                config: {
                    assignmentStrategy: ''
                }
            });
        } catch (e) {
            console.log(e);
        }

        return createDepartment;
    }
};