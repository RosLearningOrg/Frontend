import { useContext } from "react";
import { CodeContext } from "../../context/codeContext";

const CodeEditorSidebar = () => {
	const { addItem } = useContext(CodeContext);

	return (
		<>
			<button
				data-varian="primary"
				onClick={() => {
					addItem();
				}}
			>
				add item
			</button>
		</>
	);
};

export default CodeEditorSidebar;
