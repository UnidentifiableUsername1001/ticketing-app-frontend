import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '../../../config';
import { useAppContext } from '../../context/authContext';
import { useGetAllTickets } from '../../hooks/ticket-fetch/useGetAllTickets';

function Dashboard() {
    const allTickets = useGetAllTickets();

    const [renderedTickets, setRenderedTickets] = useState(allTickets);

    const navigate = useNavigate();

    const goToTicket = (ticketId) => {
        navigate(`/ticket/${ticketId}`);
    };

    const colorRender = (status) => {
        if (status === 'Open') return (<span className="bg-red-500 rounded-md p-1 text-wiseOffWhite">{status}</span>);
        if (status === 'In progress') return (<span className="bg-yellow-500 rounded-md p-1 text-bgMain">{status}</span>);
        if (status === 'Closed') return (<span className="bg-gray-500 rounded-md p-1 text-wiseOffWhite">{status}</span>);
    }

    return (
        <div className='bg-wiseOffWhite min-h-screen'>
            <div className='grid grid-cols-14'>
                <div className='grid col-start-1 col-span-3'>
                    <div className='flex flex-col'>
                        <div className=''>
                            <h1 className='font-lato font-extrabold border-b border-gray-400/25 text-center text-2xl py-3'>Views</h1>
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='pl-5 py-2 font-lato font-medium'>Some fake view title</h2>
                        </div>
                    </div>
                </div>
                <div className='grid col-start-4 col-span-10'>
                    <div className=''>
                        <h1 className='font-lato font-extrabold border-b border-gray-400/25 text-center text-2xl py-3'>All Tickets</h1>
                    </div>
                    <div className='table p-3 border-l border-gray-400/25'>
                        <table 
                            className='w-full text-left border-collapse'> 
                            <thead className=''>
                                <tr className='text-gray-500 font-bold font-lato text-xl border-b border-bgMain'>
                                    <th className='py-3 px-4'>Requester</th>
                                    <th className='py-3 px-4'>Title</th>
                                    <th className='py-3 px-4'>Assignee</th>
                                    <th className='py-3 px-4'>Status</th>
                                    <th className='py-3 px-4'>Requested</th>
                                </tr>
                            </thead>
                            <tbody className='font-lato font-light'>
                                {allTickets.map((ticket) => (
                                    <tr key={ticket._id} onClick={() => {goToTicket(ticket._id)}} className='border-b border-bgMain/25 hover:bg-wiseSkin/30 cursor-pointer transition-colors duration-200'>
                                        {ticket.status !== 'Closed' ? (
                                            <>
                                                <td className='py-3 px-4'>{ticket.createdBy.firstName + " " + ticket.createdBy.lastName}</td>
                                                <td className='py-3 px-4'>{ticket.title}</td>
                                                {ticket.assignedTo ? (
                                                    <td className='py-4 px-4'>{ticket.assignedTo.firstName + " " + ticket.assignedTo.lastName}</td> 
                                                ) : (
                                                    <td className='py-3 px-4'>Unassigned</td>    
                                                )}
                                                <td className='py-3 px-4'>{colorRender(ticket.status)}</td>
                                                <td className='py-3 px-4'>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                                            </>    
                                        ) : (<></>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard