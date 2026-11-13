import { useState, useRef, useEffect } from 'react';
import { useFuseSearch } from '../../../../hooks/assorted/useFuseSearch';
import { useGetAllUsers } from '../../../../hooks/user-fetch-hooks/useUsers';
import { UserSearchBar } from './UserSearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NewUserForm } from './newUserForm';

export function AdminUsers() {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectUser, setSelectUser] = useState(null);
    const [bulkUser, setBulkUser] = useState([]);
    const fuseKeys = [
        'jobTitle',
        'firstName',
        'lastName',
        'email',
        'departmentId.name',
        'departmentId',
        'role'
    ];
    const [formOverlay, setFormOverlay] = useState('');

    // Placeholder delete and edit functions for const action
    const deleteUser = () => {

    }

    const editUser = () => {

    }

    const actions = [
        {
            title: 'Edit',
            function: editUser
        },
        {
            title: 'Delete',
            function: deleteUser
        },
        {
            title: 'Force Password Reset',
            function: editUser
        },
    ]

    const { allUsers, allUsersError, allUsersPending } = useGetAllUsers();

    const searchResults = useFuseSearch(allUsers, searchQuery, fuseKeys);

    const containerRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    const checkboxSelect = (user) => {
        let arrayCopy = [...bulkUser];
        
        if(arrayCopy.includes(user)) {
            return setBulkUser(arrayCopy.toSpliced(arrayCopy.indexOf(user), 1));
        }

        arrayCopy.push(user);

        return setBulkUser(arrayCopy);

    };

    const hamburgerClick = (user) => {
        setSelectUser(user);
        setIsFocused(true);  
    };

    useEffect(() => {

        if(!isFocused) return

        function handlePointerDown(event) {
            if (containerRef && !containerRef.current.contains(event.target)) {
                setIsFocused(false)
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);

        return () => document.removeEventListener('pointerdown', handlePointerDown)

    }, [isFocused])

    return (
        <div
            className={`
                    h-full w-full grid grid-rows-[auto_1fr] gap-8 font-lato 
                `}
        >
            <div
                className={`
                        ${formOverlay !== ''
                            ? `transition all absolute inset-0 z-50 bg-wiseGrey5/20 rounded-xl backdrop-blur-xs
                                
                            `
                            : 'hidden'
                        }
                    `}
            >
                <NewUserForm
                    closeForm={setFormOverlay}
                />
            </div>
            <div
                className={`
                        flex flex-row justify-between
                    `}
            >
                <div
                    className={`
                            flex flex-col gap-2 min-w-125
                        `}
                >
                    <h2
                        className='
                            font-lato font-semibold
                        '
                    >
                        Search Users
                    </h2>
                    <UserSearchBar
                        userList={searchResults}
                        setSelectedUser={setSelectUser}
                        query={searchQuery}
                        setQuery={setSearchQuery} />
                </div>
                <div
                    className={`
                            self-end flex flex-row gap-6
                        `}
                >
                    {bulkUser && bulkUser?.length > 0 
                        ? (
                            <div
                                className={`
                                        flex flex-row self-center gap-8
                                        py-2 px-4 rounded-sm text-wiseGrey1
                                    `}
                            >
                                <p
                                    className='font-bold'
                                >
                                    {bulkUser?.length} Selected
                                </p>
                                <p
                                    className='
                                        text-wiseRose3 cursor-pointer hover:text-wiseRose2
                                    '   
                                >
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                    /> 
                                    Edit
                                </p>
                                <p
                                    className='
                                        text-wiseRose3 cursor-pointer hover:text-wiseRose2
                                    '
                                >
                                    <FontAwesomeIcon 
                                        icon={faTrash}
                                    /> 
                                    Delete
                                </p>
                            </div>
                        )
                        : (<></>)
                    }   
                    
                    <button
                        onClick={() => setFormOverlay('new')}
                        className={`
                                button1-no-width w-40 font-semibold
                            `}
                    >
                        Add user
                    </button>
                </div>
            </div>
            <div
                className=''
            >
                <table
                    className='w-full text-left border-collapse'
                >
                    <thead
                        className='bg-wiseRose4/25 sticky'
                    >
                        <tr
                            className='text-wiseGrey3 font-lato *:shrink-0'
                        >
                            <th
                                className='
                                    px-3 py-2 max-w-5
                                '
                            >
                                Select
                            </th>
                            <th
                                className='
                                    px-3 py-2
                                '
                            >
                                Name
                            </th>
                            <th
                                className='
                                    px-3 py-2
                                '
                            >
                                Email  
                            </th>
                            <th
                                className='
                                    px-3 py-2
                                '
                            >
                                Department
                            </th>
                            <th
                                className='
                                    px-3 py-2
                                '
                            >
                                Role
                            </th>
                            <th
                                className='
                                    px-3 py-2
                                '
                            >
                                Actions
                            </th>
                        </tr>

                    </thead>
                    <tbody
                        className='overflow-y-auto'
                    >
                        {allUsers?.length !== 0 ? (
                            <>
                                {allUsers?.map((user, index) => (
                                    <tr key={index}  
                                        className={`
                                            border-b-2 border-wiseGrey4/35 
                                            *:shrink-0 transition-all
                                            ${bulkUser?.includes(user)
                                                ? 'bg-wiseRose3/20'
                                                : ''
                                            }
                                        `}
                                        >
                                        <td className='py-4 px-4'>
                                            <input
                                                type='checkbox'
                                                className='
                                                     
                                                    w-5 h-5 accent-wiseRose4
                                                '
                                                onClick={() => checkboxSelect(user)}
                                            />
                                        </td>
                                        <td 
                                            className='
                                                py-2 px-3
                                                font-semibold         
                                        '>
                                            {user.firstName + ' ' + user.lastName}
                                            
                                        </td>
                                        <td className='py-2 px-3'>
                                            {user.email}
                                        </td>
                                        <td className='py-2 px-3'>
                                            {user?.departmentId?.name }
                                        </td>
                                        <td className='py-2 px-3'>
                                            {user.role}
                                        </td>
                                        <td 
                                            className='py-2 px-3 relative'
                                            ref={containerRef}
                                            
                                        >
                                            <FontAwesomeIcon
                                                icon={faBars}
                                                onClick={() => hamburgerClick(user)}
                                                className='
                                                    cursor-pointer transition-all hover:scale-110
                                                    text-wiseGrey1
                                                ' 
                                            />
                                            <div
                                                className={`
                                                    absolute bg-white border border-wiseGrey4/30 shadow-md z-50
                                                    gap-2 flex flex-col rounded-md min-w-fit top-5 -right-3
                                                    ${isFocused && selectUser?._id === user?._id
                                                        ? ''
                                                        : 'hidden'
                                                    }
                                                `}
                                            >
                                                {actions.map((action, index) => (
                                                    <p 
                                                        key={index}
                                                        onClick={() => action.function(user)}
                                                        className='
                                                            border-b border-wiseGrey4/40 hover:bg-wiseRose5
                                                            p-2 transition-all cursor-pointer text-sm font-semibold
                                                        '
                                                    >
                                                        {action.title}
                                                    </p>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </>    
                            ) : (<>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className='py-10'>No tickets to show in this view</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

