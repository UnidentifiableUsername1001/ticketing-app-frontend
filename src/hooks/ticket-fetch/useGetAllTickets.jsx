import React, {useState, useEffect} from 'react';
import { config } from '../../../config';
import { useQuery } from '@tanstack/react-query';
import { HttpError } from '../../utils/errors'

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
                
                let errorData = null;
                
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error("Response Wasn't JSON", { cause: e });
                }

                const errorMessage = errorData?.message || response.statusText || 'Request failed';

                throw new HttpError(response.status, errorMessage, errorData);

            };

            const data = await response.json();
            
            return data.ticketArray
        }
    })
    return {
        tickets: queryResult.data ?? [],
        isGettingTickets: queryResult.isPending,
        errorGettingTickets: queryResult.isError,
        theError: queryResult.error
    }
};