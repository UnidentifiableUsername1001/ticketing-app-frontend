import { useState, useContext } from 'react';
import { useGetDepartments } from '../../../../hooks/department-fetch/useDepartments';
import { useNewUser } from '../../../../hooks/user-fetch-hooks/useUsers';
import Select from 'react-select';
import { style1 } from '../../../../hooks/assorted/react-select-styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastContext } from '../../../../context/toast-notification/ToastContext';

export function NewUserForm({closeForm}) {
    const { addToast } = useContext(ToastContext);

    const blankForm = {
        firstName: "",
        lastName: "",
        jobTitle: "",
        email: "",
        password: "",
        departmentId: {},
        role: {} 
    };

    const [newFormData, setNewFormData] = useState(blankForm);

    const metaData = {
        firstName: {
            labelText: "First Name",
            group: 1,
        },
        lastName: {
            labelText: "Last Name",
            group: 1,
        },
        email: {
            labelText: "Email",
            group: 1,
        },
        password: {
            labelText: "Temporary Password",
            group: 1,
        },
        jobTitle: {
            labelText: "Job Title",
            group: 2,
        },
        departmentId: {
            labelText: "Department",
            group: 2,
        },
        role: {
            labelText: "Role",
            group: 2,
        },
    };

    const [group, setGroup] = useState(1);

    const { departments, errorGetting, departmentsPending } = useGetDepartments();

    const { addUser, isAdded, errorAdding } = useNewUser();

    const roleOptions = [
        {value: 'Admin', label: 'Admin'},
        {value: 'Manager', label: 'Team Manager'},
        {value: 'User', label: 'Standard user'}
    ];

    const selectOptions = (key) => {
        if(key === 'role') return roleOptions
        return departments?.map((dept) => (
            {
                label: dept.name,
                value: dept
            }            
        ))
    }
    
    const updateEventHandler = (event) => {
        let targetName = event.target.name;
        let targetValue = event.target.value;

        setNewFormData({
            ...newFormData,
            [targetName]: targetValue
        });
    };

    const handleExplicitChange = (name, value) => {
        setNewFormData({
            ...newFormData,
            [name]: value
        })
    };

    const nextOrSubmit = async () => {

        if(group === 1) return setGroup(2)
        
        try {
            await addUser(newFormData);
            addToast({msg: "User added!", type: 'success'});
            closeForm('');
            setNewFormData(blankForm);
        } catch (e) {
            console.error(e);
            addToast({msg: `${e.message}`, type: 'error'});
        }

    }
    
    return (
        <div className={` 
                bg-white w-200 mx-auto rounded-xl border border-wiseGrey4/25
                p-7 font-lato grid grid-rows-[auto_1fr] gap-5 relative -top-10 shadow-xl
            `}>
            <div

            >
                <h2
                    className='
                        font-bold text-xl mb-3
                    '
                >
                    Create new team member
                </h2>
                <p
                    className='
                        text-wiseGrey3/90
                    '
                >
                    Get new team members up and running in just a couple of steps.
                </p>
            </div>
            <div
                className='
                    grid grid-rows-[auto_1fr] gap-3
                '
            >
                <div
                    className='
                        flex flex-col 
                    '
                >
                    <h3
                        className={`
                                p-1 text-center flex flex-row gap-3
                                ${group === 1 
                                    ? ''
                                    : 'hidden'
                                }
                            `}
                    >
                        <span
                            className={`
                                    bg-wiseRose4/40 p-1 rounded-full w-8 font-bold
                                `}
                        >
                            1.
                        </span>
                        <span
                            className='self-center font-semibold'
                        >
                            User profile
                            
                        </span>
                        
                    </h3>
                    <h3
                        className={`
                                p-1 text-center flex flex-row gap-3
                                ${group === 2 
                                    ? ''
                                    : 'hidden'
                                }
                            `}
                    >
                        <span
                            className={`
                                    bg-wiseRose4/40 p-1 rounded-full w-8 font-bold
                                `}
                        >
                            2.
                        </span>
                        <span
                            className='self-center font-semibold'
                        >
                            Department & Role
                            
                        </span>
                        
                    </h3>
                </div>
                <div
                    className='
                        grid grid-cols-2 gap-4 mx-7
                        
                    '
                >
                    {Object.entries(newFormData).map(([key, value], index) => (
                        <div key={index}
                            data-group={metaData[key].group}
                            className={`
                                flex flex-col gap-2 nth-[n+3]:col-span-2 
                                ${group === metaData[key].group
                                    ? ''
                                    : 'hidden'
                                }

                            `}>
                            <label
                                className='

                                '
                            >
                                {metaData[key].labelText}
                            </label>
                            {key === 'departmentId' || key === 'role'
                                ? (
                                    <Select
                                        unstyled
                                        classNames={style1}
                                        value={newFormData[key]}
                                        options={selectOptions(key)}
                                        onChange={(selectedOption) => handleExplicitChange(key, selectedOption)} 
                                            />
                                )
                                : (
                                    <input
                                        name={key}
                                        type='text'
                                        value={newFormData[key]}
                                        onChange={updateEventHandler}
                                        placeholder='Type here...'
                                        className='admin-form-control'
                                    />
                                )
                            }
                        </div>
                    ))}
                </div>
            </div>
                <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => closeForm('')}
                    className='
                        absolute top-0 right-0 p-6
                        text-3xl cursor-pointer transtion-all duration-150 hover:scale-110
                        hover:text-wiseDarkPink
                    '
                />
            <div
                className='
                    flex flex-row justify-between
                '
            >
                <button
                    type='button'
                    onClick={() => setGroup((prev) => prev - 1)}
                    className={`
                        
                        w-25 
                        ${group === 1
                            ? 'opacity-0'
                            : 'button2-no-width opacity-100'
                        }
                    `}
                >
                    Back
                </button>
                <button 
                    type='button'
                    onClick={() => nextOrSubmit()} 
                    className='
                        button1-no-width w-25
                    '>
                        {group === 1
                            ? 'Next'
                            : 'Submit'
                        }
                </button>
            </div>
        </div>
        
    )
};