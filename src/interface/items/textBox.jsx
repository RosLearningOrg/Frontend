export const children = (props) => {
	const fontSize = props.fontsize.value + "px";
	return (
		<div
			style={{
				fontSize: fontSize,
				background: "rgba(0, 0, 0, 0.05)",
				overflow: "hidden",
				padding: "16px 8px",
				boxSizing: "border-box",
				display: "flex",
				flexDirection: "column",
                justifyContent: "center"
			}}
		>
			<p
				style={{
					textAlign: props.textalign.value,
                    verticalAlign: "middle"
				}}
			>
				{props.text.value}
			</p>
		</div>
	);
};
