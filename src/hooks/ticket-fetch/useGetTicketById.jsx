import React, {useContext} from 'react';
import { config } from "../../../config";
import { useQuery } from '@tanstack/react-query';
import { ToastContext } from '../../context/toast-notification/ToastContext';

export function useGetTicketById(ticketId) {

    const { addToast } = useContext(ToastContext);
    
    const jwtInStore = sessionStorage.getItem('auth-token');
    
    const queryResult = useQuery({
        queryKey: ['ticket', ticketId], 

        queryFn: async (payload) => {

            const ticketUrl = `${config.backendUrl}/api/ticket/${ticketId}`;

            const ticket = await fetch(ticketUrl, {
                method: 'GET',
                headers: {
                    Accept: 'application/JSON',
                    'Content-Type':'application/JSON',
                    Authorization: `Bearer ${jwtInStore}`,
                }
            });

            if(!ticket.ok) {
                throw new Error(`HTTP error, status ${ticket.status}`);
            }

            const ticketData = await ticket.json();

            return ticketData;
        },

    });

    return {
        ticket: queryResult.data,
        isGettingTicket: queryResult.isPending,
        ticketFetchError: queryResult.isError
    };
};