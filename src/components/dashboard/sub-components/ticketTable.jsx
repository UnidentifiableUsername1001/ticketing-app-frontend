import React, { useState, useEffect, useContext } from 'react';
import { RecentsContext } from '../../../context/sidebar-recents/RecentsContext';
import { useNavigate } from 'react-router-dom';
import { calculateTimeElapsed } from '../../../hooks/assorted/ticketConstants';

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
                <div className="bg-red-300 rounded-xl text-sm w-fit px-3 justify-self-center py-1 text-center font-normal text-wiseGrey1">
                    {status}
                </div>);
        if (status === 'In progress') 
            return (
                <div className="bg-blue-300 rounded-xl w-fit px-3 py-1 text-sm justify-self-center  text-wiseGrey1 font-normal text-center">
                    Working
                </div>
            );
        if (status === 'Closed') 
            return (
                <div className="bg-gray-500 rounded-xl w-fit px-3 py-1 justify-self-center text-sm text-center font-normal text-wiseOffWhite">
                    {status}
                </div>);
    }

    return (
        <div className='overflow-auto'>
            <table 
                className='w-full text-left border-collapse'> 
                <thead 
                    className='
                    bg-wiseGrey4/25 rounded-2xl
                '>
                    <tr className='text-wiseGrey3/80 font-lato text-lg *:shrink-0'>
                        <th 
                            className='py-3 px-4' 
                            >
                            Ticket # / Subject
                        </th>
                        <th className='py-3 px-4'>
                            Status
                        </th>
                        <th className='py-3 px-4'>
                            Team
                        </th>

                        <th className='py-3 px-4'>
                            Assignee
                        </th>
                        <th className='py-3 px-4'>
                            Requested
                        </th>
                        <th className='py-3 px-4'>
                            Last Updated
                        </th>
                    </tr>
                </thead>
                <tbody className='font-lato font-[375] overflow-y-auto'>
                    {tickets?.length !== 0 ? (
                        <>
                            {tickets?.map((ticket, index) => (
                                <tr key={index} 
                                    onClick={() => {goToTicket(ticket)}} 
                                    className='
                                        border-b-2 border-wiseGrey4/35 
                                        hover:bg-wiseRose4/30 cursor-pointer 
                                        transition-colors duration-200 *:shrink-0'
                                    >
                                    <td className='py-4 px-4 flex flex-row gap-4'>
                                        <span
                                            className={`
                                                    font-bold
                                                `}
                                        >
                                            {ticket.ticketNumber}
                                        </span>
                                        <span
                                            className=''
                                        >
                                            {ticket.title}
                                        </span>
                                    </td>
                                    <td className='py-4 px-4'>
                                        {colorRender(ticket.status)}
                                    </td>
                                    <td className='py-4 px-4'>
                                        {ticket.departmentId.name}
                                    </td>

                                    {ticket.assignedTo ? (
                                        <td className='py-4 px-4'>
                                            {ticket.assignedTo.firstName + " " + ticket.assignedTo.lastName}
                                        </td> 
                                    ) : (
                                        <td className='py-3 px-4'>
                                                Unassigned
                                        </td>    
                                    )}
                                    <td className='py-3 px-4'>
                                        {new Date(ticket.createdAt).toString().slice(0, 10)}
                                    </td>
                                    <td className='py-3 px-4'>
                                        {calculateTimeElapsed(ticket.updatedAt)}
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