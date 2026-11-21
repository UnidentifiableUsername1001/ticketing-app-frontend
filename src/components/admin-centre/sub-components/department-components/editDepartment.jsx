import { useContext, useState } from 'react';
import { useEditDepartment } from '../../../../hooks/department-fetch/useDepartments';
import { AddTicketType } from './addTicketType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { EditTicketType } from './EditTicketType';
import { ToastContext } from '../../../../context/toast-notification/ToastContext';

export function EditDepartment({targetDept, setOverlay}) {
    const [showEditTicket, setShowEditTicket] = useState(null);
    const [ticketToEdit, setTicketToEdit] = useState({});
    const { update, errorUpdating, isUpdating } = useEditDepartment();
    const [formData, setFormData] = useState({...targetDept});
    const { addToast } = useContext(ToastContext);

    const updateHandler = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value;
        setFormData({
            ...formData,
            [targetName]:targetValue
        });
    };

    const deleteTicketType = (typeIndex) => {
        const ticketTypeCopy = formData.ticketTypes;
        const filteredTypes = ticketTypeCopy.filter((type) => ticketTypeCopy.indexOf(type) !== typeIndex);
        setFormData({
            ...formData,
            ticketTypes: filteredTypes
        });
    };

    // For adding new ticket types
    const [showTicketType, setShowTicketType] = useState(false);

    const handleAppendTicketType = (newTypeData) => {
        setFormData({
            ...formData,
            ticketTypes: [
                ...formData.ticketTypes,
                newTypeData
            ]
        });
    };

    const handleEditTicketType = (newTypeData, index) => {

        const ticketTypes = formData.ticketTypes;
        const splicedTypes = ticketTypes.toSpliced(index, 1, newTypeData);
        // const removeOriginalEntry = ticketTypes.filter((type) => ticketTypes.indexOf(type) !== index);
        // const withUpdatedEntry = removeOriginalEntry.push(newTypeData);

        setFormData({
            ...formData,
            ticketTypes: splicedTypes
        });

        setShowEditTicket(null);
        setTicketToEdit({});
    };

    const handleShowEditFormChild = (value) => {
        setShowEditTicket(value);
    };

    const handleSubmit = async () => {
        console.log(formData)
        try {
            const response = await update(formData);
            addToast({msg: `${response.department.name} team updated!`, type: "success"});
            setOverlay(false);
        } catch(e) {
            console.error(e);
            addToast({msg: e.message, type: "error"});
        }
    }

    return (
        <div className={` 
                font-lato grid grid-rows-[auto_1fr] relative
                min-h-0 h-full overflow-y-auto gap-8
            `}>
            <div
                className='
                    flex flex-col gap-2 w-1/2 pt-7 px-7
                '
            >
                <p
                    className='
                        flex flex-row gap-1 text-wiseGrey3
                    '
                >
                    <span
                        onClick={() => setOverlay('')}
                        className='
                            cursor-pointer transition-all duration-150 text-wiseRose3 
                            hover:text-wiseRose2 hover:underline
                        '
                    >
                        Team management
                    </span>
                    <span>/</span>
                    <span

                        className='
                        '
                    >
                        Edit
                    </span>
                </p>
                <h2
                    className='
                        font-semibold text-xl
                    '
                >
                    Edit Team
                </h2>
                <p
                    className='
                        text-wiseGrey3
                    '
                >
                    Adjust the settings and details of the selected team
                </p>
            </div>
            <div className='
                flex flex-col gap-10 px-7
            '>
                <div className=' flex flex-col w-120 gap-3'>
                    <label htmlFor='name' className='admin-form-label'>
                        Department Name
                    </label>
                    <input
                        className='admin-form-control'
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={updateHandler}
                        placeholder='E.g. Projects, Marketing etc.'
                    />
                </div>
                <div className='flex flex-col w-120 gap-3'>
                    <label htmlFor='config' className='admin-form-label'>Assignment Strategy</label>
                    <select 
                        name='config'
                        className='appearance-none admin-form-control'>
                        <option value={formData.config?.assignmentStrategy}>Load Balance</option>
                        <option value={formData.config?.assignmentStrategy}>Manual</option>
                    </select>
                </div>
                <div 
                    className={`
                        flex flex-col gap-10
                    `}
                >
                    <div
                        className='
                            flex flex-col gap-2
                        '
                    >
                        <h2 className='text-xl'>
                            Custom Requests   
                        </h2>
                        <p
                            className='
                                text-wiseGrey3 flex flex-col gap-2
                            '
                        >
                            <span>
                                Structure what kinds of request can be raised for this team, 
                                and add as many fields as needed<br/>
                            </span>
                        </p>
                    </div>
                    <div
                        className='
                            flex flex-col gap-3
                        '
                    >
                    {Object.keys(formData).length !== 0 && formData.ticketTypes.length !== 0 ? (
                        formData.ticketTypes.map((ticket, index) => (
                            <div key={index} className={`
                                flex flex-col gap-5
                                ${showEditTicket === index
                                    ? `
                                        border border-wiseGrey4/40 rounded-sm p-2
                                    `
                                    : ``
                                }
                            `}>
                                <p 
                                className='bg-wiseRose5 p-2 rounded-sm w-60 flex flex-row'>
                                    <span className='text-wiseDarkPink'>
                                        #{index + 1}
                                    </span>
                                    <span className='ml-3'>
                                        {ticket.typeName}
                                    </span>
                                    <span className='ml-auto'>
                                        <button type='button' onClick={() => {
                                            setShowEditTicket(showEditTicket === index ? null : index)
                                            setTicketToEdit(ticket);
                                        }}
                                            className=' 
                                                mx-1 font-lato font-bold cursor-pointer transition 
                                                duration-150 hover:text-wiseSkin
                                            '
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare}/>
                                        </button>
                                        <button type='button' onClick={() => deleteTicketType(index)}
                                            className='
                                                font-lato font-bold cursor-pointer transition 
                                                duration-150 hover:text-wiseSkin
                                                '
                                            >
                                            <FontAwesomeIcon icon={faXmark}/>
                                        </button>
                                    </span>
                                </p>
                                {showEditTicket === index ? (
                                    <div 
                                        className=''>
                                        <EditTicketType
                                            appendTypeFunc={handleEditTicketType}
                                            showTicketState={handleShowEditFormChild}
                                            currentTicket={ticketToEdit}
                                            index={index} />
                                    </div>        
                                ) : (
                                    <></>
                                )}
                            </div>
                            
                            ))
                        ) : (
                            <>
                            
                            </>
                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <button 
                        type='button'
                        title='For adding department specific tickets' 
                        onClick={() => setShowTicketType(!showTicketType)}
                        className={`
                            cursor-pointer 
                            ${showTicketType
                                ? `
                                    hidden
                                `
                                : `
                                    bg-wiseGrey4/30 rounded-lg transition-all duration-150
                                    hover:bg-wiseRose4/50 w-60 py-3
                                `
                            }
                            
                        `}
                    >
                        + Add Custom Request
                    </button>
                    <AddTicketType
                            appendTypeFunc={handleAppendTicketType}
                            showForm={showTicketType}
                            setShowForm={setShowTicketType}
                        />
                </div>
            </div>
            <div 
                className='
                    sticky border-t border-wiseGrey4/60 bottom-0
                    p-5 flex flex-row gap-2 z-50 justify-end bg-white
                '
            >
                <button
                    type='button'
                    onClick={() => setOverlay('')}
                    className='
                        w-20 rounded-lg font-bold hover:bg-wiseGrey4/60
                        transition-all duration-150 cursor-pointer
                    '
                >
                    Close
                </button>
                <button 
                    type='button'
                    onClick={() => handleSubmit()} 
                    className='
                        button1-no-width
                        w-20 font-bold
                    '>
                        Finish
                </button>
            </div>
        </div>
    )
}