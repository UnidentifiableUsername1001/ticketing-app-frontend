import { useState, useContext } from 'react';
import { useGetDepartments } from '../../../../hooks/department-fetch/useDepartments';
import { useUpdateUser } from '../../../../hooks/user-fetch-hooks/useUsers';
import Select from 'react-select';
import { style1 } from '../../../../hooks/assorted/react-select-styles';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContext } from '../../../../context/toast-notification/ToastContext';

export function UpdateUserForm({userData, closeFormFunc, closeFormState, roleOptions, selectOptions}){

    const blankForm = {
        firstName: "",
        lastName: "",
        email: "",
        jobTitle: "",
        departmentId: {},
        role: {},
    };

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

    const [activeGroup, setActiveGroup] = useState(1);
    const [fieldToEdit, setFieldToEdit] = useState(null);
    const [updateFormData, setUpdateFormData] = useState({
        ...blankForm,
        _id: userData._id
    });
    const { departments, departmentsPending, errorGetting } = useGetDepartments();
    const { updateUser, updatingUser, errorUpdating } = useUpdateUser();
    const { addToast } = useContext(ToastContext);
    
    const updateEventHandler = (event) => {
        let targetName = event.target.name;
        let targetValue = event.target.value;

        setUpdateFormData({
            ...updateFormData,
            [targetName]: targetValue
        });
    };

    const handleExplicitChange = (name, value) => {
        setUpdateFormData({
            ...updateFormData,
            [name]: value
        })
        console.log(updateFormData)
    };

    const handleSubmit = async () => {
        try {
            let data = {
                ...updateFormData,
                _id: userData._id
            };
            await updateUser(data);
            addToast({msg: "User updated!", type: "success"});
            setUpdateFormData(blankForm);
            closeFormFunc('');
            setActiveGroup(1);
        } catch (e) {
            console.error(e);
            addToast({msg: e.message ?? "View browser console for more info", type: 'error'});
        }
    };

    const valuePlaceholderText = (key) => {
        if(key === 'departmentId') {
            return Object.keys(updateFormData[key].length !== 0)
            ? updateFormData[key].label
            : userData[key].name
        };
        if(key === 'role') {
            return Object.keys(updateFormData[key].length !== 0)
            ? updateFormData[key].value
            : userData[key]
        }
        return updateFormData[key] !== ''
        ? `${updateFormData[key]}`
        : `${userData[key]}`
    };

    return (
        <div className={`
            ${closeFormState === 'edit'
                    ? ''
                    : 'hidden'
                }
            bg-white w-150 mx-auto rounded-xl border border-wiseGrey4/25
            p-7 font-lato grid grid-rows-[auto_1fr] gap-5 relative -top-20 shadow-xl
        `}>
            <div

            >
                <h2
                    className='
                        font-bold text-xl mb-3
                    '
                >
                    Update team member
                </h2>
                <p
                    className='
                        text-wiseGrey3/90
                    '
                >
                    Select the field you'd like to change, make the changes, then submit.
                </p>
            </div>
            <div
                className='
                    flex flex-row
                    border-b border-wiseGrey4/50 mb-4
                '
            >
                <h2
                    onClick={() => setActiveGroup(1)}
                    className={`
                            cursor-pointer py-2 px-4 transition-all duration-150 hover:text-wiseRose3
                            ${activeGroup === 1
                                ? `
                                    border-b-3 border-wiseRose3 text-wiseRose3
                                `
                                : `
                                
                                `
                            }
                        `}
                >
                    User Profile
                </h2>
                <h2
                    onClick={() => setActiveGroup(2)}
                    className={`
                            cursor-pointer py-2 px-4 transition-all duration-150 hover:text-wiseRose3
                            ${activeGroup === 2
                                ? `
                                    border-b-3 border-wiseRose3 text-wiseRose3
                                `
                                : `
                                
                                `
                            }
                        `}
                >
                    Role & Access
                </h2>
            </div>
            
            <div className={` 
                flex flex-col gap-10
                `}>

                {Object.entries(blankForm).map(([key, value], index) => (
                    <div
                        key={index}
                        className={`
                                flex flex-col gap-2
                                ${activeGroup !== metaData[key].group
                                    ? 'hidden'
                                    : ''
                                }
                            `}
                    >
                        <label
                            className='
                                flex flex-row justify-between font-semibold
                            '
                        >
                            <span>
                                {metaData[key]?.labelText}
                            </span>
                            <span
                                className='
                                    text-wiseRose3 cursor-pointer hover:text-wiseRose2 hover:underline
                                '
                                onClick={() => {
                                    fieldToEdit !== index
                                    ? setFieldToEdit(index)
                                    : setFieldToEdit(null)
                                }}
                            >
                                {fieldToEdit !== index 
                                    ? 'Edit'
                                    : 'Save'
                                }
                            </span>
                        </label>
                        {fieldToEdit === index
                            ? (  
                                <>
                                    {key === 'departmentId' || key === 'role'
                                        ? (
                                            <Select
                                                unstyled
                                                classNames={style1}
                                                value={updateFormData[key]}
                                                options={selectOptions(key, departments)}
                                                onChange={(selectedOption) => handleExplicitChange(key, selectedOption)} 
                                                    />
                                        )
                                        : (
                                            <input
                                                className='admin-form-control'
                                                type='text'
                                                name={key}
                                                value={updateFormData[key]}
                                                placeholder={key === 'departmentId'
                                                    ? `${userData[key]?.name ?? ''}`
                                                    : `${userData[key] ?? ''}`
                                                }
                                                onChange={updateEventHandler}
                                            />
                                        )
                                    }
                                </>
                                
                            )
                            : (
                                <input
                                    className='
                                        bg-wiseGrey4/30 py-1 px-2 outline-none 
                                        font-lato placeholder:text-wiseGrey3/75
                                        border border-wiseGrey3/10 text-wiseGrey3
                                    '
                                    disabled
                                    name={key}
                                    value={valuePlaceholderText(key)}
                                />
                            )
                        }
                    </div>
                ))}
                <div  
                    className='
                        flex flex-row
                        justify-end
                '>
                    <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => {
                        setUpdateFormData(blankForm);
                        closeFormFunc('');
                    }}
                    className='
                        absolute top-0 right-0 p-6
                        text-3xl cursor-pointer transtion-all duration-150 hover:scale-110
                        hover:text-wiseDarkPink
                    '
                    />
                    <button 
                        type='button'
                        onClick={() => handleSubmit()} 
                        className='
                            button1-no-width
                        '>
                            Update Details
                    </button>
                </div>
            </div>
        </div>
    )
}