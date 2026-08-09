import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useAppContext } from '../../../context/authContext';
import { useAddComment } from '../../../hooks/ticket-fetch/useAddComment';
import { useGetComments } from '../../../hooks/ticket-fetch/useGetCommments';
import { ReadOnlyEditor } from './ReadOnlyEditor';
import { RichTextEditor } from '../../tip-tap-text-editor/TipTap';
import { useQueryClient } from '@tanstack/react-query';

export function NewComment({mentionsStateFunc, urlParams}) {

    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();

    const [showCommentInput, setShowCommentInput] = useState(false);
    const [newComment, setNewComment] = useState(null);
    
    const { comments, isGettingComments, errorGettingComments } = useGetComments(urlParams, searchParams);
    const { addComment, isAdding, errorAdding, commentAdded } = useAddComment();

    const queryClient = useQueryClient();

    const pageSelect = (event) => {
        setSearchParams({page: event.target.value});
    }

    let pageNumArr = [];

    if(comments?.totalPages) {
        let n = 0
        while(n < comments?.totalPages) {
            n++
            pageNumArr.push(n)
        };
    }

    const handleCommentSubmit = async () => {
            const parser = new DOMParser();
            const parsedBody = parser.parseFromString(newComment, 'text/html');

            const idArr = parsedBody.querySelectorAll('[data-id]');

            const mentionIds = Array.from(idArr).map(node => node.getAttribute('data-id'));

            mentionsStateFunc(mentionIds);

            let payload = {
                bodyText: newComment,
                mentions: mentionIds
            };

            addComment(payload, {
                onSuccess: () => {
                    setNewComment(null)
                    setShowCommentInput(!showCommentInput)
                }
            });
        };
    
    return (
        <div className='grid gap-5'>
            <div className='flex flex-col gap-2'>
                <h3 className='font-lato font-semibold text-1xl'>Comments</h3>
            </div>
            <div
                onClick={() => setShowCommentInput(!showCommentInput)} 
                className={`
                    font-lato text-sm text-wiseGrey4 p-2 h-18 border border-wiseGrey4 
                    cursor-text transition hover:text-wiseRose4 hover:border-wiseRose4
                    ${showCommentInput ? 'hidden opacity-0' : 'block opacity-100'}`
                }
                >
                Add comment...
            </div>
            <div className={`grid gap-5 ${showCommentInput ? 'block opacity-100' : 'hidden opacity-0'}`}>
                <RichTextEditor stateFunc={setNewComment}/>
                <div className='relative'>
                    <button 
                        type='button'
                        onClick={handleCommentSubmit} 
                        className='button1-no-width left-0 w-40'>
                            Save Comment
                    </button>
                    <button 
                        type='button'
                        onClick={() => setShowCommentInput(!showCommentInput)} 
                        className='button2-no-width right-0 w-20 absolute'>
                            Close
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-3 mt-10'>
                <div className={`flex justify-center col-start-2`}>
                    <div className='flex'>
                        <button 
                            className='page-number-button2'
                            type='button' 
                            value={pageNumArr[0]} 
                            onClick={(e) => pageSelect(e)}>
                                {`<< First`}
                        </button>
                    </div>
                    {comments?.totalPages && pageNumArr !== null ? pageNumArr.map((page, index) => (
                        <>
                            <div className='' key={index}>
                                <button 
                                    className='page-number-button'
                                    type='button' 
                                    value={page} 
                                    onClick={(e) => pageSelect(e)}>
                                        {page}
                                </button>
                            </div>
                        </>
                    )) : (<>
                    
                    </>)}
                    <div className='flex'>
                        <button 
                            className='page-number-button2'
                            type='button' 
                            value={comments?.totalPages} 
                            onClick={(e) => pageSelect(e)}>
                                {`Last >>`}
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col p-2 gap-8 outline-3 outline-wiseNavy5 outline-offset-4 overflow-auto max-h-128'>

                {comments?.results && comments.results.length !== 0 ? comments.results.map((comment, index) => (
                    <div key={index} className='bg-wiseGrey5 border border-wiseNavy5 p-3 '>
                        {comment ? (<>
                            <div className=''>
                                <span className='font-lato font-medium text-1xl border-b border-wiseGrey4'>
                                    {comment.postedBy?.firstName + " " + comment.postedBy?.lastName + " "}
                                </span>
                                <span className='text-gray-500 font-lato italic pl-3 text-xs border-b border-wiseGrey4'>
                                    {new Date(comment.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <div className='font-lato bg-wiseOffWhite'>
                                <ReadOnlyEditor inputText={comment.bodyText}/>
                            </div>                           
                        </>) : (<></>)}
                    </div>
                )) : (
                    <div className='text-wiseGrey4'>
                        No comments to show...
                    </div>
                )}
            </div>
        </div>
    )
}