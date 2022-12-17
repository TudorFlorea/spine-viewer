import React from "react";

interface ButtonProps {
    label: string;
    onClick: () => void;
    style?: React.CSSProperties;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({label, onClick, className = '', style = {}}) => {
    return <button onClick={onClick} className={className} style={style}>{label}</button>
}

export default Button;