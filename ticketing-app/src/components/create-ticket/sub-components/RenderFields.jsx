import { RichTextEditor } from "../../tip-tap-text-editor/TipTap";
import React from "react";
import { FileUpload } from "./FileUpload";

function RenderFields ({field, updateHandlerNormal, formData, updateHandlerCustom, formStateFunc}) {

    const fieldName = field.name;
    const expectedType = field.expectedType;

    const checkType = () => {
        switch(true) {
            case expectedType.toLowerCase() === 'fileupload':
                return fileUpload();
            case expectedType.toLowerCase() === 'string':
                return text();
            case expectedType.toLowerCase() === 'date':
                return date();
            case expectedType.toLowerCase() === 'boolean':
                return boolean();
            case expectedType.toLowerCase() === 'textarea':
                return textarea();
        };
    }


    const text = () => {
        return (
            <>
                <input
                    className="admin-form-control"
                    type="text"
                    name={fieldName}
                    value={formData.fieldName}
                    onChange={(e) => fieldName.toLowerCase() === 'title' ? updateHandlerNormal(e) : updateHandlerCustom(e.target.name, e.target.value)}
                    placeholder="Type something..."
                />
            </>
        );
    };

    const date = () => {
        return (
            <>
                <input
                    className=""
                    type="date"
                    name={fieldName}
                    value={formData.fieldName}
                    onChange={(e) => updateHandlerCustom(e.target.name, e.target.value)}
                />
            </>
        );
    };

    const boolean = () => {
        return (
            <>
                <div>
                    <label>True</label>
                    <input
                        type="radio"
                        name={fieldName}
                        value={true}
                        onChange={(e) => updateHandlerCustom(e.target.name, e.target.value)}
                    />
                </div>
                <div>
                    <label>False</label>
                    <input
                        type="radio"
                        name={fieldName}
                        value={false}
                        onChange={(e) => updateHandlerCustom(e.target.name, e.target.value)}
                    />
                </div>
            </>
        );
    };

    const textarea = () => {
        return (
            <div className=" text-bgMain border border-wiseSkin/40 bg-wiseOffWhite rounded-md p-4 focus-within:ring-2 focus-within:ring-wiseSkin">
                <RichTextEditor
                    formStateFunc={formStateFunc}
                    form={formData}
                />
            </div>
        )
    };

    const fileUpload = () => {
        return (
            <FileUpload
                formData={formData}
                formStateFunc={formStateFunc}
                fieldName={fieldName}
            />
        )
    }

    return (
        <>
            {checkType()}
        </>
    )


};

export {
    RenderFields
};