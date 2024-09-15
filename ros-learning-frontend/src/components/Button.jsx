import React from "react";
import "./Button.css";

const Button = (props) => {
	return (
		<div className="bttn" onClick={props.onClick} variant={props.variant}>
			{props.children}
		</div>
	);
};

export default Button;
