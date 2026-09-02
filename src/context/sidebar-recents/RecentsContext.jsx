import React, { useState, createContext } from "react";

export const RecentsContext = createContext();

export function RecentsProvider ({children}) {

    const storageObject = JSON.parse(localStorage.getItem("recents"));

    const [renderRecent, setRenderRecent] = useState(storageObject?.array ?? []);

    const addRecent = (ticket) => {
        const indexOf = renderRecent?.findIndex((element) => element.ticketNumber === ticket.ticketNumber);

        const recentsArray = [...renderRecent];

        if (indexOf !== -1) {

            recentsArray.splice(indexOf, 1);
            recentsArray.push(ticket)

        } else if (indexOf === -1 && recentsArray.length !== 20) {

            recentsArray.push(ticket);

        } else if (indexOf === -1 && recentsArray.length === 20) {

            recentsArray.splice(0, 1)
            recentsArray.push(ticket)

        } 

        setRenderRecent([...recentsArray]);
        const newRecentsArr = JSON.stringify({array: renderRecent});
        localStorage.setItem("recents", newRecentsArr);
    }

    return (
        <RecentsContext.Provider value={{renderRecent, addRecent}}>
            {children}
        </RecentsContext.Provider>
    )

}