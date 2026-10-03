import React from 'react';

export function InputTile({label, inputValue, updateHandler}) {

    return (
        <div
            className={
                `
                    grid grid-cols-1 gap-2
                `
            }
        >
            <label
                className='admin-form-label'
            >
                {label}
            </label>
            <input
                className='admin-form-control'
                type='text'
                placeholder='Type here...'
                value={inputValue}
                onChange={(event) => updateHandler(event.target.value)}
                >
            </input>
        </div>
    )
}