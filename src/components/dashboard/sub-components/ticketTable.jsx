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
        if (status === 'Open') 
            return (
                <div className="bg-red-500 rounded-md p-1 text-sm w-1/2 text-center text-wiseOffWhite">
                    {status}
                </div>);
        if (status === 'In progress') 
            return (
                <div className="bg-blue-500 rounded-md p-1 text-sm  text-wiseGrey5 w-1/2  text-center">
                    Working
                </div>
            );
        if (status === 'Closed') 
            return (
                <div className="bg-gray-500 rounded-md py-1 text-sm w-1/2  text-center text-wiseOffWhite">
                    {status}
                </div>);
    }

    return (
        <div className=''>
            <table 
                className='w-full text-left border-collapse'> 
                <thead className=''>
                    <tr className='text-wiseGrey3 font-lato text-lg'>
                        <th className='py-3 px-4 underline underline-offset-2'>
                            Status
                        </th>
                        <th className='py-3 px-4 underline underline-offset-2'>
                            Requester
                        </th>
                        <th 
                            className='py-3 px-4 underline underline-offset-2' 
                            >
                            Title
                        </th>
                        <th className='py-3 px-4 underline underline-offset-2'>
                            Assignee
                        </th>
                        <th className='py-3 px-4 underline underline-offset-2'>
                            Requested
                        </th>
                        <th className='py-3 px-4 underline underline-offset-2'>
                            Updated
                        </th>
                    </tr>
                </thead>
                <tbody className='font-lato font-light overflow-y-auto'>
                    {tickets.length !== 0 ? (
                        <>
                            {tickets.map((ticket, index) => (
                                <tr key={index} 
                                    onClick={() => {goToTicket(ticket)}} 
                                    className='
                                        border-b border-wiseGrey1/25 
                                        hover:bg-wiseRose4/30 cursor-pointer 
                                        transition-colors duration-200'
                                    >
                                    <td className='py-2 px-4'>
                                        {colorRender(ticket.status)}
                                    </td>
                                    <td className='py-2 px-4'>
                                        {ticket.createdBy.firstName + " " + ticket.createdBy.lastName}
                                    </td>
                                    <td className='py-2 px-4'>
                                        {ticket.title}
                                    </td>
                                    {ticket.assignedTo ? (
                                        <td className='py-2 px-4'>
                                            {ticket.assignedTo.firstName + " " + ticket.assignedTo.lastName}
                                        </td> 
                                    ) : (
                                        <td className='py-2 px-4'>
                                                Unassigned
                                        </td>    
                                    )}
                                    <td className='py-2 px-4'>
                                        {new Date(ticket.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className='py-2 px-4'>
                                        {new Date(ticket.updatedAt).toLocaleDateString()}
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