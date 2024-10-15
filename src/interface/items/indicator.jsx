export const children = (props) => {
	const styleOn = {
		background: "#3a6",
	};

	const styleOff = {
		background: "#b22",
	};

	return <div style={props.state.value == "true" ? styleOn : styleOff}></div>;
};
