import "./Sidebar.css"
import { useContext } from "react";
import { CodeContext } from "../../context/codeContext";
import { codeItemsTypes } from "../../code/itemsTypes";

const CodeEditorSidebar = () => {
	const { addItem } = useContext(CodeContext);

	return (
		<div className="code-sidebar-inner">
			{codeItemsTypes.map((item, index) => {
				return (
					<button key={index} onClick={() => addItem(item)}>
						{item.name}
					</button>
				);
			})}
		</div>
	);
};

export default CodeEditorSidebar;
