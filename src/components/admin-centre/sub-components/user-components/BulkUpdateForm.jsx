import { useUpdateUser } from "../../../../hooks/user-fetch-hooks/useUsers";
import { useGetDepartments } from "../../../../hooks/department-fetch/useDepartments";
import Select from 'react-select';
import { style1 } from "../../../../hooks/assorted/react-select-styles";
import { ToastContext } from "../../../../context/toast-notification/ToastContext";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function BulkUpdateForm({users, closeFormState, closeFormFunc, selectOptions}) {
    const { departments, departmentsPending, errorGetting } = useGetDepartments();
    const { updateUser, updatingUser, errorUpdating } = useUpdateUser();
    const { addToast } = useContext(ToastContext);
    const eligibleFields = {
        departmentId: {
            label: 'Department',
            value: ''
        },
        role: {
            label: 'Access Level',
            value: ''
        },
        jobTitle: {
            label: 'Job title',
            value: ''
        }
    };
    const [updatedFields, setUpdatedFields] = useState(eligibleFields);

    const handleSubmit = async () => {
        try {
            let payload = {}
            for (const prop in updatedFields) {
                payload[prop] = updatedFields[prop].value
            };

            const payloadArray = users.map((user) => ({
                ...payload,
                _id: user._id
            })).map((payload) => updateUser(payload));

            await Promise.all(payloadArray);

            addToast({msg: "All selected users updated!"});
            setUpdatedFields(eligibleFields);
            closeFormFunc('');

        } catch (e) {
            console.error(e);
            addToast({msg: e.message});
        }
    }

    return (
        <div className={`
            ${closeFormState === 'bulk'
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
                    Update multiple team members
                </h2>
                <p
                    className='
                        text-wiseGrey3/90
                    '
                >
                    Select the field you'd like to change, make the changes, then submit.
                </p>
                <h2
                    className='
                        font-bold text-xl mt-6  
                    '
                >
                    Editing 
                    <span
                        className="text-wiseRose3 mx-1.5 text-2xl"
                    >
                        {users?.length}
                    </span> 
                    users
                </h2>
            </div>
            <div className={` 
                flex flex-col gap-10
                `}>

                {Object.entries(eligibleFields).map(([key, value], index) => (
                    <div
                        key={index}
                        className={`
                                flex flex-col gap-2
                                
                            `}
                    >
                        <label
                            className='
                                flex flex-row justify-between font-semibold
                            '
                        >
                            <span>
                                {value.label}
                            </span>
                        </label>
                        {key === 'departmentId' || key === 'role'
                            ? (
                                <Select
                                    unstyled
                                    classNames={style1}
                                    value={updatedFields[key].value}
                                    options={selectOptions(key, departments)}
                                    onChange={(selectedOption) => 
                                        setUpdatedFields({
                                            ...updatedFields, 
                                            [key]: {
                                                ...updatedFields[key],
                                                value: selectedOption    
                                            }
                                        })} 
                                />
                            )
                            : (
                                <input
                                    className='admin-form-control'
                                    type='text'
                                    name={key}
                                    value={updatedFields[key].value}
                                    placeholder='Type here...'
                                    onChange={(e) => setUpdatedFields({
                                        ...updatedFields,
                                        [key]: {
                                            ...updatedFields[key],
                                            value: e.target.value
                                        }
                                    })}
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
                        setUpdatedFields(eligibleFields);
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