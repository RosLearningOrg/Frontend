export const children = (props) => {
	const style = {
		background: "#000",
		color: "#FFF",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "8px",
		textAlign: "center",
		boxSizing: "border-box",
	};

	return <div style={style}>{props.text.value}</div>;
};
