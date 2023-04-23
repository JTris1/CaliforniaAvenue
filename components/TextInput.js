import React from 'react'

function TextInput({ name, type, label, label_text, useInput }) {

    const [inputs, setInput] = useInput

    function handleChange(e) {
        if (useInput === undefined) return;
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        // setInput is assigning this field's value to an object with other form data
        // values is the previous value for the state (in this case it is an object with all the existing form data)
        // values is destructured so we can make a copy and addition to it. the [] around fieldName is just a way to tell JS it is the key of the key-value pair
        setInput(values => ({ ...values, [fieldName]: fieldValue }))
    }

    return (
        <span className='flex flex-col-reverse relative'>
            <input
                type={type || 'text'}
                name={name}
                placeholder=' '
                value={inputs[name] || ''}
                id={name}
                onChange={(e) => handleChange(e)}
                className={`peer border-solid border-2 border-blue-300 bg-white rounded-xl h-12 text-lg mb-5 py-2 px-4 transition-shadow focus:outline-none focus:[box-shadow:0_0_1px_3px_rgba(3,64,120,0.50)]`} />

            {type === "email" ? <span className='material-symbols-outlined text-red-500 absolute right-3 top-3 invisible peer-invalid:visible'>priority_high</span> : undefined}

            {label ? <label htmlFor={name} className={`bg-white text-gray-500 w-fit ml-3 absolute top-3 px-1 z-10 peer-focus:-translate-y-6 transition-transform peer-[:not(:placeholder-shown)]:-translate-y-6 pointer-events-none`}>{label_text}</label> : undefined}
        </span>

    )
}

export default TextInput