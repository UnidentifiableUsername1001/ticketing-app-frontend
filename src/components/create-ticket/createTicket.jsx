import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import Select  from 'react-select';
import { useCreateTicket } from "../../hooks/ticket-fetch/useCreateTicket";
import useGetDepartments from '../../hooks/department-fetch/useGetDepartments';
import { useGetOneDepartment } from '../../hooks/department-fetch/useGetOneDepartment';
import useAssignableUsers from "../../hooks/user-fetch-hooks/useGetAllUsers";
import { RenderFields } from "./sub-components/RenderFields";
import { useSearchParams } from "react-router";
import { useUploadAttachment } from "../../hooks/ticket-fetch/useUploadAttachment";
import { ToastContext } from "../../context/toast-notification/ToastContext";
import { style1 } from "../../hooks/assorted/react-select-styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

function CreateTicket() {

    const [formData, setFormData] = useState({
        title: '',
        description: {
            bodyText: '',
            mentions: [],
            attachments: [],
        },
        customAttributes: []
    });

    const [bodyText, setBodyText] = useState(null);

    const { addToast } = useContext(ToastContext);

    const [searchParams, setSearchParams] = useSearchParams();

    const { createTicket, isCreating, creationError } = useCreateTicket();

    const { uploadFile, isUploading, uploadError } = useUploadAttachment();

    // Evaluates to react-select object post-call of prepRenderFormState e.g. {label: <string>, value: {<ticketTypeObject>}}
    const [tickTypeToRender, setTickTypeToRender] = useState({})

    const [selectedDept, setSelectedDept] = useState(null);
    const [fetchedDept, setFetchedDept] = useState(null)
    const [selectedDeptTickets, setSelectedDeptTickets] = useState(null);

    const allDepartments = useGetDepartments();
    const selectedDepartment = useGetOneDepartment();

    const navigate = useNavigate();

    // To make ticketTypes parsable by react-select
    const mappedTypesArray = async (option) => {

        setSelectedDept(option);

        const deptData = await selectedDepartment(option);

        setFetchedDept(deptData);

        const ticketTypes = deptData.ticketTypes;

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
                        {name: 'title', expectedType: 'String', required: true},
                        {name: 'description', expectedType: 'Textarea', required: true},
                        {name: 'file_upload', expectedType: 'fileUpload', required: true}
                    ]
                }
            });

            return setSelectedDeptTickets(mappedArray);
        };
    };

    const prepRenderFormState = (ticketTypeObj) => {

        if (ticketTypeObj.value.typeName === 'General Enquiry') {

            setTickTypeToRender({...ticketTypeObj});

            setFormData({
                ...formData,
                departmentId: fetchedDept?._id,
                ticketType: ticketTypeObj.value.typeName
            })

            return;
        }

        ticketTypeObj.value.fields.unshift(
            {name: 'title', expectedType: 'String', required: true},
            {name: 'description', expectedType: 'Textarea', required: true},
        );
        
        ticketTypeObj.value.fields.push(
            {name: 'File Upload', expectedType: 'fileUpload', required: true}
        )

        setTickTypeToRender({...ticketTypeObj});

        setFormData({
            ...formData,
            departmentId: fetchedDept?._id,
            ticketType: ticketTypeObj.value.typeName
        })
    }


    const handleNormalChange = (event) => {
        let targetName = event.target.name;
        let targetValue = event.target.value;

        setFormData({
            ...formData,
            [targetName]: targetValue
        });
    };

    const handleExplicitChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleCustAttrChange = (name, value) => {
        setFormData({
            ...formData,
            customAttributes: [
                ...formData.customAttributes,
                {
                    key: name,
                    value: value
                }
            ]
        });
    };

    const handleSubmit = async (e) => {

        try {
            e.preventDefault();

            let finalPayload;

            const parser = new DOMParser();
            const body = bodyText
            const parsedBody = parser.parseFromString(body, 'text/html'); 

            const idArr = parsedBody.querySelectorAll('[data-id]');
            const mentionIds = Array.from(idArr).map(node => node.getAttribute('data-id'));
            
            const filePromises = formData.description.attachments.map((file) => uploadFile(file));


            const completedFileArray = await Promise.all(filePromises);

            finalPayload = {
                ...formData,
                description: {
                    bodyText: bodyText,
                    mentions: mentionIds,
                    attachments: completedFileArray
                }
            };

            createTicket(finalPayload);

        } catch (e) {
            console.log(e);
            addToast({msg: `Error uploading: ${e}`, type: 'error'});
        }
    };

    const makeUpperCase = (string) => {
        return string.replace(string[0], string[0].toUpperCase());   
    }


    return (
        <div className=' bg-wisePaleGrey'>
            <div className={`transition-all w-7/9 py-7 mx-auto`}>
                <form 
                    onSubmit={handleSubmit} 
                    className='grid grid-cols-7 gap-7
                    text-bgMain'
                >
                    <div 
                        className={`
                            grid ${
                                allDepartments.length > 2
                                ? 'grid-cols-3 gap-20'
                                : 'grid-cols-2'
                            }  
                            col-start-2 col-span-5
                            `}
                    >
                        {allDepartments.map((dept) => (
                            <div
                                key={allDepartments.indexOf(dept)}
                                onClick={() => mappedTypesArray(dept)}
                                className={
                                    `
                                        ${fetchedDept?.name === dept.label 
                                            ? 'opacity-100 border scale-102 shadow-lg border-none shadow-wiseGrey1 bg-linear-to-br from-wiseGrey5 via-wiseRose4/10 to-wiseRose3/30'
                                            : fetchedDept && Object.keys(fetchedDept).length !== 0
                                            ? 'hidden'
                                            : ''
                                        }
                                        relative hover:bg-linear-to-br from-wiseGrey5 via-wiseRose4/10 to-wiseRose3/30
                                        cursor-pointer h-25 w-7/10 grid gap-2
                                        p-3 rounded-lg shadow-sm shadow-wiseGrey4
                                        transition-all hover:scale-102
                                        hover:shadow-wiseGrey2
                                    `
                                }
                                >
                                    <h2
                                        className={`
                                                font-lato font-semibold text-wiseRose3
                                            `}
                                    >
                                        {dept.label}
                                    </h2>
                                    <p
                                        className={
                                            `
                                                text-sm text-wiseGrey2/80
                                            `
                                        }
                                    >
                                        {`Raise a request for ${dept.label} using the options provided`} 
                                    </p>
                            </div>
                        ))}
                    </div>
                    {fetchedDept && Object.keys(fetchedDept).length !== 0 ? (
                        <>
                            <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2 font-lato'>
                                <label 
                                    className={`
                                            font-light
                                            text-2xl mb-4
                                        `} 
                                    htmlFor='ticketType'>
                                    What type of request?
                                </label>
                                <div
                                    className={`
                                            border-l-2 border-wiseGrey2/25
                                        `}
                                >
                                    {selectedDeptTickets.map((ticket) => (
                                        <div
                                            key={selectedDeptTickets.indexOf(ticket)}
                                            onClick={() => prepRenderFormState(ticket)}
                                            className={`
                                                    flex flex-row
                                                    ${tickTypeToRender?.label === ticket.label
                                                        ? 'opacity-100 cursor-default px-1 py-2 transition-all ml-4 w-1/2'
                                                        : tickTypeToRender && Object.keys(tickTypeToRender).length !== 0
                                                        ? 'hidden'
                                                        : 'cursor-pointer px-1 py-2 transition-all hover:bg-wiseGrey4/15 ml-4 w-1/2'
                                                    }
                                                `}    
                                        >
                                            <h2
                                                className={`
                                                        text-wiseRose3 font-semibold
                                                    `}
                                            >
                                                {ticket.label}
                                            </h2>
                                            {tickTypeToRender && Object.keys(tickTypeToRender).length !== 0 
                                                ? (
                                                <FontAwesomeIcon
                                                    icon={faCircleXmark}
                                                    onClick={() => setTickTypeToRender(null)}
                                                    className={`
                                                            m-auto cursor-pointer text-xl transition-all duration-150
                                                            hover:text-wiseRose1
                                                            text-wiseRose3
                                                        `}
                                                />
                                                ) : (<></>)
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {tickTypeToRender && Object.keys(tickTypeToRender).length !== 0 ? (
                                <div className='grid grid-cols-1 col-start-2 col-span-5 gap-15'>
                                    {tickTypeToRender?.value?.fields?.map((field, index) => (
                                        <>
                                            <div key={index} className="grid grid-cols-1 gap-3">
                                                <label 
                                                    htmlFor={field.name} 
                                                    className="admin-form-label">
                                                        {field.name == 'file_upload' 
                                                            ? 'File Upload' 
                                                            : 
                                                            makeUpperCase(field.name)}
                                                </label>
                                                <RenderFields
                                                    formData={formData}
                                                    formStateFunc={setFormData}
                                                    bodyTextState={setBodyText}
                                                    field={field}
                                                    updateHandlerNormal={handleNormalChange}
                                                    updateHandlerCustom={handleCustAttrChange}
                                                />
                                            </div>
                                        </>
                                    ))}
                                </div>
                                
                            ) : (
                                <div className='col-start-2 col-span-5 text-center text-wiseSkin/60 py-10 font-bold'>
                                    Please select a ticket type.
                                </div>
                            )}
                        </>
                    ) : (
                        <div className='col-start-2 col-span-5 text-center text-wiseSkin/60 py-10 font-bold'>
                            Please start by selecting a department.
                        </div>
                    )}
                    <div className='flex flex-row justify-between col-start-2 col-span-5 mt-10'>
                        <button 
                            type='button'
                            onClick={() => {
                                setFetchedDept(null)
                                setTickTypeToRender(null)
                            }}
                            className={
                                `
                                    button2-no-width w-30
                                    ${fetchedDept
                                        ? ''
                                        : 'hidden'
                                    }
                                `
                            }>
                                Close
                        </button>
                        <button 
                            type='button'
                            onClick={(e) => handleSubmit(e)}
                            disabled={isUploading || isCreating} 
                            className={`
                                button1-no-width w-30
                                ${fetchedDept
                                    ? ''
                                    : 'hidden'
                                }
                            `}>
                                {isUploading || isCreating ? 'Saving...' : 'Finish'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTicket;