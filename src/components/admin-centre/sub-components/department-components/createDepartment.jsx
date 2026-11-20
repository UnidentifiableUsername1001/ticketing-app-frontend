import { useState } from 'react';
import { useCreateDepartment } from '../../../../hooks/department-fetch/useDepartments';
import { AddTicketType } from './addTicketType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export function CreateDepartment({overlay, setOverlay}) {
    
    const [formData, setFormData] = useState({
        name: '',
        ticketTypes: [],
        config: {
            assignmentStrategy: ''
        }
    });
    const { createDepartment, deptCreated, deptPending, deptError } = useCreateDepartment();
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

    const deleteTicketType = (typeIndex) => {
        const ticketTypeCopy = formData.ticketTypes;
        const filteredTypes = ticketTypeCopy.filter((type) => ticketTypeCopy.indexOf(type) !== typeIndex);
        setFormData({
            ...formData,
            ticketTypes: filteredTypes
        });
    };

    const updateEventHandler = (event) => {
        let targetName = event.target.name;
        let targetValue = event.target.value;

        setFormData({
            ...formData,
            [targetName]: targetValue
        });
    };

    return (
        <div className={`
            ${overlay === 'new'
                    ? ''
                    : 'hidden'
                } 
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
                        Create
                    </span>
                </p>
                <h2
                    className='
                        font-semibold text-xl
                    '
                >
                    Create Department
                </h2>
                <p
                    className='
                        text-wiseGrey3
                    '
                >
                    Departments are how you organise your business by providing 
                    a home for your users and types of requests
                </p>
            </div>
            <div className='
                flex flex-col gap-10 px-7
            '>
                <div className='
                    flex flex-col w-120 gap-3
                '>
                    <label htmlFor='name' className='admin-form-label'>Department Name</label>
                    <input
                        className='admin-form-control'
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={updateEventHandler}
                        placeholder='E.g. Projects, Marketing etc.'
                    />
                </div>
                <div className='
                    flex flex-col w-120 gap-3   
                '>
                    <label htmlFor='config' className='admin-form-label'>Assignment Strategy </label>
                    <select 
                        name='assignmentStrategy'
                        className='appearance-none admin-form-control'
                        onChange={(e) => setFormData({
                            ...formData,
                            config: {
                                ...formData.config,
                                assignmentStrategy: e.target.value
                            }
                        })}>
                        <option value={'Load Balance'}>Load Balance</option>
                        <option value={'Manual'}>Manual</option>
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
                            <span
                                className='italic font-bold text-wiseRose3'
                            >
                                *All request types come with a title, description and file upload field as default.
                            </span>
                        </p>
                    </div>
                    {formData.ticketTypes.length !== 0 ? (
                        formData.ticketTypes.map((ticket, index) => (
                            <>
                                <div key={index} 
                                    className='
                                        flex flex-row gap-2
                                    '
                                >
                                    <p 
                                        className='
                                            w-60 gap-3
                                            bg-wiseRose5 p-2 rounded-sm flex flex-row

                                        '
                                    >
                                        <span className='text-wiseRose2 font-bold text-lg'>
                                            #{index + 1}
                                        </span> 
                                        <span
                                            className='
                                                font-semibold text-lg 
                                            '
                                        >
                                            {ticket.typeName}
                                        </span>
                                    </p>
                                    <button type='button' onClick={() => deleteTicketType(index)}
                                        className=' 
                                            font-lato font-bold cursor-pointer transition text-xl
                                            duration-150 hover:text-wiseSkin'>
                                        <FontAwesomeIcon icon={faXmark}/>
                                    </button>
                                </div>
                            </>
                        ))
                    ) : (
                        <></>
                    )}

                    <div className={`
                        flex flex-col gap-5
                    `}>
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
                            setShowForm={setShowTicketType}
                            showForm={showTicketType}
                        />
                    </div>
                </div>
            </div>
            <div 
                className='
                    sticky border-t border-wiseGrey4/60 bottom-0
                    p-5 flex flex-row gap-2 z-50 justify-end bg-white
            '>
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
                    onClick={() => createDepartment(formData)} 
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