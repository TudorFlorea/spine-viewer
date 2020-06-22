import React from 'react';


const CheckBox = (props) => {

    const {
        checked,
        label,
        inputClassName,
        onChange,
        labelClassName,
        wrapperClassName,
        textClassName
    } = props;

    return (
        <div className={wrapperClassName ? wrapperClassName : ""}>
            <label className={labelClassName ? labelClassName : ""}>
                <input onChange={onChange} type="checkbox" checked={checked}  className={`filled-in ${inputClassName ? inputClassName : ''}`} />
                <span className={textClassName ? textClassName : ""}>{label}</span>
            </label>
        </div>
    )
};

export default CheckBox;