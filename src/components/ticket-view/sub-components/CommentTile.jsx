import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useGetComments, useAddComment } from '../../../hooks/ticket-fetch/useTickets';
import { ReadOnlyEditor } from './ReadOnlyEditor';
import { RichTextEditor } from '../../tip-tap-text-editor/TipTap';

export function NewComment({mentionsStateFunc, urlParams}) {

    const [searchParams, setSearchParams] = useSearchParams();

    const [showCommentInput, setShowCommentInput] = useState(false);
    const [newComment, setNewComment] = useState(null);
    
    const { comments, isGettingComments, errorGettingComments } = useGetComments(searchParams);
    const { addComment, isAdding, errorAdding, commentAdded } = useAddComment();

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
            <div className='flex flex-col gap-8 overflow-auto max-h-114'>
                {comments?.results && comments.results.length !== 0 ? comments.results.map((comment, index) => (
                    <div key={index} className='border-b-2 border-wiseGrey4/30'>
                        {comment ? (<>
                            <div className=''>
                                <span className='font-lato font-semibold'>
                                    {comment.postedBy?.firstName + " " + comment.postedBy?.lastName + " "}
                                </span>
                                <span className='pl-2'>/</span>
                                <span className='text-wiseGrey3 font-lato italic pl-2 text-sm'>
                                    {new Date(comment.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <div className='font-lato'>
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
            <div className='grid grid-cols-3'>
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
            <div
                onClick={() => setShowCommentInput(!showCommentInput)} 
                className={`
                    font-lato text-wiseGrey3/80 p-4 h-30 border border-wiseGrey4/30 
                    cursor-text transition hover:text-wiseRose4 hover:border-wiseRose4
                    rounded-lg bg-wiseRose5/50
                    ${showCommentInput ? 'hidden opacity-0' : 'block opacity-100'}`
                }
                >
                Write a reply...
            </div>
            <div className={`grid gap-5 ${showCommentInput ? 'block opacity-100' : 'hidden opacity-0'}`}>
                <RichTextEditor stateFunc={setNewComment}/>
                <div className='flex flex-row justify-between'>
                    <button 
                        type='button'
                        onClick={() => setShowCommentInput(!showCommentInput)} 
                        className='button2-no-width w-40'>
                            Close
                    </button>
                    <button 
                        type='button'
                        onClick={handleCommentSubmit} 
                        className='button1-no-width w-40'>
                            Save Comment
                    </button>
                </div>
            </div>

        </div>
    )
}