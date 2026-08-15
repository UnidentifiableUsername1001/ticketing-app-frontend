import React, {useState, useEffect} from 'react';
import { config } from '../../../config';

export function useGetAllTickets() {
    
    const [tickets, setTickets] = useState([]);

    const url = `${config.backendUrl}/api/ticket/`;
    const jwtInStore = sessionStorage.getItem('auth-token'); 
    useEffect(() => {
        const getTickets = async () => {
                try {
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/JSON',
                            'Content-Type': 'application/JSON',
                            Authorization: `Bearer ${jwtInStore}`
                        }
                        });
                        
                    if (!response.ok) {
                        throw new Error(`HTTP error: Status ${response.status}, ${response.message}`);
                        return;
                    };
                    const data = await response.json();
                    setTickets(data.ticketArray);
                } catch (e) {
                    console.log('Error fetching data: ' + e.message);
                }
            };
        getTickets();
    }, [])

    return tickets;
};