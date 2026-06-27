import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/authContext';
import { TicketTable } from './sub-components/ticketTable';
import { jwtDecode } from 'jwt-decode';
import { useSearchParams } from 'react-router';
import { useTicketSearch } from '../../hooks/ticket-fetch/useTicketSearch';
import { useGetAllTickets } from '../../hooks/ticket-fetch/useGetAllTickets';
import { useGetTicketViewCounts } from '../../hooks/ticket-fetch/useGetTicketViewCounts';

function Dashboard() {

    const [searchParams, setSearchParams] = useSearchParams({view: 'team'});

    // Everything needed for initial render
    const activeView = searchParams.get('view');
    const departmentTickets = useGetAllTickets();
    const decodedJwt = jwtDecode(sessionStorage.getItem('auth-token'));

    const ticketCounts = useGetTicketViewCounts();

    // Everything needed for view change and re-render
    const ticketsFromQuery = useTicketSearch(searchParams);

    const ticketsForTable = activeView === 'team' ? departmentTickets : ticketsFromQuery.results;

    return (
        <div className='bg-wiseOffWhite min-h-screen'>
            <div className='grid grid-cols-14'>
                <div className='grid col-start-1 col-span-3'>
                    <div className='flex flex-col'>
                        <div className=''>
                            <h1 className='font-lato font-extrabold border-b border-gray-400/25 text-center text-2xl py-3'>Views</h1>
                        </div>
                        <div className='mt-10 grid gap-6'>
                            <div className='flex flex-row'>
                                <h2 onClick={() =>  setSearchParams({ view: 'team'})}
                                    className='dashboard-view-link'>
                                        Team tickets
                                </h2>
                                <p className='text-sm text-wiseOffWhite bg-wiseDarkPink px-2 py-0.5 rounded-full'>
                                    {ticketCounts?.team?.[0]?.ticketCount ?? 0}
                                </p>
                            </div>
                            <div className='flex flex-row'>
                                <h2 onClick={() =>  setSearchParams({ view: 'assigned', assignedTo: decodedJwt.user.id, status: ['Open', 'In progress'] })} className='dashboard-view-link'>My assigned tickets</h2>
                                <p className='text-sm text-wiseOffWhite bg-wiseDarkPink px-2 py-0.5 rounded-full'>
                                    {ticketCounts?.assigned?.[0]?.ticketCount ?? 0}
                                </p>
                            </div>
                            <div className='flex flex-row'>
                                <h2 onClick={() => setSearchParams({ view: 'raisedByUser', createdBy: decodedJwt.user.id, status: ['Open', 'In progress'] })
                                 } className='dashboard-view-link'>Tickets raised by me</h2>
                                <p className='text-sm text-wiseOffWhite bg-wiseDarkPink px-2 py-0.5 rounded-full'>
                                    {ticketCounts?.raisedByUser?.[0]?.ticketCount ?? 0}
                                </p>
                            </div>
                            <div className='flex flex-row'>
                                <h2 onClick={() =>  setSearchParams({ view: 'closed', status: 'Closed' })} className='dashboard-view-link'>Closed tickets</h2>
                                <p className='text-sm text-wiseOffWhite bg-wiseDarkPink px-2 py-0.5 rounded-full'>
                                    {ticketCounts?.closed?.[0]?.ticketCount ?? 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid col-start-4 col-span-10'>
                    <div className=''>
                        <h1 className='font-lato font-extrabold border-b border-gray-400/25 text-center text-2xl py-3'>All Tickets</h1>
                    </div>
                    <>
                        <TicketTable
                            tickets={ticketsForTable}
                        />
                    </>
                </div>
            </div>
        </div>
    );
}

export default Dashboard