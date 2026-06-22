import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import { useEditDepartment } from '../../../../hooks/department-fetch/useEditDepartment';
import  useGetDepartments from '../../../../hooks/department-fetch/useGetDepartments';
import { useGetOneDepartment } from '../../../../hooks/department-fetch/useGetOneDepartment';
import { AddTicketType } from './addTicketType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faChevronDown, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { EditTicketType } from './EditTicketType';

export function EditDepartment() {

    const [formData, setFormData] = useState({});
    
    const departments = useGetDepartments();
    const [targetDeptId, setTargetDeptId] = useState(null);
    
    const [showForm, setShowForm] = useState(false);
    const targetDepartment = useGetOneDepartment(targetDeptId);

    useEffect(() => {
        if (targetDepartment && Object.keys(targetDepartment).length !== 0) {
            setFormData({...targetDepartment});
        }

    }, [targetDepartment])

    
    const submitHandler = useEditDepartment(formData, setFormData, targetDeptId);

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

    const handleShowFormChild = (bool) => {
        setShowTicketType(bool);
    }

    // For editing ticket types

    const [showEditTicket, setShowEditTicket] = useState(null);
    const [ticketToEdit, setTicketToEdit] = useState({});

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
    }

    return (
        <div className='top-div grid grid-cols-1 gap-10 font-lato'>
            <button type='button' className='form-dropDown-button' onClick={() => setShowForm(!showForm)}>
                <div className='width-full flex flex-row justify-between relative z-10'>
                    <span className=''>Edit Departments</span>
                    <span className=''>
                        {showForm === false ? 
                            <><FontAwesomeIcon icon={faChevronDown}/></> 
                            : 
                            <><FontAwesomeIcon icon={faAngleUp}/></>}
                    </span>
                </div>
            </button>
            <div className={` 
                    ${showForm ? 'block opacity-100' : 'hidden opacity-0'}
                    transition-all bg-wiseNavy shadow-wiseSkin shadow-sm p-7 rounded-md outline-1 outline-wiseSkin
                `}>
                <form onSubmit={submitHandler} className='grid grid-cols-7 gap-10 text-wiseOffWhite'>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='selectUser'>Select a department:</label>
                        <Select
                            className='text-wiseNavy'
                            value={targetDeptId}
                            options={departments}
                            onChange={(selectedOption) => setTargetDeptId(selectedOption)} />
                    </div>
                    {formData && Object.keys(formData).length !== 0 ? (
                        <>
                            <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                                <label htmlFor='name' className='admin-form-label'>Department Name - <span className='text-wiseDarkPink'>Current: {formData ? formData.name : ""}</span></label>
                                <input
                                    className='admin-form-control'
                                    type='text'
                                    name='name'
                                    value={formData.name}
                                    onChange={updateHandler}
                                    placeholder='E.g. Projects, Marketing etc.'
                                />
                            </div>
                            <div className='grid grid-cols-1 col-start-2 col-span-5 gap-10'>
                                <div className='grid grid-cols-1 gap-2'>
                                    <label htmlFor='config' className='admin-form-label'>Assignment Strategy</label>
                                    <select 
                                        name='config'
                                        className='appearance-none admin-form-control'>
                                        <option value={formData.config?.assignmentStrategy}>Load Balance</option>
                                        <option value={formData.config?.assignmentStrategy}>Manual</option>
                                    </select>
                                </div>
                                <div 
                                    className={`${Object.keys(formData).length !== 0 && formData.ticketTypes.length !== 0 ? 
                                        'block opacity-100' : 
                                        'hidden opacity-0'}
                                        grid grid-cols-1 gap-2 p-4 mt-2`}>
                                    <h2 className='admin-form-lable text-lg'>Custom Tickets:</h2>
                                    {Object.keys(formData).length !== 0 && formData.ticketTypes.length !== 0 ? (
                                        formData.ticketTypes.map((ticket, index) => (
                                            <>
                                                <div key={index} className='grid grid-cols-1 gap-2'>
                                                    <p 
                                                    className='bg-wiseOffWhite/10 p-1 rounded-sm w-2/4 flex flex-row'>
                                                        <span className='text-wiseDarkPink'>#{index + 1}</span> - {ticket.typeName}
                                                        <span className='ml-auto'>
                                                            <button type='button' onClick={() => {
                                                                setShowEditTicket(showEditTicket === index ? null : index)
                                                                setTicketToEdit(ticket);
                                                            }}
                                                                className=' text-wiseOffWhite font-lato font-bold cursor-pointer transition delay-75 duration-200 hover:scale-105 hover:text-wiseSkin'>
                                                                <FontAwesomeIcon icon={faPenToSquare}/>
                                                            </button>
                                                            <button type='button' onClick={() => deleteTicketType(index)}
                                                                className=' text-wiseOffWhite font-lato font-bold cursor-pointer transition delay-75 duration-200 hover:scale-105 hover:text-wiseSkin'>
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
                                            </>
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className='grid justify-items-stretch'>
                                    <button 
                                        type='button'
                                        title='For adding department specific tickets' 
                                        onClick={() => setShowTicketType(!showTicketType)}
                                        className='admin-form-button justify-self-center'
                                    >
                                        Add Ticket Type
                                    </button>
                                </div>
                            </div>
                            <div 
                                className={`${showTicketType ? 
                                    'block opacity-100' : 
                                    'hidden opacity-0'} 
                                    grid grid-cols-1 col-start-2 col-span-5 gap-2
                                `}
                            >
                                    <AddTicketType
                                        appendTypeFunc={handleAppendTicketType}
                                        showTicketTypeForm={handleShowFormChild}
                                    />
                            </div>
                            <div className='grid grid-cols-1 col-start-5 col-end-9 justify-items-stretch'>
                                <button 
                                    type='submit' 
                                    className='admin-form-button justify-self-end'>
                                        Finish
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className='col-start-2 col-span-5 text-center text-wiseSkin/60 py-10 font-bold'>
                            Please select a department above to load its customizable options.
                        </div>
                    )}

                </form>
            </div>
        </div>
    )
}