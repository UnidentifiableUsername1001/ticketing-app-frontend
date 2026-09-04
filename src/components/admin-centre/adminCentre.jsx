import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import UserAmmend  from './sub-components/user-components/UserAmmend';
import { DepartmentAmend } from "./sub-components/department-components/DepartmentAmend";
import { faCubesStacked, faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function AdminCentre() {
    const [activeTab, setActiveTab] = useState('User');
    const renderActiveTab = () => {
        switch (activeTab){
            case 'User':
                return <UserAmmend/>
            case 'Department':
                return <DepartmentAmend/>
            case 'Global':
                return <GlobalSettings/>
        };
    };

    const notFocused = 'opacity-0 group-hover:opacity-100 group-hover:rounded-xl text-sm group-hover:shadow-lg group-hover:p-1 group-hover:z-50 transition-all delay-150 duration-150 group-hover:bg-wiseRose3 group-hover:text-wiseOffWhite'
    const focused = 'opacity-100 rounded-xl text-sm shadow-lg p-1 z-50 transition-all delay-150 duration-150 bg-wiseGrey1 text-wiseOffWhite'

    return (
        <div className="bg-wiseNavy5 min-h-screen flex flex-col">
            <div className="pt-5 flex flex-col items-center">
                <div className="">
                    <ul className="p-2 sticky flex flex-row gap-30 rounded-2xl">
                        <li onClick={() => setActiveTab('User')} className="group flex items-center justify-center relative cursor-pointer">
                            <FontAwesomeIcon icon={faCircleUser} 
                                className="text-3xl text-wiseGrey1 hover:text-wiseRose3 transition delay-75
                                duration-150 hover:scale-110"
                            />
                            <span 
                                className={`
                                    absolute top-full mt-3 whitespace-nowrap 
                                    text-wiseNavy5 ${activeTab === 'User' ? focused : notFocused} 
                                `}>
                                User Configuration
                            </span>
                        </li>
                        <li onClick={() => setActiveTab('Department')} className="group flex items-center justify-center relative cursor-pointer">
                            <FontAwesomeIcon icon={faCubesStacked} className="text-3xl text-wiseGrey1 hover:text-wiseRose3 transition delay-75
                                duration-150 hover:scale-110"/>
                            <span 
                                className={`
                                    absolute top-full mt-3 whitespace-nowrap 
                                    text-wiseNavy5 ${activeTab === 'Department' ? focused : notFocused} 
                                `}>
                                Department Configuration
                            </span>
                        </li>
                        <li onClick={() => setActiveTab('Global')} className="group flex items-center justify-center relative cursor-pointer">
                            <FontAwesomeIcon icon={faGlobe} className="text-3xl text-wiseGrey1 hover:text-wiseRose3 transition delay-75
                                duration-150 hover:scale-110"/>
                            <span 
                                className={`
                                    absolute top-full mt-3 whitespace-nowrap 
                                    text-wiseNavy5 ${activeTab === 'Global' ? focused : notFocused} 
                                `}>
                                Global Configuration
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="w-7/9 p-15 mt-5 bg-wiseOffWhite">
                    {renderActiveTab()}
                </div>
            </div>
        </div>
    )
};

