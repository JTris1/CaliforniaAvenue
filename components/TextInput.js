import React, { useState } from 'react'

function TextInput({ name, type, label, labelClassic, label_text, useParentInput, value, disabled, classes, customStyles, edit }) {
    const [input, setInput] = useState('');
    const [boxDisabled, setBoxDisabled] = useState(disabled)

    let parentInputs;
    let setParentInput;

    if (useParentInput) {
        parentInputs = useParentInput[0];
        setParentInput = useParentInput[1];
    }

    function handleChange(e) {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        if (useParentInput !== undefined) {
            // setInput is assigning this field's value to an object with other form data
            // values is the previous value for the state (in this case it is an object with all the existing form data)
            // values is destructured so we can make a copy and addition to it. the [] around fieldName is just a way to tell JS it is the key of the key-value pair
            setParentInput(values => ({ ...values, [fieldName]: fieldValue }))
        }
        else {
            setInput((old) => ([...old.split('')], fieldValue));
        }
    }

    return (
        <span className='flex flex-col-reverse relative'>
            <input
                type={type || 'text'}
                disabled={boxDisabled}
                name={name}
                placeholder=' '
                value={useParentInput !== undefined ? parentInputs[name] : input}
                id={name}
                onChange={(e) => handleChange(e)}
                className={`peer border-solid border-2 border-blue-300 rounded-xl h-12 text-lg mb-5 py-2 px-4 transition-shadow focus:outline-none focus:[box-shadow:0_0_1px_3px_rgba(3,64,120,0.50)] ${boxDisabled ? 'bg-gray-100 text-gray-500' : 'bg-white'} ${classes}`}
                style={customStyles}
            />

            {type === "email" ? <span className='material-symbols-outlined text-red-500 absolute right-3 top-3 invisible peer-invalid:visible'>priority_high</span> : undefined}

            {label ? <label htmlFor={name} className={`bg-white text-gray-500 w-fit ml-3 absolute top-3 px-1 z-10 peer-focus:-translate-y-6 transition-transform peer-[:not(:placeholder-shown)]:-translate-y-6 pointer-events-none`}>{label_text}</label> : undefined}
            {labelClassic ? <label htmlFor={name} className={`text-gray-700 w-fit mx-1 mb-2`}>{label_text}</label> : undefined}
            {edit ? <p className={`text-white text-sm bg-blue-500 rounded-lg py-1 px-2 w-fit mx-2 absolute right-0 top-[2.6rem] cursor-pointer select-none  ${!boxDisabled ? 'opacity-0 pointer-events-none' : 'opacity-100 '} transition-opacity`} onClick={() => setBoxDisabled(false)}>Edit</p> : undefined}
            {edit ? <span className={`material-symbols-outlined text-blue-500 absolute right-4 top-11 cursor-pointer select-none ${boxDisabled ? 'opacity-0 pointer-events-none' : 'opacity-100 '}`} onClick={() => setBoxDisabled(true)}>lock_open</span> : undefined}
        </span>

    )
}

export default TextInput