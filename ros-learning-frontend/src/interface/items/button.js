
export const children = (props) => {
    return <div style={style}>{props.text.value}</div>
}

export const style = {
	background: "#000",
	color: "#FFF",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
    padding: "8px",
    textAlign: "center",
    boxSizing: "border-box",
};
