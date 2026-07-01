import React from 'react';
import { config } from '../../../config';
import { useNavigate } from "react-router-dom";

export function useCreateTicket(formData) {

    const navigate = useNavigate();
    const urlTickets = `${config.backendUrl}/api/ticket/create`;
    const jwtInStore = sessionStorage.getItem('auth-token');

    const response = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(urlTickets, {
                method: 'POST',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`,

                },
                body: JSON.stringify(formData)
            });


            if(!response.ok) {
                
                throw new Error(`HTTP error, status ${response.status}, ${data.error}`);
            }
            const data = await response.json();

            navigate(`/ticket/${data.id}`);
        } catch (e) {
            console.error(e);
        }
    };

};