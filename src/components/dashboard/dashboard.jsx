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

    const views = ['team', 'assigned', 'raisedByUser', 'closed'];
    const viewsText = (view) => {
        return view === 'team' 
        ? 'Team tickets'
        : view === 'assigned'
        ? 'My assigned tickets'
        : view === 'raisedByUser' 
        ? 'Tickets raised by me'
        : 'Closed tickets'
    };
    const viewsParams = (view) => {
        return view === 'team' 
        ? {view: view}
        : view === 'assigned'
        ? { 
            view: 'assigned', 
            assignedTo: decodedJwt.user.id, 
            status: ['Open', 'In progress'] 
        }
        : view === 'raisedByUser' 
        ? { 
            view: 'raisedByUser', 
            createdBy: decodedJwt.user.id, 
            status: ['Open', 'In progress'] 
        }
        : { view: 'closed', status: 'Closed' }
    }

    return (
        <div className='bg-wiseOffWhite min-h-screen max-h-screen'>
            <div className='grid grid-cols-14'>
                <div className='grid col-start-1 col-span-3'>
                    <div className='flex flex-col'>
                        <div className='bg-wiseGrey1'>
                            <h1 
                                className='font-lato font-semibold text-wiseGrey5
                                pl-5 text-2xl py-3'>
                                Views
                            </h1>
                        </div>
                        <div className='mt-5 grid gap-3'>
                            {views.map((view) => (
                                <div 
                                    key={views.indexOf(view)}
                                    onClick={() => setSearchParams(viewsParams(view))}
                                    className={
                                        `
                                            dashboard-view-link
                                            cursor-pointer
                                            flex flex-row justify-between
                                            ${
                                                activeView === view 
                                                ? 'bg-wiseRose4/75 text-wiseRose1'
                                                : ''
                                            }
                                        `
                                    }
                                >
                                    <h2
                                        
                                        className={
                                            `
                                            `
                                        }
                                    >
                                        {viewsText(view)}
                                    </h2>
                                    <p
                                        className={`
                                            ${ticketCounts?.[view]?.[0]?.ticketCount
                                            ? 'text-sm text-wiseOffWhite bg-wiseRose3 px-2 py-0.5 rounded-full'
                                            : ''}
                                        `}
                                    >
                                        {ticketCounts?.[view]?.[0]?.ticketCount ?? ''}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div 
                    className='
                        grid col-start-4 col-span-11 max-h-screen min-h-screen w-full
                        content-start border-l border-wiseGrey1
                        
                    '
                >
                    <div className='bg-wiseGrey1'>
                        <h1 
                            className='
                                font-lato font-semibold ml-3
                                text-2xl py-3 text-wiseGrey5
                            '
                        >
                            {viewsText(activeView)}
                        </h1>
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