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

    return (
        <div className="bg-wiseNavy5 min-h-screen flex flex-col">
            <div className="flex flex-row flex-1 justify-center relative">
                <div className="fixed left-0 min-h-full pt-15">
                    <ul className="p-2 sticky grid gap-10 rounded-2xl">
                        <li onClick={() => setActiveTab('User')} className="group flex items-center justify-center relative cursor-pointer">
                            <FontAwesomeIcon icon={faCircleUser} 
                                className="text-3xl text-wiseNavy transition delay-150
                                duration-150 hover:scale-110"
                            />
                            <span 
                                className="absolute left-full ml-3 whitespace-nowrap bg-wiseNavy5 
                                text-wiseNavy5 group-hover:rounded-l-xl group-hover:rounded-r-sm text-sm group-hover:shadow-lg group-hover:p-1 group-hover:z-50
                                transition-all delay-150 duration-150 group-hover:bg-wiseNavy group-hover:text-wiseOffWhite">
                                User Configuration
                            </span>
                        </li>
                        <li onClick={() => setActiveTab('Department')} className="group flex items-center justify-center relative cursor-pointer">
                            <FontAwesomeIcon icon={faCubesStacked} className="text-3xl text-wiseNavy transition delay-150
                                duration-150 hover:scale-110"/>
                            <span 
                                className="absolute left-full ml-3 whitespace-nowrap bg-wiseNavy5 
                                text-wiseNavy5 group-hover:rounded-l-xl group-hover:rounded-r-sm text-sm group-hover:shadow-lg group-hover:p-1 group-hover:z-50
                                transition-all delay-150 duration-150 group-hover:bg-wiseNavy group-hover:text-wiseOffWhite">
                                Department Configuration
                            </span>
                        </li>
                        <li onClick={() => setActiveTab('Global')} className="group flex items-center justify-center relative cursor-pointer">
                            <FontAwesomeIcon icon={faGlobe} className="text-3xl text-wiseNavy transition delay-150
                                duration-150 hover:scale-110"/>
                            <span 
                                className="absolute left-full ml-3 whitespace-nowrap bg-wiseNavy5 
                                text-wiseNavy5 group-hover:rounded-l-xl group-hover:rounded-r-sm text-sm group-hover:shadow-lg group-hover:p-1 group-hover:z-50
                                transition-all delay-150 duration-150 group-hover:bg-wiseNavy group-hover:text-wiseOffWhite">
                                Global Configuration
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="w-5/9 p-15 mt-10 bg-wiseOffWhite border border-wiseGrey4">
                    <div className="mb-10 w-3/5 place-self-center p-3 text-center font-lato text-wiseGrey5 text-2xl font-medium bg-wiseNavy2">
                        <h1>{activeTab + ' ' + 'Configuration'}</h1>
                    </div>
                    {renderActiveTab()}
                </div>
            </div>
        </div>
    )
};

