import React, { useEffect, useMemo, useState, useContext, useRef } from "react";
import Fuse from 'fuse.js';
import { useGetAllTickets } from "../../../hooks/ticket-fetch/useTickets";
import { useSearchParams, useNavigate } from "react-router-dom";
import { RecentsContext } from "../../../context/sidebar-recents/RecentsContext";
import { useDebounce } from "../../../hooks/assorted/useDebounce";

export function SearchBar() {

    const { addRecent } = useContext(RecentsContext); 

    const navigate = useNavigate();

    const goToTicket = (ticketObj) => {

        setQuery('');
        setIsFocused(false);
        addRecent(ticketObj);
        navigate(`/ticket/${ticketObj._id}`);

    };

    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 200);

    const { isGettingTickets, tickets, errorGettingTickets } = useGetAllTickets('true');

    const fuse = useMemo(() => {
        return new Fuse(tickets, {
            useTokenSearch: true,
            tokenMatch: 'all',
            threshold: 0.4,
            keys: [
                'ticketNumber',
                'title',
                'description.bodyText',
                'ticketType',
                'status',
                'createdBy.firstName',
                'createdBy.lastName',
                'createdBy.email',
                'assignedTo.firstName',
                'assignedTo.lastName',
                'assignedTo.email',
                'followers.firstName',
                'followers.lastName',
                'followers.email',

            ],
        })
    }, [tickets])

    const results = debouncedQuery ? fuse.search(debouncedQuery) : [];

    const displayItems = results.length > 0
    ? results.map(({ item }) => item)
    : [];

    const htmlToString = (htmlString) => {

        const temp = document.createElement('span');
        temp.innerHTML = htmlString;
        
        const plainString = temp.textContent;

        const sliced = plainString.slice(0, 80) + "..."

        return plainString.length <= 80 
        ? plainString
        : sliced
    };

    const containerRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {

        if(!isFocused) return

        function handlePointerDown(event) {
            if (containerRef && !containerRef.current.contains(event.target)) {
                setIsFocused(false)
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);

        return () => document.removeEventListener('pointerdown', handlePointerDown)

    }, [isFocused])

    return (
        <div
            ref={containerRef}
            className={
                `
                    flex flex-col relative w-full
                    font-lato ml-24
                `
            }
        >
            <input
                type="text"
                placeholder="Search Tickets..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className={
                    `
                        outline-none h-full text-wiseGrey2 bg-wiseGrey4/30 rounded-md  px-4

                    `
                }
            />
            {isFocused && (
                <ul
                    id="id-container"
                    className={`
                            z-50 absolute top-12 p-3 bg-wiseGrey5/30 w-full backdrop-blur-lg
                            flex flex-col gap-3 shadow-lg rounded-sm
                        `}
                >
                    {displayItems.map((ticket) => (
                        <li 
                            key={ticket.ticketNumber}
                            onClick={() => goToTicket(ticket)}
                            className={`
                                    cursor-pointer transition-all duration-150 hover:bg-wiseRose4/50
                                    flex flex-col gap-2 p-2 rounded-t-sm border-b border-wiseGrey4/40
                                    
                                `}
                        >
                            <div
                                className={
                                    `
                                        flex flex-row gap-1 font-bold
                                    `
                                }
                            >
                                <span
                                    className={
                                        `
                                            
                                        `
                                    }
                                >
                                    {ticket.title}
                                </span>
                                <span
                                    className={
                                        `
                                            
                                        `
                                    }
                                >
                                - #{ticket.ticketNumber}
                                </span>
                            </div>
                            <span
                                className={`
                                        text-sm ml-3 italic
                                    `}
                            >
                                {htmlToString(ticket.description.bodyText)}
                            </span>
                            <span>
                                {}
                            </span>
                        </li>
                    ))}
                </ul>                
            )}

        </div>
    )

}