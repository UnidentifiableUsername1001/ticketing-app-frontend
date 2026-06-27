import React, {useState, useEffect} from 'react';
import { config } from '../../../config';

export function useTicketSearch(searchParams) {

    const [allData, setAllData] = useState({
        results: [],
        totalPages: 1,
        currentPage: 1
    });

    const jwtInStore = sessionStorage.getItem('auth-token');

    useEffect(() => {

        if(searchParams.toString() === '' || searchParams.toString() === 'view=team') return;

        const url = `${config.backendUrl}/api/ticket/search?${searchParams}`;

        const getTickets = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/JSON',
                        'Content-Type':'application/JSON',
                        Authorization: `Bearer ${jwtInStore}`
                    }
                });

                if(!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                };

                const data = await response.json();
                setAllData({
                    results: data.results,
                    totalPages: data.totalPages,
                    currentPage: data.currentPage
                });

            } catch (e) {
                console.log(e);
            }

        }   
        getTickets();
    }, [searchParams.toString()]);

    return allData;

};