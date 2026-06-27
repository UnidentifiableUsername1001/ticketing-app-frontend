import React, { useState, useEffect } from 'react';
import { config } from '../../../config';

export function useGetTicketViewCounts() {
    const [countsObject, setCountsObject] = useState();

    useEffect(() => {
        
        const url = `${config.backendUrl}/api/ticket/counts`;
        const jwt = sessionStorage.getItem('auth-token');
        
        const getCounts = async () => {

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwt}`
                }
            });

            if(!response.ok) {
                throw new Error(`HTTP error ${response.status} - ${response.message}`);
            };

            const data = await response.json();

            setCountsObject(data.ticketCounts[0]);
        }
        getCounts();

    }, []);
    return countsObject;
}