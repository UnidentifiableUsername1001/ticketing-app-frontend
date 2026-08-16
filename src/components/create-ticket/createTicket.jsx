import React, { useState, useEffect, useRef, useContext } from "react";
import { config } from "../../../config";
import { useAppContext } from "../../context/authContext";
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

    // Evaluates to react-select object post-call of prepRenderFormState e.g. {label: <void>, value: {<ticketTypeObject>}}
    const [tickTypeToRender, setTickTypeToRender] = useState({})

    // I need to remember to set-up a conditional check of this variable when coding return as React will crash on-load as is
    const [selectedDept, setSelectedDept] = useState(null);
    const [fetchedDept, setFetchedDept] = useState(null)
    const [selectedDeptTickets, setSelectedDeptTickets] = useState(null)

    const allDepartments = useGetDepartments();
    const selectedDepartment = useGetOneDepartment();
    const assignableUsers = useAssignableUsers();

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
        <div className='min-h-screen bg-wisePaleGrey pt-15'>
            <div className={`transition-all w-5/9 bg-wiseOffWhite p-7 border-2 border-wiseGrey4 mx-auto`}>
                <form onSubmit={handleSubmit} className='grid grid-cols-7 gap-15 text-bgMain'>
                    <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                        <label className='admin-form-label' htmlFor='selectDepartment'>Select a department:</label>
                        <Select
                            unstyled
                            classNames={style1}
                            value={selectedDept}
                            options={allDepartments}
                            onChange={(selectedOption) => mappedTypesArray(selectedOption)} />
                    </div>
                    {fetchedDept && Object.keys(fetchedDept).length !== 0 ? (
                        <>
                            <div className='grid grid-cols-1 col-start-2 col-span-5 gap-2'>
                                <label className='admin-form-label' htmlFor='ticketType'>What type of ticket are you raising?</label>
                                <Select 
                                    unstyled
                                    value={tickTypeToRender}
                                    options={selectedDeptTickets}
                                    onChange={(selectedOption) => {prepRenderFormState(selectedOption);}}
                                    classNames={style1} />
                            </div>
                            {tickTypeToRender && Object.keys(tickTypeToRender).length !== 0 ? (
                                <div className='grid grid-cols-1 col-start-2 col-span-5 gap-15'>
                                    {tickTypeToRender.value.fields.map((field, index) => (
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
                                                    formStateFunc={setBodyText}
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
                            <div className='grid grid-cols-1 col-start-5 col-end-9 justify-items-stretch'>
                                <button 
                                    type='submit'
                                    disabled={isUploading || isCreating} 
                                    className='admin-form-button justify-self-end'>
                                        {isUploading || isCreating ? 'Saving...' : 'Finish'}
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