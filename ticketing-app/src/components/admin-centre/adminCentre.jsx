import React, {useState} from "react";
import { useAppContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { UserAmmend } from './sub-components/UserAmmend';
import { faCubesStacked, faGlobe } from "@fortawesome/free-solid-svg-icons";

function AdminCentre() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('users');
    const renderActiveTab = () => {
        switch (activeTab){
            case 'user':
                <UserAmmend/>
                break;
            case 'department':
                <DepartmentAmend/>
                break;
            case 'global':
                <GlobalSettings/>
                break;
        };
    };

    return (
        <div className="top-div">
            <div className="admin-nav-div">
                <ul>
                    <li onClick={() => setActiveTab('user')} className="">
                        <FontAwesomeIcon icon={faCircleUser}/>
                        <span className="hidden-text">Users</span>
                    </li>
                    <li onClick={() => setActiveTab('department')}>
                        <FontAwesomeIcon icon={faCubesStacked}/>
                        <span className="hidden-text">Department</span>
                    </li>
                    <li onClick={() => setActiveTab('global')}>
                        <FontAwesomeIcon icon={faGlobe}/>
                        <span className="hidden-text">Global Configuration</span>
                    </li>
                </ul>
            </div>
            <div className="sub-component">
                {renderActiveTab}
            </div>
        </div>
    )
};