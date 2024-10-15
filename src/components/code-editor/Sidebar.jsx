import { useContext } from "react";
import { CodeContext } from "../../context/codeContext";

const CodeEditorSidebar = () => {
	const { addItem } = useContext(CodeContext);

	return (
		<>
			<button onClick={() => addItem("Item")}>add item</button>
			<button onClick={() => addItem("If start")}>add if start</button>
			<button onClick={() => addItem("If end")}>add if end </button>
		</>
	);
};

export default CodeEditorSidebar;
