import React from "react";

const Button = (props) => {
	const { className = "", onClick = () => {}, text = "" } = props;

	return (
		<button
			className={`waves-effect waves-light btn ${className ? className : ""}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;
