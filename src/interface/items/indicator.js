
export const children = (props) => {
    return <div style={props.state.value == "true" ? styleOn : styleOff}></div>
};

const styleOn = {
    background: "#3a6",
};

const styleOff = {
    background: "#b22",
};
