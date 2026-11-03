import React, {useState, useEffect} from 'react';
import { config } from '../../../config';
import { useQuery } from '@tanstack/react-query';

export function useGetAllTickets(searchParams) {

    const queryResult = useQuery({
        queryKey: ['all-tickets'],
        queryFn: async (payload) => {

            const url = `${config.backendUrl}/api/ticket/?${searchParams}`;
            const jwtInStore = sessionStorage.getItem('auth-token'); 
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
            };

            const data = await response.json();
            
            return data.ticketArray
        }
    })
    return {
        tickets: queryResult.data ?? [],
        isGettingTickets: queryResult.isPending,
        errorGettingTickets: queryResult.isError
    }
};