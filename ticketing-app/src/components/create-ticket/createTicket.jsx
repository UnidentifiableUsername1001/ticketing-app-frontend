import React, { useState, useEffect } from "react";
import { config } from "../../../config";
import { useAppContext } from "../../context/authContext";
import Select  from 'react-select';
import { useCreateTicket } from "../../hooks/ticket-fetch/useCreateTicket";
import useGetDepartments from '../../hooks/department-fetch/useGetDepartments';
import { useGetOneDepartment } from '../../hooks/department-fetch/useGetOneDepartment';
import useAssignableUsers from "../../hooks/user-fetch-hooks/useGetAllUsers";
import { fieldTypeToRender } from "../../hooks/assorted/createTicket";

function CreateTicket() {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    // Evaluates to Object.value of react-select object post-call of prepRenderFormState 
    const [tickTypeToRender, setTickTypeToRender] = useState({})

    // remember to set-up a conditional check of this variable when coding return as React will crash on-load as is
    const [selectedDept, setSelectedDept] = useState(null)
    const [selectedDeptTickets, setSelectedDeptTickets] = useState(null)

    const allDepartments = useGetDepartments();
    const selectedDepartment = useGetOneDepartment(selectedDept);
    const assignableUsers = useAssignableUsers();

    // To make ticketTypes parsable by react-select
    const mappedTypesArray = () => {

        const ticketTypes = selectedDepartment.ticketTypes;

        if(ticketTypes && ticketTypes.length !== 0) {
            const mappedArray = ticketTypes.map((type) => ({
                label: type.typeName,
                value: type
            }));

            mappedArray.unshift({
                label: 'General Enquiry',
                value: {
                    typeName: 'General Enquiry',
                    fields: [
                        // will need to convert names to lowercase either at endpoint or during fetch hook
                        {name: 'Title', expectedType: 'String', required: true},
                        {name: 'Description', expectedType: 'Textarea', required: true},
                    ]
                }
            });

            return setSelectedDeptTickets(mappedArray);
        };
    };

    useEffect(() =>{
        mappedTypesArray();
    }, [selectedDepartment])

    const prepRenderFormState = (ticketTypeObj) => {

        const ticketType = ticketTypeObj.value;

        if (ticketType.typeName === 'General Enquiry') {

            setTickTypeToRender({...ticketType});

            setFormData({
                ...formData,
                departmentId: selectedDepartment._id,
                ticketType: ticketType.typeName
            })

            return;
        }

        ticketType.fields.unshift(
            {name: 'Title', expectedType: 'String', required: true},
            {name: 'Description', expectedType: 'Textarea', required: true},
        );

        setTickTypeToRender({...ticketType});

        ticketType.fields.forEach((field) => {
            setFormData({
                ...formData,
                [field.name]: null
            });
        });

        setFormData({
            ...formData,
            departmentId: selectedDepartment._id,
            ticketType: ticketType.typeName
        })
    }


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
    };

    const handleSubmit = useCreateTicket(formData);    


    return (
        <div className='top-div grid grid-col-1'>
            <div className={`transition-all w-5/9 bg-wiseNavy shadow-wiseSkin shadow-sm p-7 rounded-md outline-1 outline-wiseSkin place-self-center mt-20`}>
                <form onSubmit={handleSubmit} className='grid grid-cols-7 gap-10 text-wiseOffWhite'>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='selectDepartment'>Select a department:</label>
                        <Select
                            className='text-wiseNavy'
                            value={selectedDept}
                            options={allDepartments}
                            onChange={(selectedOption) => {
                                setSelectedDept(selectedOption)
                                console.log()
                                }} />
                    </div>
                    {selectedDepartment && Object.keys(selectedDepartment).length !== 0 ? (
                        <>
                            <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                                <label className='admin-form-label' htmlFor='ticketType'>What type of ticket are you raising?</label>
                                <Select 
                                    className="text-wiseNavy"
                                    value={tickTypeToRender}
                                    options={selectedDeptTickets}
                                    onChange={(selectedOption) => prepRenderFormState(selectedOption)} />
                            </div>
                            {tickTypeToRender && Object.keys(tickTypeToRender).length !== 0 ? (
                                <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                                    {tickTypeToRender.fields.map((field, index) => (
                                        <>
                                            <div key={index} className="grid grid-cols-1">
                                                <label htmlFor={field.name} className="admin-form-label">{field.name}</label>
                                                <>{fieldTypeToRender(field, updateEventHandler, formData)}</>
                                                
                                            </div>
                                        </>
                                    ))}
                                </div>
                                
                            ) : (
                                <div className='col-start-2 col-span-5 text-center text-wiseSkin/60 py-10 font-bold'>
                                    Please select a ticket type.
                                </div>
                            )}
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
                            Please start by selecting a department.
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default CreateTicket;