import React from "react";
import { useNavigate } from "react-router-dom";

export function RecentLink ({recentObj}) {

const navigate = useNavigate();

const titleCutOff = (title) => {
        
    const sliced = title.slice(0, 25) + "..."

        return title.length <= 25 
        ? title
        : sliced
}

return (
    <div 
        className="
            cursor-pointer text-wiseGrey5/80
            px-2 py-2  rounded-md font-lato
            transition-all
            hover:bg-wiseRose4/30 hover:text-wiseRose4
            "
        onClick={() => navigate(`/ticket/${recentObj._id}`)}>
        <span>{recentObj.ticketNumber + " " + "- "}</span>
        <span>{titleCutOff(recentObj.title)}</span>
    </div>
)

}