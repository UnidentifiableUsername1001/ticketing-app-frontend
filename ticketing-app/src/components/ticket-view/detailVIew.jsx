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
import { RichTextEditor } from '../tip-tap-text-editor/TipTap';
import { style1 } from '../../hooks/assorted/react-select-styles';

function DetailView() {

    const [ticketStatus, setTicketStatus] = useState({});
    const [draftStatus, setDraftStatus] = useState(null);

    const [assignedUser, setAssignedUser] = useState({});
    const [draftAssignee, setDraftAssignee] = useState(null);

    const [showCommentInput, setShowCommentInput] = useState(false);
    const [newComment, setNewComment] = useState(null);
    const navigate = useNavigate();

    const assignableUsers = useAssignableUsers();
    const statusOptions = statusMapping();

    const params = useParams();

    const { ticket, isGettingTicket, ticketFetchError } = useGetTicketById(params.ticketId);
    const { comments, isGettingComments, errorGettingComments } = useGetComments(params.ticketId);
    
    const handleSubmit = () => {

    }

    return (
        <div className='min-h-screen bg-wiseNavy5 pt-32'>
            <div className='grid grid-cols-20'>
                <div className='bg-wiseGrey5 col-span-8 col-start-4 col-end-13 p-8 border-l border-t border-b border-wiseGrey5 rounded-sm'>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-8'>
                            <h1 className='font-wise font-bold text-4xl'></h1>
                            <div className='grid gap-5'>
                                <h3 className='font-lato font-semibold text-1xl'>Description</h3>
                                <div className='border-l border-wiseGrey4'>{ticket?.description?.bodyText ? <ReadOnlyEditor inputText={ticket.description.bodyText}/> : 'Description loading...'}</div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-lato font-semibold text-1xl'>Comments</h3>

                        </div>
                        <div className='flex flex-col gap-8'>
                            {comments?.results && comments.results.length !== 0 ? comments.results.map((comment, index) => (
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
                                        <div className='font-lato border border-wiseSkin'>
                                            <ReadOnlyEditor inputText={comment.text}/>
                                        </div>                           
                                    </>) : (<></>)}
                                </div>
                            )) : (
                                <div className='text-wiseGrey4'>
                                    No comments to show...
                                </div>
                            )}
                            <div
                                onClick={() => setShowCommentInput(!showCommentInput)} 
                                className={`
                                    font-lato text-sm text-wiseGrey4 p-2 border border-wiseGrey4 
                                    cursor-text transition hover:text-wiseRose4 hover:border-wiseRose4
                                    ${showCommentInput ? 'hidden opacity-0' : 'block opacity-100'}`
                                }
                                >
                                Add comment...
                            </div>
                            <div className={`grid gap-5 ${showCommentInput ? 'block opacity-100' : 'hidden opacity-0'}`}>
                                <RichTextEditor stateFunc={setNewComment}/>
                                <button type='button' className='button1-no-width place-self-start w-24'>Save</button>
                            </div>
                        </div>
                    </div>    
                </div>
                <div className='sidebar relative col-span-5 col-start-13 p-8 border-r border-t border-b bg-wiseGrey5 border-wiseGrey5 rounded-br-sm rounded-tr-sm'>
                    <div className='flex flex-col gap-8'>
                        <div>
                            <h3 className='font-lato font-semibold text-1xl'>Status</h3>
                            <p className='font-lato font-light text-lg'>{ticket?.status ? ticket.status : 'Failed to load'}</p>
                        </div>
                        <div>
                            <h3 className='font-lato font-semibold text-1xl'>Assignee</h3>
                            <p className='font-lato font-light text-lg'>{ticket?.assignedTo ? ticket.assignedTo.firstName + " " + ticket.assignedTo.lastName : 'Unnassigned'}</p>
                        </div>
                        <form className='grid grid-cols-1 gap-8' onSubmit={handleSubmit}>
                            <div className=' font-lato grid gap-3 w-4/7 '>
                                <label htmlFor='assignedUser' className='font-lato font-semibold text-1xl'>Change assigned user?</label>
                                <Select
                                    unstyled
                                    value={draftAssignee}
                                    options={assignableUsers}
                                    onChange={(selectedOption) => setDraftAssignee(selectedOption)}
                                    classNames={style1} />
                            </div>
                            <div className='grid gap-3 w-4/7'>
                                <label htmlFor='status' className='font-lato font-semibold text-1xl'>Change status?</label>
                                    <Select
                                        unstyled
                                        value={draftStatus}
                                        options={statusOptions}
                                        onChange={(selectedOption) => setDraftStatus(selectedOption)}
                                        classNames={style1} />
                            </div>
                            <div className='absolute bottom-8 right-8'>
                                <button 
                                    type='submit' 
                                    className='button1-no-width w-32'>
                                        Submit
                                </button>
                            </div>
                        </form>
                    </div>    
                </div>
            </div>
        </div>
    );
}

export default DetailView;