export const children = (props) => {
    const text = props?.text ?? "Введите текст"
    const fontsize = props?.fontsize ?? 14
    const textalign = props?.textalign ?? "center"

	const divStyles = {
		fontSize: fontsize + "px",
		background: "rgba(0, 0, 0, 0.05)",
		overflow: "hidden",
		padding: "16px 8px",
		boxSizing: "border-box",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	};

	const pStyles = {
		textAlign: textalign,
		verticalAlign: "middle",
	};

	return (
		<div style={divStyles}>
			<p style={pStyles}>{text}</p>
		</div>
	);
};
