import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router';
import useAssignableUsers from '../../hooks/user-fetch-hooks/useGetAllUsers';
import { jwtDecode } from 'jwt-decode';
import {statusMapping} from '../../hooks/assorted/ticketConstants';
import { useGetTicketById } from '../../hooks/ticket-fetch/useGetTicketById';
import { ReadOnlyEditor } from './sub-components/ReadOnlyEditor';
import { style1 } from '../../hooks/assorted/react-select-styles';
import { NewComment } from './sub-components/CommentTile';
import { useUpdateTicketMeta } from '../../hooks/ticket-fetch/useUpdateTicketMeta';
import { calculateTimeElapsed } from '../../hooks/assorted/ticketConstants';

function DetailView() {

    const [ticketStatus, setTicketStatus] = useState({});
    const [draftStatus, setDraftStatus] = useState(null);

    const [assignedUser, setAssignedUser] = useState({});
    const [draftAssignee, setDraftAssignee] = useState(null);

    const [newFollowers, setNewFollowers] = useState(null);

    const assignableUsers = useAssignableUsers();
    const statusOptions = statusMapping();

    const navigate = useNavigate();
    const params = useParams();

    const { ticket, isGettingTicket, ticketFetchError } = useGetTicketById(params.ticketId);
    const { updateTicket, ticketUpdating, ticketUpdated, errorUpdatingTicket } = useUpdateTicketMeta()

    const decodedJwt = jwtDecode(sessionStorage.getItem('auth-token'));
    const canEditMetaData = decodedJwt.user.department === ticket?.departmentId?._id || decodedJwt.user.role === 'Admin';

    const handleMetaSubmit = (e) => {

        let payload = {
            assignedUser: draftAssignee?.value,
            status: draftStatus?.value,
            follower: newFollowers
        };

        updateTicket(payload, {
             onSuccess: () => navigate('/dashboard')
        });

    }

    if (isGettingTicket) {
        return (
            <div className='flex items-center justify-center h-full bg-wiseRose5/25'>
                <p className='font-lato text-wiseGrey3 text-lg animate-pulse'>
                    Loading ticket details...
                </p>
            </div>
        );
    }

    if (ticketFetchError || !ticket) {
        return (
            <div className='flex flex-col items-center justify-center h-full gap-4 bg-wiseRose5/25'>
                <p className='font-lato text-wiseGrey1 font-semibold text-xl'>
                    Unable to load ticket
                </p>
                <p className='font-lato text-wiseGrey3 text-sm'>
                    {ticketFetchError?.message || 'The requested ticket could not be found.'}
                </p>
                <button 
                    onClick={() => navigate('/dashboard')}
                    className='button1-no-width px-4 py-1.5'
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className='h-full bg-wiseRose5/25 min-w-275'>
            <div 
                className='
                    grid grid-rows-[auto_1fr]
                    py-5 mx-10
                    '>

                {/* Title and initial meta data */}
                <div className='flex flex-row justify-between'>
                    <div
                        className='flex flex-col'
                    >
                        <p
                            className={`
                                    font-lato text-sm text-wiseGrey3 mb-4
                                `}
                        >
                            Workspace / Issue Details
                        </p>
                        <h1 className='font-lato font-extrabold text-wiseGrey1 text-4xl'>
                            {ticket?.title ? ticket.title : 'No title'}
                        </h1>
                        <p
                            className={`
                                    font-lato text-wiseGrey3 mt-2
                                `}
                        >
                        Issue #{ticket?.ticketNumber + ' '}
                            - Created by {
                                ticket?.createdBy?.firstName 
                                + ' ' 
                                + ticket?.createdBy?.lastName[0] +'.' 
                                + ' ' 
                                + '-' 
                                + ' '  
                                + calculateTimeElapsed(ticket?.updatedAt)}
                        </p>
                    </div>
                    <div className='content-end'>
                            <button 
                                type='button'
                                onClick={() => handleMetaSubmit()}
                                className={`
                                        ${ticketUpdating
                                            ? 'button1-loading w-32 h'
                                            : 'button1-no-width w-32'
                                        }
                                    `}
                            >
                                    {ticketUpdating 
                                        ? (
                                            <span>Saving...</span>
                                        ) 
                                        : (
                                            <span>Submit</span>
                                        )}
                            </button>
                    </div>
                </div>

                {/* Meta data editing and submission */}
                <div 
                    className={`
                        grid grid-cols-[auto_0.5fr] gap-10
                        mt-10
                    `}>

                    <div 
                        className={`
                            grid gap-3 min-w-130
                            bg-white p-9 rounded-2xl
                        `}>
                        <h3 className='font-lato font-semibold text-xl'>Conversation</h3>
                        <div className='overflow-auto h-fit border-b-4 border-wiseGrey4/30'>
                            {ticket?.description?.bodyText 
                            ? <ReadOnlyEditor inputText={ticket?.description?.bodyText}/> 
                            : 'Description loading...'}
                        </div>
                        <NewComment 
                            urlParams={params.ticketId}
                            mentionsStateFunc={setNewFollowers} />
                    </div>
                    
                    {/* Meta Data */}
                    <div 
                        className={`
                            inner-outer-most flex flex-col gap-8
                            bg-white p-9 rounded-2xl h-fit min-w-75
                        `}>
                        <h1
                            className={`
                                   font-lato text-2xl font-bold 
                                `}
                        >
                            Issue Details
                        </h1>
                        <div className='grid gap-3'>
                            <h3 className='font-lato font-semibold text-lg'>Department</h3>
                            <p className='
                                font-lato font-light
                                bg-wiseRose5 p-3 rounded-lg
                            '>
                                {ticket?.departmentId?.name}
                            </p>
                        </div>
                        <div className='grid gap-3'>
                            <h3 className='font-lato font-semibold text-lg'>
                                Request Type
                            </h3>
                            <p className='
                                font-lato font-light
                                bg-wiseRose5 p-3 rounded-lg
                            '>
                                {ticket?.ticketType}
                            </p>
                        </div>
                        <div className='grid gap-3'>
                            <h3 className='font-lato font-semibold text-lg'>Status</h3>
                            <p className='
                                font-lato font-light
                                bg-wiseRose5 p-3 rounded-lg
                            '>
                                {ticket?.status}
                            </p>
                        </div>
                        <div
                            className='flex flex-col gap-2'
                        >
                            <h3 className='font-lato font-semibold text-lg'>
                                Assignee
                            </h3>
                            <p className='
                                font-lato font-light
                                bg-wiseRose5 p-3 rounded-lg
                            '>
                                {ticket?.assignedTo 
                                    ? ticket?.assignedTo?.firstName + " " + ticket?.assignedTo?.lastName 
                                    : 'Unnassigned'}
                            </p>
                        </div>

                        {/* quasi-form for meta data editing and submission */}
                        {canEditMetaData
                            ? (
                                <div className=' font-lato grid gap-3'>
                                    <label htmlFor='assignedUser' className='font-lato font-semibold text-lg'>
                                        Change assigned user?
                                    </label>
                                    <Select
                                        unstyled
                                        value={draftAssignee}
                                        options={assignableUsers}
                                        onChange={(selectedOption) => setDraftAssignee(selectedOption)}
                                        classNames={style1} />
                                </div>
                            )
                            : (<></>)
                        }
                        {canEditMetaData
                            ? (
                                <div className='grid gap-3'>
                                    <label htmlFor='status' className='font-lato font-semibold text-lg'>
                                        Change status?
                                    </label>
                                    <Select
                                        unstyled
                                        value={draftStatus}
                                        options={statusOptions}
                                        onChange={(selectedOption) => setDraftStatus(selectedOption)}
                                        classNames={style1} />
                                </div>   
                            )
                            : (<></>)
                        }
                    </div>    
                </div>
            </div>
        </div>
    );
}

export default DetailView;