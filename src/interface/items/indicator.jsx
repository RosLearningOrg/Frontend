export const children = (props) => {
    const state = props?.state ?? "true"

	const styleOn = {
		background: "#3a6",
	};

	const styleOff = {
		background: "#b22",
	};

	return <div style={state == "true" ? styleOn : styleOff}></div>;
};
