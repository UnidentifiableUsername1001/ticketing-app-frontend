import React, { useContext } from 'react';
import { RecentsContext } from './RecentsContext';
import { RecentLink } from './RecentLink';

export function RecentsContainer () {
    const { renderRecent } = useContext(RecentsContext);

    return (
        <>
            {renderRecent ? renderRecent.reverse().map((recent) => (
                <RecentLink key={recent._id} recentObj={recent}></RecentLink>
            )) : <>
                <p className='pt-4 font-lato text-sm text-wiseGrey3'>Nothing to show here...</p>
            </>}
        </>
    )
}