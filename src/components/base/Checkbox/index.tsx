import React from "react";
import "./Checkbox.css";

interface CheckboxProps {
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({checked, onChange, className}) => {
    const cName = `checkbox ${className ? className : ''}`;

    return <input className={cName} type="checkbox" checked={checked} onChange={onChange} />;
}

export default Checkbox;