import React from 'react';


const CheckBox = (props) => {

    const {checked, label, className, onChange} = props;

    return (
        <p>
            <label>
                <input onChange={onChange} type="checkbox" checked={checked}  className={`filled-in ${className ? className : ''}`} />
                <span>{label}</span>
            </label>
        </p>
    )
};

export default CheckBox;