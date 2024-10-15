export const children = (props) => {
	const divStyles = {
		fontSize: props.fontsize.value + "px",
		background: "rgba(0, 0, 0, 0.05)",
		overflow: "hidden",
		padding: "16px 8px",
		boxSizing: "border-box",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	};

	const pStyles = {
		textAlign: props.textalign.value,
		verticalAlign: "middle",
	};

	return (
		<div style={divStyles}>
			<p style={pStyles}>{props.text.value}</p>
		</div>
	);
};
