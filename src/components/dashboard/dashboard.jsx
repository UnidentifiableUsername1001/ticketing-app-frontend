import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/authContext';
import { TicketTable } from './sub-components/ticketTable';
import { jwtDecode } from 'jwt-decode';
import { Link, useSearchParams } from 'react-router';
import { useTicketSearch } from '../../hooks/ticket-fetch/useTicketSearch';
import { useGetAllTickets } from '../../hooks/ticket-fetch/useGetAllTickets';
import { useGetTicketViewCounts } from '../../hooks/ticket-fetch/useGetTicketViewCounts';
import { SearchBar } from './sub-components/SearchBar';

function Dashboard() {

    const [searchParams, setSearchParams] = useSearchParams({view: 'team'});

    // Everything needed for initial render
    const activeView = searchParams.get('view');
    const {
        isGettingTickets, 
        tickets,
        errorGettingTickets
    } = useGetAllTickets();
    const decodedJwt = jwtDecode(sessionStorage.getItem('auth-token'));

    const ticketCounts = useGetTicketViewCounts();

    // Everything needed for view change and re-render
    const ticketsFromQuery = useTicketSearch(searchParams);

    const ticketsForTable = activeView === 'team' ? tickets : ticketsFromQuery.results;

    const views = ['team', 'assigned', 'raisedByUser', 'closed'];
    const viewsText = (view, seq) => {
        return view === 'team' 
        ? "All Open Issues"
        : view === 'assigned'
        ? 'Assigned to Me'
        : view === 'raisedByUser' 
        ? 'Raised by Me'
        : 'Resolved Issues'
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
        <div className='bg-wiseRose5/25 h-full min-w-275'>
            <div className='grid grid-rows-[auto_1fr] gap-10 h-full py-5 mx-10'>

                {/* Views Section */}
                
                <div className='flex flex-col'>
                    <div className='flex flex-row just'>
                        <div>
                            <h1 
                                className='font-lato font-semibold text-wiseGrey1
                                text-3xl'>
                                Dashboard
                            </h1>
                            <p
                                className={`
                                        font-lato text- text-wiseGrey3 mt-2
                                    `}
                            >
                                A clear view of incoming work, ownership and progress.
                            </p>
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className='mt-10 grid grid-cols-4'>
                        {views.map((view) => (
                            <div 
                                key={views.indexOf(view)}
        
                                className={
                                    `
                                        flex flex-col justify-center px-8 py-5 gap-2 w-3/4
                                        font-lato font-medium mr-3 rounded-2xl bg-white border border-wiseGrey4/20
                                    `
                                }
                            >
                                <h2
                                    
                                    className={
                                        `
                                        text-xl font-bold font-lato text-wiseGrey2 capitalize
                                        `
                                    }
                                >
                                    {viewsText(view)}
                                </h2>
                                <p
                                    className={`
                                        font-extrabold text-wiseGrey2 text-4xl
                                    `}
                                >
                                    {ticketCounts?.[view]?.[0]?.ticketCount ?? '0'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ticket Table */}
                <div 
                    className='
                        flex flex-col min-h-75 w-full bg-white border border-wiseGrey4/20
                        rounded-2xl p-7 row-span-2 gap-6 flex-none
                        
                    '
                >
                    <div className='flex flex-col gap-6'>
                        <h1 
                            className='
                                font-lato font-semibold
                                text-xl text-wiseGrey1
                            '
                        >
                            {viewsText(activeView)}
                        </h1>
                        <div
                            className={`
                                    flex flex-row gap-4
                                `}
                        >
                            {views.map((view) => (
                                <button
                                    key={views.indexOf(view)}
                                    onClick={() => setSearchParams(viewsParams(view))}
                                    className={`
                                            ${activeView === view
                                                ? 'bg-wiseRose4 text-wiseGrey2'
                                                : 'bg-wiseGrey4/50 text-wiseGrey2/88'
                                            }
                                            px-4 py-2 rounded-lg cursor-pointer transition-all duration-150
                                            hover:bg-wiseRose3/30
                                            font-semibold flex-none
                                        `}
                                >
                                    {viewsText(view)}
                                </button>
                            ))}
                            <SearchBar/>
                        </div>
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