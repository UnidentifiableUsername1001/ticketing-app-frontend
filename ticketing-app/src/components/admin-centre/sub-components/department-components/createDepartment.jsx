import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useCreateDepartment } from '../../../../hooks/department-fetch/useCreateDepartment';
import { AddTicketType } from './addTicketType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faChevronDown, faDeleteLeft, faXmark } from '@fortawesome/free-solid-svg-icons';

export function CreateDepartment() {
    
    const [formData, setFormData] = useState({
        name: '',
        ticketTypes: [],
        config: {
            assignmentStrategy: ''
        }
    });

    const newDeptHandler = useCreateDepartment(formData, setFormData);
    
    const [showTicketType, setShowTicketType] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const handleAppendTicketType = (newTypeData) => {
        setFormData({
            ...formData,
            ticketTypes: [
                ...formData.ticketTypes,
                newTypeData
            ]
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

    const updateEventHandler = (event, setFormData) => {
        let targetName = event.target.name;
        let targetValue = event.target.value;

        setFormData({
            ...formData,
            [targetName]: targetValue
        });
    };

    const handleShowFormChild = (bool) => {
        setShowTicketType(bool);
    }

    return (
        <div className='top-div grid grid-cols-1 gap-10 font-lato'>
            <button type='button' className='form-dropDown-button' onClick={() => setShowForm(!showForm)}>
                <div className='width-full flex flex-row justify-between relative z-10'>
                    <span className=''>Add New Department</span>
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
                <form onSubmit={newDeptHandler} className='grid grid-cols-7 gap-10 text-wiseOffWhite'>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label htmlFor='name' className='admin-form-label'>Department Name:</label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={updateEventHandler}
                            placeholder='E.g. Projects, Marketing etc.'
                        />
                    </div>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-10'>
                        <div className='grid grid-cols-1 gap-2'>
                            <label htmlFor='config' className='admin-form-label'>Assignment Strategy</label>
                            <select 
                                name='config'
                                className='appearance-none admin-form-control'>
                                <option value={formData.config.assignmentStrategy}>Load Balance</option>
                                <option value={formData.config.assignmentStrategy}>Manual</option>
                            </select>
                        </div>
                        <div 
                            className={`${formData.ticketTypes.length !== 0 ? 
                                'block opacity-100' : 
                                'hidden opacity-0'}
                                grid grid-cols-1 gap-2 p-4 mt-2`}>
                            <h2 className='admin-form-lable text-lg'>Custom Tickets:</h2>
                            {formData.ticketTypes.length !== 0 ? (
                                formData.ticketTypes.map((ticket, index) => (
                                    <>
                                        <div key={index} className='grid grid-cols-1 gap-2'>
                                            <p 
                                            className='bg-wiseOffWhite/10 p-1 rounded-sm w-2/4 flex flex-row'>
                                                <span className='text-wiseDarkPink'>#{index + 1}</span> - {ticket.typeName}
                                                <span className='ml-auto'>
                                                    <button type='button' onClick={() => deleteTicketType(index)}
                                                        className=' text-wiseOffWhite font-lato font-bold cursor-pointer transition delay-75 duration-200 hover:scale-105 hover:text-wiseSkin'>
                                                        <FontAwesomeIcon icon={faXmark}/>
                                                    </button>
                                                </span>
                                            </p>
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
                </form>
            </div>
        </div>
    )
}