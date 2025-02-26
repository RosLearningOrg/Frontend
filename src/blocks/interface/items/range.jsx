export const children = (props) => {
	const value = props?.value ?? 0;

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

	const inputStyle = {
		width: "100%",
	};

	return (
		<div style={style}>
			<input
				style={inputStyle}
				type="range"
				value={value * 100}
				min={0}
				max={100}
				onChange={(e) => {
					props.value = e.target.value;
				}}
			/>
		</div>
	);
};
