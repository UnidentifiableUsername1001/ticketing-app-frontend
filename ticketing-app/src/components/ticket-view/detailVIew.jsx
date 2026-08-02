import React, { useState, useEffect } from 'react';
import { config } from '../../../config';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router';
import useAssignableUsers from '../../hooks/user-fetch-hooks/useGetAllUsers';
import { jwtDecode } from 'jwt-decode';
import { useAppContext } from '../../context/authContext';
import {statusMapping} from '../../hooks/assorted/ticketConstants';
import { useGetTicketById } from '../../hooks/ticket-fetch/useGetTicketById';
import { useAddComment } from '../../hooks/ticket-fetch/useAddComment';
import { useGetComments } from '../../hooks/ticket-fetch/useGetCommments';
import { ReadOnlyEditor } from './ReadOnlyEditor';

function DetailView() {

    const [ticketStatus, setTicketStatus] = useState({});
    const [draftStatus, setDraftStatus] = useState(null);

    const [assignedUser, setAssignedUser] = useState({});
    const [draftAssignee, setDraftAssignee] = useState(null);

    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();

    const assignableUsers = useAssignableUsers();
    const statusOptions = statusMapping();

    const params = useParams();

    const { ticket, isGettingTicket, ticketFetchError } = useGetTicketById(params.ticketId);
    const { comments, isGettingComments, errorGettingComments } = useGetComments(params.ticketId);
    
    const handleSubmit = () => {

    }

    return (
        <div className='min-h-screen bg-wiseOffWhite pt-32'>
            <div className='grid grid-cols-20'>
                <div className='bg-wiseOffWhite col-span-8 col-start-4 col-end-12 p-8 rounded-md shadow-md'>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-8'>
                            <h1 className='font-wise font-bold text-4xl'></h1>
                            <div className=''>
                                <h3 className='font-lato font-semibold text-1xl'>Description</h3>
                                <div className='description'>{ticket?.description?.bodyText ? <ReadOnlyEditor inputText={ticket.description.bodyText}/> : 'Description loading...'}</div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-lato font-semibold text-1xl'>Comments</h3>
                            <input 
                                type='text'
                                id='comment'
                                className='font-lato p-2 shadow-md border-b border-gray-400 rounded-b-md hover:bg-wiseSkin/15'
                                placeholder='Add a new comment'
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}/>
                        </div>
                        <div className='flex flex-col gap-8'>
                            {comments?.results ? comments.results.map((comment, index) => (
                                <div key={index} className=''>
                                    {comment ? (<>
                                        <h3>
                                            <span className='font-lato font-semibold text-1xl'>
                                                {comment.postedBy?.firstName + " " + comment.postedBy?.lastName + " "}
                                            </span>
                                            <span className='text-gray-500 font-lato italic pl-3 text-sm'>
                                                {new Date(comment.createdAt).toLocaleString()}
                                            </span>
                                        </h3>
                                        <div className='font-lato'>
                                            {comment.text}
                                        </div>                           
                                    </>) : (<></>)}
                                </div>
                            )) : (
                                <div>
                                    No comments to show...
                                </div>
                            )}
                        </div>
                    </div>    
                </div>
                <div className='sidebar col-span-4 col-start-13'>
                    <div className='flex flex-col gap-8'>
                        <div>
                            <h3 className='font-lato font-semibold text-1xl'>Status</h3>
                            <p className='font-lato font-light text-lg'>{ticket?.status ? ticket.status : 'Failed to load'}</p>
                        </div>
                        <div>
                            <h3 className='font-lato font-semibold text-1xl'>Assignee</h3>
                            <p className='font-lato font-light text-lg'>{ticket?.assignedTo ? ticket.assignedTo.firstName + " " + ticket.assignedTo.lastName : 'Unnassigned'}</p>
                        </div>
                        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor='assignedUser' className='font-lato font-semibold text-1xl'>Change assigned user?</label>
                                <Select
                                    value={draftAssignee}
                                    options={assignableUsers}
                                    onChange={(selectedOption) => setDraftAssignee(selectedOption)} />
                            </div>
                            <div>
                                <label htmlFor='status' className='font-lato font-semibold text-1xl'>Change status?</label>
                                    <Select
                                        value={draftStatus}
                                        options={statusOptions}
                                        onChange={(selectedOption) => setDraftStatus(selectedOption)} />
                            </div>
                            <button type='submit' className='admin-form-button'>Save</button>
                        </form>
                    </div>    
                </div>
            </div>
        </div>
    );
}

export default DetailView;