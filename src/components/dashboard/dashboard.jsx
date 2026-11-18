import { TicketTable } from './sub-components/ticketTable';
import { jwtDecode } from 'jwt-decode';
import { useSearchParams } from 'react-router';
import { useTicketSearch, useGetAllTickets, useGetTicketViewCounts } from '../../hooks/ticket-fetch/useTickets';
import { SearchBar } from './sub-components/SearchBar';
import { ToastContext } from '../../context/toast-notification/ToastContext';
import { useContext } from 'react';

function Dashboard() {
    const [searchParams, setSearchParams] = useSearchParams({view: 'team'});
    const activeView = searchParams.get('view');
    const { addToast } = useContext(ToastContext);

    const { searchData, searching, searchError } = useTicketSearch(searchParams);
    const { counts, countError, counting } = useGetTicketViewCounts(); 
    const { isGettingTickets, tickets, errorGettingTickets } = useGetAllTickets();
    const decodedJwt = jwtDecode(sessionStorage.getItem('auth-token'));

    const ticketsForTable = activeView === 'team' ? tickets : searchData.results;

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
            <div className='grid grid-rows-[auto_1fr] gap-5 min-h-0 overflow-hidden py-5 mx-10'>

                {/* Views Section */}
                <div className='flex flex-row'>
                    <div>
                        <p
                            className={`
                                    font-lato text-sm text-wiseGrey3 mb-4
                                `}
                        >
                            Workspace / Create Issue
                        </p>
                        <h1 
                            className='font-lato font-extrabold text-wiseGrey1
                            text-4xl'>
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
                <div
                    className='
                                grid grid-cols-[auto_1fr] gap-5
                    '
                >
                    <div className='
                        flex flex-col bg-white rounded-2xl p-5 border border-wiseGrey4/25 gap-8
                    '> 
                        <h2
                            className='
                                text-xl font-bold font-lato
                            '
                        >
                            Stats
                        </h2>
                            <div
                                className='
                                    flex flex-col gap-4
                                '
                            >
                                {views.map((view) => (
                                    <div 
                                        key={views.indexOf(view)}
                                        onClick={() => setSearchParams(viewsParams(view))}
                                        className={
                                            `
                                                flex flex-row justify-between
                                                font-lato font-medium gap-10 py-2 px-4 rounded-lg
                                                cursor-pointer transition-all duration-150 hover:bg-wiseRose3/30
                                                ${activeView === view
                                                        ? 'bg-wiseRose4/50 text-wiseGrey2'
                                                        : 'bg-wiseRose5'
                                                    }
                                            `
                                        }
                                    >
                                        <h2
                                            
                                            className={
                                                `
                                                text- font-bold font-lato text-wiseGrey2 capitalize
                                                `
                                            }
                                        >
                                            {viewsText(view)}
                                        </h2>
                                        <p
                                            className={`
                                                font-extrabold text-wiseRose3 text-lg
                                            `}
                                        >
                                            {counts?.[view]?.[0]?.ticketCount ?? ''}
                                        </p>
                                    </div>
                                ))}
                            </div>
                                
                        </div>
                    {/* Ticket Table */}
                    <div 
                        className='
                            flex flex-col bg-white border border-wiseGrey4/20
                            rounded-2xl p-7 row-span-2 gap-6 flex-none
                            
                        '
                    >
                        <div className='flex flex-row gap-6 justify-between'>
                            <h1 
                                className='
                                    font-lato font-semibold
                                    text-xl text-wiseGrey1
                                '
                            >
                                {viewsText(activeView)}
                            </h1>
                            <SearchBar/>
                        </div>
                        <>
                            <TicketTable
                                tickets={ticketsForTable}
                            />
                        </>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Dashboard