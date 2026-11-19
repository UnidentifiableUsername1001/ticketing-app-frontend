import {useState} from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { expectedTypeMapping, dataSources } from '../../../../hooks/assorted/ticketConstants';
import { style1 } from '../../../../hooks/assorted/react-select-styles';

export function AddTicketType ({appendTypeFunc, setShowForm, showForm }) {

    const [newTicketType, setNewTicketType] = useState({
        typeName: '',
        fields: [{
            name: '',
            expectedType: '',
            dataSource: '',
            required: null
        }]
    });

    const addNewField = () => {
        const currentState = [...newTicketType.fields, {
            name: '',
            expectedType: '',
            dataSource: '',
            required: null          
        }];

        setNewTicketType({
            ...newTicketType,
            fields: currentState
        })
    };

    const removeField = (fieldIndex) => {
        const fieldsCopy = [...newTicketType.fields];
        const filteredCopy = fieldsCopy.filter((field) => fieldsCopy.indexOf(field) !== fieldIndex);
        setNewTicketType({
            ...newTicketType,
            fields: filteredCopy
        });
    };

    const handleFieldChange = (targetIndex, inputName, inputValue) => {

        const currentFieldsArray = newTicketType.fields.map((field, index)  => {
            if (index === targetIndex) {
                const newFieldObj = {...field, [inputName]: inputValue};
                return newFieldObj;
            };
            return field;
        });

        setNewTicketType({
            ...newTicketType,
            fields: currentFieldsArray
        });
    };

    const handleSubmit = () => {
        appendTypeFunc(newTicketType);
        setNewTicketType({
            typeName: '',
            fields: [{
                name: '',
                expectedType: '',
                dataSource: '',
                required: null
            }]
        });
        setShowForm(false);
    }

    return (
        <div
            className={`
                rounded-x flex flex-col gap-10 px-4 w-200
                ${showForm 
                    ? '' 
                    : 'hidden'
                } 
            `}
        >
            <div className='flex flex-col gap-4 w-1/3'>
                <label htmlFor='typeName' className='admin-form-label text-xl'>
                    Request Name
                </label>
                <input
                    className='admin-form-control'
                    type='text'
                    name='typeName'
                    value={newTicketType.typeName}
                    onChange={(e) => setNewTicketType({...newTicketType, [e.target.name]: e.target.value})}
                    placeholder='E.g. Kit-list ammendments'
                />
            </div>
            {newTicketType.fields.map((field, index) => (
                <>
                <div key={index} className='
                    flex flex-col gap-10 border border-wiseGrey4/40 shadow-lg p-5
                    rounded-xl
                '>
                    <div
                        className='
                            flex flex-row justify-between
                        '
                    >
                        <h1 
                            className='
                                font-bold text-2xl text-wiseGrey2
                                col-span-2 
                            '>
                            Field {index + 1}
                        </h1>
                        <div className='flex flex-row '>
                            { newTicketType.fields.length !== 1 ? (
                            <button 
                                type='button' 
                                onClick={() => removeField(index)}
                                className='
                                    text-2xl text-wiseRose3 hover:text-wiseRose4 cursor-pointer
                                    transition-all duration-150
                                '
                                title='Delete Field'>
                                    <FontAwesomeIcon icon={faTrash}/>
                            </button>
                            ) : (
                                <></>
                            )}
                        </div>    
                    </div>
                    
                    <div className='grid grid-cols-1 gap-2 col-span-2 '>
                        <label className='admin-form-label' htmlFor={field.name}>Title</label>
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
                            unstyled
                            classNames={style1}
                            value={expectedTypeMapping.find(option => option.value === field.expectedType) || null}
                            options={expectedTypeMapping}
                            onChange={(selectedOption) => handleFieldChange(index, 'expectedType', selectedOption ? selectedOption.value : '')} />
                    </div>
                    {newTicketType.fields[index].expectedType === 'Dropdown'
                        ? (
                            <div className='grid grid-cols-1 gap-2'>
                                <label className='admin-form-label' htmlFor={field.dataSource}>Data Source:</label>
                                <Select
                                    unstyled
                                    classNames={style1}
                                    value={dataSources.find(option => option.value === field.dataSource) || null}
                                    options={dataSources}
                                    onChange={(selectedOption) => handleFieldChange(index, 'dataSource', selectedOption ? selectedOption.value : '')} />
                            </div>
                        )
                        : (
                            <></>
                        )
                    }
                    
                    <div className='grid grid-cols-1 gap-2'>
                        <label className='admin-form-label' htmlFor={field.required}>
                            Required
                        </label>
                        <Select
                            unstyled
                            classNames={style1}
                            onChange={(option) => handleFieldChange(index, option.label, option.value)}
                            options={[
                                {
                                    label: 'Yes',
                                    value: true
                                },
                                {
                                    label: 'No',
                                    value: false
                                }
                            ]}
                        
                        />
                    </div>
                </div>
            </>
            ))}
            <button 
                type='button' 
                onClick={addNewField} 
                className=' 
                    text-4xl text-wiseRose3 hover:text-wiseRose4 cursor-pointer
                    transition-all duration-150 w-fit self-center
                '
                title='Add New Field'>
                    <FontAwesomeIcon 
                        icon={faSquarePlus}
                        className='
                            px-3 
                        '
                    />
            </button>
            <div className='
                flex flex-row gap-2 justify-end
            '>
                <button 
                    type='button' 
                    onClick={() => {
                        setNewTicketType({
                            typeName: '',
                            fields: [{
                                name: '',
                                expectedType: '',
                                dataSource: '',
                                required: null
                            }]
                        });
                        setShowForm(false)
                    }}
                    className='
                        w-20 rounded-lg font-bold hover:bg-wiseGrey4/60
                        transition-all duration-150 cursor-pointer
                    '>
                        Cancel
                </button>
                <button 
                    type='button' 
                    onClick={handleSubmit}
                    className='
                        button1-no-width
                        font-bold w-40
                    '>
                        Add Request Type
                </button>
            </div>
        </div>

    )
}