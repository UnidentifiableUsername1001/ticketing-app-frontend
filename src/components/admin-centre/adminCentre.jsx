import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faPeopleRoof, faUsersGear } from "@fortawesome/free-solid-svg-icons";

export default function AdminCentre({children}) {

    const decoded = jwtDecode(sessionStorage.getItem('auth-token'));
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState({
            title: 'People & access',
            body: 'Invite users and manage workspace access.',
            icon: faUsersGear,
            endpoint: '/admin-centre/users'
        })

    const availablePages = [
        {
            title: 'People',
            body: 'Invite users and manage workspace access.',
            icon: faUsersGear,
            endpoint: '/admin-centre/users'
        },
        {
            title: 'Teams',
            body: 'Define where requests go and who owns them.',
            icon: faPeopleRoof,
            endpoint: '/admin-centre/teams'
        },
        {
            title: 'Workspace',
            body: 'Manage company details and preferences.',
            icon: faDesktop,
            endpoint: '/admin-centre/workspace'
        }
    ];

    const onSelect = (link) => {
        setSelectedTab(link);
        navigate(link.endpoint);
    };

    return (
        <div className="bg-wiseRose5/25">
            <div className="grid grid-rows-[auto_1fr] py-5 mx-10">
                <div>
                    <p
                            className={`
                                    font-lato text-sm text-wiseGrey3 mb-4
                                `}
                        >
                            Workspace / 
                            {decoded.user.role === 'Admin'
                                ? ' Admin centre'
                                : ' Settings'
                            }
                        </p>
                        <h1 className='font-lato font-extrabold text-wiseGrey1 text-4xl'>
                            {
                                selectedTab?.title
                                ? selectedTab.title
                                : decoded.user.role === 'Admin' 
                                ? 'Administration, simplified'
                                : 'Settings'
                            }
                        </h1>
                        <p
                            className={`
                                    font-lato text-wiseGrey3 mt-2
                                `}
                        >
                            {decoded.user.role === 'Admin'
                                ? 'Manage the people, teams and rules behind every request.'
                                : ' Manage your workspace to your needs'
                            }
                        </p>
                </div>
                <div className={`
                        mt-5 grid grid-cols-[auto_1fr] gap-4
                    `}>
                    <ul className={`
                            bg-white gap-5 w-fit p-2 rounded-xl border border-wiseGrey4/25
                            flex flex-col h-fit
                        `}>
                        {availablePages.map((link) => (
                            <li key={availablePages.indexOf(link)}
                                onClick={() => onSelect(link)}
                                className={`
                                        text-wiseGrey1 text-xl cursor-pointer group relative
                                        
                                    `}
                            >
                                <FontAwesomeIcon
                                    icon={link.icon}
                                    
                                    className={`
                                            hover:bg-wiseGrey4/30 p-2 transition-all rounded-lg
                                            ${selectedTab?.title === link?.title
                                                ? 'bg-wiseGrey4/70'
                                                : ''
                                            }
                                        `}
                                />
                                <span
                                    className={`
                                            absolute whitespace-nowrap text-wiseGrey5 -ml-30 z-50
                                            px-3 py-1
                                            opacity-0 group-hover:opacity-100 group-hover:rounded-xl 
                                            text-sm group-hover:shadow-lg group-hover:ml-4 mt-1
                                            group-hover:z-50 transition-all 
                                            delay-500 duration-300 group-hover:bg-wiseGrey1 
                                        `}
                                >
                                    {link.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div
                        className={`
                                bg-white rounded-xl border border-wiseGrey4/25
                                p-7 relative
                            `}
                    >
                        <Outlet/>
                    </div>
                </div>
                
                {/* <div className={`
                        min-[900px]:min-w-160 mt-10
                    `}>
                    <ul className={`
                            grid min-[900px]:grid-cols-2 xl:grid-cols-3 gap-5 
                        `}>
                        {availablePages.map((link) => (
                            <li key={availablePages.indexOf(link)}
                                className={`
                                        bg-white rounded-xl border border-wiseGrey4/20
                                        px-6 pt-6 pb-10 max-[900px]:min-w-100 flex flex-row min-[900px]:flex-col gap-3
                                        max-[900px]:justify-between
                                    `}
                            >
                                <h2
                                    className="
                                        font-lato font-extrabold text-xl text-wiseGrey1
                                    "
                                >
                                    {link.title}
                                </h2>
                                <p
                                    className="
                                        font-lato text-wiseGrey3/90 max-[900px]:hidden
                                    "
                                >
                                    {link.body}
                                </p>
                                <button
                                    onClick={() => navigate(link.endpoint)}
                                    className="
                                        cursor-pointer px-4 py-2 w-40 rounded-lg bg-wiseRose4/35 font-lato text-sm
                                        font-extrabold transition duration-200 hover:bg-wiseGrey4 mt-20
                                    "
                                >
                                    Manage
                                </button>
                            </li>
                        ))}
                    </ul>
                </div> */}
            </div>
        </div>
    )
};

