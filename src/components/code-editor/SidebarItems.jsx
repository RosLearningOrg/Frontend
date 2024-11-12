import "./SidebarItems.css"
import { useContext } from "react";
import { codeItemsTypes } from "../../code/itemsTypes";
import { CodeContext } from "../../context/codeContext";

const SidebarItems = () => {
	const { addItem } = useContext(CodeContext);

	return (
		<>
			{Object.entries(codeItemsTypes).map(([name, item], index) => (
                <div className="code-sidebar-item"
					key={index}
					onClick={() => addItem(name, item)}
                >
					{item.title}
                </div>
			))}
		</>
	);
};

export default SidebarItems;
