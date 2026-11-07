import React from 'react';

export function InputTile({label, inputValue, updateHandler, type, customClass}) {

    return (
        <div
            className={
                `
                    ${customClass?.div}
                `
            }
        >
            <label
                className={customClass?.label}
            >
                {label}
            </label>
            <input
                className={customClass?.input}
                type={type}
                placeholder='Type here...'
                value={inputValue}
                onChange={(event) => updateHandler(event.target.value)}
                >
            </input>
        </div>
    )
}