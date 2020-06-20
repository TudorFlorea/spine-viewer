import React from 'react';

const TextInput = (props) => {

    const {
        wrapperClassName,
        inputClassName,
        labelClassName,
        id,
        label,
        value,
        onChange,
        type="text"
    } = props;

    return (
        <div className={`input-field ${wrapperClassName ? wrapperClassName : ''}`}>
            <input onChange={onChange} value={value} id={id} type={type} className={`validate ${inputClassName ? inputClassName : ''}`} />
            <label className={`active ${labelClassName ? labelClassName : ''}`} htmlFor={id}>{label}</label>
        </div>
    )
};

export default TextInput;