import React from "react";
import { useNavigate } from "react-router-dom";

export function RecentLink ({recentObj}) {

const navigate = useNavigate();    

return (
    <div 
        className="
            cursor-pointer text-wiseGrey5
            p-2 rounded-2xl
            transition-all
            hover:bg-wiseGrey2 hover:text-wiseRose4
            "
        onClick={() => navigate(`/ticket/${recentObj._id}`)}>
        <span>{recentObj.ticketNumber + " " + "- " ?? ""}</span>
        <span>{recentObj.title}</span>
    </div>
)

}