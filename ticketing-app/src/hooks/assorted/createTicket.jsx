import { RichTextEditor } from "../../components/tip-tap-text-editor/TipTap";

function fieldTypeToRender (field, updateHandler, formData) {

    const fieldName = field.name;
    const expectedType = field.expectedType;
    
    const text = () => {
        return (
            <>
                <input
                    className="admin-form-control"
                    type="text"
                    name={fieldName}
                    value={formData.fieldName}
                    onChange={updateHandler}
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
                    onChange={updateHandler}
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
                        onChange={updateHandler}
                    />
                </div>
                <div>
                    <label>False</label>
                    <input
                        type="radio"
                        name={fieldName}
                        value={false}
                        onChange={updateHandler}
                    />
                </div>
            </>
        );
    };

    const textarea = () => {
        return (
            <>
                <div>
                    <RichTextEditor/>
                </div>
            </>
        )
    };

    switch(true) {
        case expectedType.toLowerCase() === 'string':
            return text();
        case expectedType.toLowerCase() === 'date':
            return date();
        case expectedType.toLowerCase() === 'boolean':
            return boolean();
        case expectedType.toLowerCase() === 'textarea':
            return textarea();
    };


    // Need to do further planning on how to implement data sources
    // const dropDown = () => {
    //     return (
    //         <>

    //         </>
    //     )
    // }
};

export {
    fieldTypeToRender
};