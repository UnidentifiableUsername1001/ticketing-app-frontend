import React, {useState} from "react";
import { useAppContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import UserAmmend  from './sub-components/user-components/UserAmmend';
import { faCubesStacked, faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function AdminCentre() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('user');
    const renderActiveTab = () => {
        switch (activeTab){
            case 'user':
                return <UserAmmend/>
                break;
            case 'department':
                return <DepartmentAmend/>
                break;
            case 'global':
                return <GlobalSettings/>
                break;
        };
    };

    return (
        <div className="bg-wisePaleGrey min-h-screen flex flex-col">
            <div className="flex flex-row flex-1">
                <div className="relative left-15 min-h-full pt-30">
                    <ul className="p-2 sticky grid gap-5 rounded-2xl">
                        <li onClick={() => setActiveTab('user')} className="group flex items-center justify-center relative cursor-pointer">
                            <FontAwesomeIcon icon={faCircleUser} className="text-xl text-wiseNavy"/>
                            <span className="absolute left-full ml-3 hidden group-hover:block whitespace-nowrap bg-wiseNavy text-wiseOffWhite rounded-l-xl rounded-r-sm text-sm shadow-lg p-1 z-50">
                                User Config
                            </span>
                        </li>
                        <li onClick={() => setActiveTab('department')} className="group flex items-center justify-center relative cursor-pointer">
                            <FontAwesomeIcon icon={faCubesStacked} className="text-wiseNavy"/>
                            <span className="absolute left-full ml-3 hidden group-hover:block whitespace-nowrap bg-wiseNavy text-wiseOffWhite rounded-xl text-sm shadow-lg p-1 z-50">Department Config</span>
                        </li>
                        <li onClick={() => setActiveTab('global')} className="group flex items-center justify-center relative cursor-pointer">
                            <FontAwesomeIcon icon={faGlobe} className="text-wiseNavy"/>
                            <span className="absolute left-full ml-3 hidden group-hover:block whitespace-nowrap bg-wiseNavy text-wiseOffWhite rounded-xl text-sm shadow-lg p-1 z-50">Global Configuration</span>
                        </li>
                    </ul>
                </div>
                <div className="w-2/3 relative top-30 left-1/6 ">
                    {renderActiveTab()}
                </div>
            </div>
        </div>
    )
};

