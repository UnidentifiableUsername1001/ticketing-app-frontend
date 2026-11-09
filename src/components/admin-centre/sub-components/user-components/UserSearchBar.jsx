import React, { useEffect, useState, useRef } from "react";


export function UserSearchBar({userList, setSelectedUser, query, setQuery}) {

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

    console.log(userList);

    return (
        <div
            ref={containerRef}
            className={
                `
                    flex flex-col relative
                    font-lato w-full
                `
            }
        >
            <input
                type="text"
                placeholder="Stary typing..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className={
                    `
                        outline-none h-full text-wiseGrey2 bg-wiseGrey4/30 rounded-md p-2 z-40

                    `
                }
            />
            {isFocused && (
                <ul
                    id="id-container"
                    className={`
                            z-50 absolute top-8 p-3 bg-wiseGrey5/30 w-full backdrop-blur-lg
                            flex flex-col gap-3 shadow-lg rounded-sm border border-wiseGrey4/20
                        `}
                >
                    {userList?.map((user) => (
                        <li 
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
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
                                    {user.firstName}
                                </span>
                                <span
                                    className={
                                        `
                                            
                                        `
                                    }
                                >
                                {user.lastName}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>                
            )}

        </div>
    )

}