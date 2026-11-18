import { useState, useRef, useEffect, useContext } from 'react';
import { useFuseSearch } from '../../../../hooks/assorted/useFuseSearch';
import { useGetAllUsers, useUpdateUser, useDeleteUser } from '../../../../hooks/user-fetch-hooks/useUsers';
import { UserSearchBar } from './UserSearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPenToSquare, faTrash, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { NewUserForm } from './newUserForm';
import { UpdateUserForm } from './updateUserForm';
import { ToastContext } from '../../../../context/toast-notification/ToastContext';
import { BulkUpdateForm } from './BulkUpdateForm';

export function AdminUsers() {
    const { addToast } = useContext(ToastContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectUser, setSelectUser] = useState(null);
    const [bulkUser, setBulkUser] = useState([]);
    const [formOverlay, setFormOverlay] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [allSelected, setAllSelected] = useState(false);
    const { allUsers, allUsersError, allUsersPending } = useGetAllUsers();
    const { updateUser, updatingUser, errorUpdating } = useUpdateUser();
    const { deleteUser, deletingUser, errorDeleting } = useDeleteUser();
    const containerRef = useRef(null);
    const fuseKeys = [
        'jobTitle',
        'firstName',
        'lastName',
        'email',
        'departmentId.name',
        'departmentId',
        'role'
    ];
    const searchResults = useFuseSearch(allUsers, searchQuery, fuseKeys);
    const actions = [
        {
            title: 'Edit',
            function: () => {
                setFormOverlay('edit');
                setIsFocused(false);
            }
        },
        {
            title: 'Delete',
            function: async (user) => {
                try {
                    await deleteUser(user);
                    addToast({msg: "User deleted!", type: "success"});
                    setIsFocused(false);
                } catch (e) {
                    console.error(e);
                    addToast({msg: e.message, type: "error"});
                }
            }
        },
        {
            title: 'Force Password Reset',
            function: (user) => {
                updateUser({
                    _id: user._id,
                    passwordResetRequired: true
                });
            }
        },
    ]

    const selectAll = () => {
        if(allSelected) {
            setAllSelected(!allSelected);
            setBulkUser([]); 
        } else {
            setAllSelected(!allSelected);
            setBulkUser(allUsers);
        }
        
    }

    const singleCheckSelect = (user) => {
        let arrayCopy = [...bulkUser];
        
        if(allSelected || arrayCopy.includes(user)) {
            setAllSelected(false);
            return setBulkUser(arrayCopy.toSpliced(arrayCopy.indexOf(user), 1));
        };

        arrayCopy.push(user);

        return setBulkUser(arrayCopy);
    };

    const hamburgerClick = (user) => {
        setSelectUser(user);
        setIsFocused(true);  
    };

    
    const selectOptions = (key, departments) => {
        const roleOptions = [
            {value: 'Admin', label: 'Admin'},
            {value: 'Manager', label: 'Department Manager'},
            {value: 'User', label: 'Standard user'}
        ];
        if(key === 'role') return roleOptions
        return departments?.map((dept) => (
            {
                label: dept.name,
                value: dept
            }            
        ))
    };

    const forcePasswordReset = async () => {
        try {
            const payloadArray = bulkUser.map((user) => ({
                passwordResetRequired: true,
                _id: user._id
            })).map((payload) => updateUser(payload));

            await Promise.all(payloadArray);

            addToast({msg: "All selected users updated!"});

        } catch (e) {
            console.error(e);
            addToast({msg: e.message});
        }
    }

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
                    h-full grid grid-rows-[auto_1fr] gap-8 font-lato min-h-0 self-start
                    bg-white rounded-xl border border-wiseGrey4/25 p-7 relative
                `}
        >
            <div
                className={`
                        ${formOverlay !== ''
                            ? `transition-all absolute inset-0 z-50 bg-wiseGrey5/20 rounded-xl backdrop-blur-xs
                                
                            `
                            : 'hidden'
                        }
                    `}
            >
                <NewUserForm
                    closeFormFunc={setFormOverlay}
                    closeFormState={formOverlay}
                    selectOptions={selectOptions}
                />
                {!selectUser
                    ? (<>
                    
                    </>)
                    : (<>
                        <UpdateUserForm 
                            closeFormFunc={setFormOverlay}
                            userData={selectUser}
                            closeFormState={formOverlay}
                            selectOptions={selectOptions}
                        />
                    </>)
                }
                <BulkUpdateForm
                    closeFormFunc={setFormOverlay}
                    closeFormState={formOverlay}
                    selectOptions={selectOptions}
                    users={bulkUser}
                    setUsers={setBulkUser}
                />
                
            </div>
            <div
                className={`
                        flex flex-row justify-between shink-0
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
                                    onClick={() => setFormOverlay('bulk')}
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
                                <p
                                    onClick={() => forcePasswordReset()}
                                    className='
                                        text-wiseRose3 cursor-pointer hover:text-wiseRose2
                                    '   
                                >
                                    <FontAwesomeIcon
                                        icon={faUserLock}
                                    /> 
                                    Password Reset
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
                className='
                            h-full min-h-0 self-start border border-wiseGrey4/30 
                '
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
                                    px-4 py-2 flex flex-row gap-3 w-40
                                '
                            >
                                <input
                                    type='checkbox'
                                    checked={allSelected}
                                    className=' w-5 h-5 accent-wiseRose4'
                                    onChange={() => selectAll()}
                                />
                                Select All
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
                        ref={containerRef}
                    >
                        {allUsers?.length !== 0 ? (
                            <>
                                {allUsers?.map((user, index) => (
                                    <tr key={index}  
                                        className={`
                                            border-b-2 border-wiseGrey4/35 
                                            *:shrink-0 transition-all
                                            ${bulkUser?.includes(user) || allSelected
                                                ? 'bg-wiseRose3/20'
                                                : ''
                                            }
                                        `}
                                        >
                                        <td className='py-4 px-4'>
                                            <input
                                                type='checkbox'
                                                checked={allSelected || bulkUser.includes(user)}
                                                className='
                                                     
                                                    w-5 h-5 accent-wiseRose4
                                                '
                                                onChange={() => singleCheckSelect(user)}
                                            />
                                        </td>
                                        <td 
                                            className='
                                                py-2 px-3
                                                font-semibold         
                                        '>
                                            {user?.firstName + ' ' + user?.lastName}
                                            
                                        </td>
                                        <td className='py-2 px-3'>
                                            {user?.email}
                                        </td>
                                        <td className='py-2 px-3'>
                                            {user?.departmentId?.name }
                                        </td>
                                        <td className='py-2 px-3'>
                                            {user?.role}
                                        </td>
                                        <td 
                                            className='py-2 px-3 relative'
                                            
                                            
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
                                                    flex flex-col rounded-md min-w-fit top-5 -right-3
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

