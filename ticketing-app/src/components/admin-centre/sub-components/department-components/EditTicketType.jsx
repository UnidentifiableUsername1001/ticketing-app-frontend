import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { expectedTypeMapping, dataSources } from '../../../../hooks/assorted/ticketConstants';
import Select from 'react-select';

export function EditTicketType ({appendTypeFunc, showTicketState, currentTicket, index}) {

    const [editTicketType, setEditTicketType] = useState(currentTicket);

    const addNewField = () => {
        const currentState = [...editTicketType.fields, {
            name: '',
            expectedType: '',
            dataSource: '',
            required: null          
        }];

        setEditTicketType({
            ...editTicketType,
            fields: currentState
        })
    };

    const removeField = (fieldIndex) => {
        const fieldsCopy = [...editTicketType.fields];
        const filteredCopy = fieldsCopy.filter((field) => fieldsCopy.indexOf(field) !== fieldIndex);
        setEditTicketType({
            ...editTicketType,
            fields: filteredCopy
        });
    };

    const handleFieldChange = (targetIndex, inputName, inputValue) => {
        const currentFieldsArray = editTicketType.fields.map((field, index)  => {
            if (index === targetIndex) {
                const newFieldObj = { ...field, [inputName]: inputValue};
                return newFieldObj;
            };
            return field;
        });

        setEditTicketType({
            ...editTicketType,
            fields: currentFieldsArray
        });
    };

    const handleSubmit = () => {
        appendTypeFunc(editTicketType, index);
        showTicketState(null);
    }

    return (
        <div>
            <div className='grid grid-cols-1 gap-2 mb-10'>
                <label htmlFor='typeName' className='admin-form-label'>Ticket Type Name -<span className='text-wiseDarkPink'>Current: {currentTicket.name}</span></label>
                <input
                    className='admin-form-control'
                    type='text'
                    name='typeName'
                    value={editTicketType.typeName}
                    onChange={(e) => setEditTicketType({...editTicketType, [e.target.name]: e.target.value})}
                    placeholder='E.g. Kit-list ammendments'
                />
            </div>
            {editTicketType.fields.map((field, index) => (
                <div key={index} className='grid grid-cols-1 gap-12'>
                    <h1 
                        className='font-bold text-xl text-wiseOffWhite text-center
                        justify-self-center w-1/2 mt-5 bg-linear-to-b from-wiseNavy to-bgMain/50
                        border-b border-wiseOffWhite'>
                        Field {index + 1}
                    </h1>
                    <div className='grid grid-cols-1 gap-2'>
                        <label className='admin-form-label' htmlFor={field.name}>Field Title - <span className='text-wiseDarkPink'>Current: {field.name}</span></label>
                        <input
                            className='admin-form-control'
                            type='text'
                            name='name'
                            placeholder='E.g. Select the equipment'
                            value={field.name}
                            onChange={(e) => handleFieldChange(index, e.target.name, e.target.value)}/>
                    </div>
                    <div className='grid grid-cols-1 gap-2'>
                        <label className='admin-form-label' htmlFor={field.expectedType}>Expected Data Type:</label>
                        <Select
                            className='text-wiseNavy'
                            value={expectedTypeMapping.find(option => option.value === field.expectedType) || null}
                            options={expectedTypeMapping}
                            onChange={(selectedOption) => handleFieldChange(index, 'expectedType', selectedOption ? selectedOption.value : '')} />
                    </div>
                    <div className='grid grid-cols-1 gap-2'>
                        <label className='admin-form-label' htmlFor={field.dataSource}>Data Source:</label>
                        <Select
                            className='text-wiseNavy'
                            value={dataSources.find(option => option.value === field.dataSource) || null}
                            options={dataSources}
                            onChange={(selectedOption) => handleFieldChange(index, 'dataSource', selectedOption ? selectedOption.value : '')} />
                    </div>
                    <div className='grid grid-cols-1 gap-2 border-b border-wiseSkin'>
                        <label className='admin-form-label' htmlFor={field.required}>Required - <span className='text-wiseDarkPink'>Current: {field.required}</span></label>
                        <div className='grid grid-cols-5 '>
                            <div className=''>
                                <label>True</label>
                                <input
                                    className='ml-3'
                                    type='radio'
                                    name='required'
                                    value={true}
                                    onChange={(e) => handleFieldChange(index, e.target.name, e.target.value)}/>
                            </div>
                            <div className=''>
                                <label>False</label>
                                <input
                                    className='ml-3'
                                    type='radio'
                                    name='required'
                                    value={false}
                                    onChange={(e) => handleFieldChange(index, e.target.name, e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row justify-evenly'>
                        {index === editTicketType.fields.length - 1 ? (
                        <button 
                            type='button' 
                            onClick={addNewField} 
                            className='nav-item'
                            title='Add New Field'>
                                <FontAwesomeIcon icon={faSquarePlus}/>
                        </button>
                        ) : (
                            <></>
                        )}
                        { editTicketType.fields.length !== 1 ? (
                        <button 
                            type='button' 
                            onClick={() => removeField(index)}
                            className='nav-item'
                            title='Delete Field'>
                                <FontAwesomeIcon icon={faTrash}/>
                        </button>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            ))}
            <div className='grid justify-items-stretch'>
                <button 
                    type='button' 
                    onClick={handleSubmit}
                    className='admin-form-button mt-10 mb-10 justify-self-center'>
                        Save 
                </button>
            </div>
        </div>

    )
}