import React, {useState} from "react";
import { useAppContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import UserAmmend  from './sub-components/UserAmmend';
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
        <div className="top-div">
            <div className="admin-nav-div">
                <ul>
                    <li onClick={() => setActiveTab('user')} className="cursor-pointer">
                        <FontAwesomeIcon icon={faCircleUser}/>
                        <span className="hidden-text">Users</span>
                    </li>
                    <li onClick={() => setActiveTab('department')} className="cursor-pointer">
                        <FontAwesomeIcon icon={faCubesStacked}/>
                        <span className="hidden-text">Department</span>
                    </li>
                    <li onClick={() => setActiveTab('global')} className="cursor-pointer">
                        <FontAwesomeIcon icon={faGlobe}/>
                        <span className="hidden-text">Global Configuration</span>
                    </li>
                </ul>
            </div>
            <div className="sub-component">
                {renderActiveTab()}
            </div>
        </div>
    )
};

