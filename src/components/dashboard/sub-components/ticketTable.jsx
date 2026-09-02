import React, { useState, useEffect, useContext } from 'react';
import { RecentsContext } from '../../../context/sidebar-recents/RecentsContext';
import { useNavigate } from 'react-router-dom';
import { sortIcon1, sortIcon2 } from '../../../hooks/assorted/react-icons';

export function TicketTable({tickets}) {

    const { addRecent } = useContext(RecentsContext); 

    const navigate = useNavigate();

    const goToTicket = (ticketObj) => {

        addRecent(ticketObj);

        navigate(`/ticket/${ticketObj._id}`);
    };

    const headerHover = (bool) => {
        if(bool === true) {
            return 'opacity-100';
        }
        
        return 'opacity-0'
    }

    const colorRender = (status) => {
        if (status === 'Open') return (<span className="bg-red-500 rounded-md p-1 text-wiseOffWhite">{status}</span>);
        if (status === 'In progress') return (<span className="bg-yellow-500 rounded-md p-1 text-bgMain">{status}</span>);
        if (status === 'Closed') return (<span className="bg-gray-500 rounded-md p-1 text-wiseOffWhite">{status}</span>);
    }

    return (
        <div className='table border-gray-400/25'>
            <table 
                className='w-full text-left border-collapse'> 
                <thead className=''>
                    <tr className='text-gray-500 font-bold font-lato text-xl border-b border-bgMain'>
                        <th className='py-3 px-4' >
                            Requester
                        </th>
                        <th 
                            className='py-3 px-4 flex flex-row' 
                            >
                            Title
                        </th>
                        <th className='py-3 px-4'>
                            Assignee
                        </th>
                        <th className='py-3 px-4'>
                            Status
                        </th>
                        <th className='py-3 px-4'>
                            Requested
                        </th>
                    </tr>
                </thead>
                <tbody className='font-lato font-light'>
                    {tickets.length !== 0 ? (
                        <>
                            {tickets.map((ticket, index) => (
                                <tr key={index} onClick={() => {goToTicket(ticket)}} className='border-b border-bgMain/25 hover:bg-wiseSkin/30 cursor-pointer transition-colors duration-200'>
                                    <td className='py-3 px-4'>{ticket.createdBy.firstName + " " + ticket.createdBy.lastName}</td>
                                    <td className='py-3 px-4'>{ticket.title}</td>
                                    {ticket.assignedTo ? (
                                        <td className='py-4 px-4'>{ticket.assignedTo.firstName + " " + ticket.assignedTo.lastName}</td> 
                                    ) : (
                                        <td className='py-3 px-4'>
                                            Unassigned
                                    </td>    
                                    )}
                                    <td className='py-3 px-4'>
                                        {colorRender(ticket.status)}
                                    </td>
                                    <td className='py-3 px-4'>
                                        {new Date(ticket.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </>    
                    ) : (<>
                        <tr>
                            <td></td>
                            <td></td>
                            <td className='py-10'>No tickets to show in this view</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </>)
}
                </tbody>
            </table>
        </div>
    )
}