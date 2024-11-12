import "./SidebarItems.css"
import { useContext } from "react";
import { interfaceItemsTypes } from "../../interface/itemsTypes";
import { InterfaceContext } from "../../context/interfaceContext";

const InterfaceEditorSidebarItems = () => {
	const { addItem } = useContext(InterfaceContext);

	return (
		<>
			{Object.entries(interfaceItemsTypes).map(([name, item], index) => (
				<div
					key={index}
					className="interface-sidebar-item"
					onClick={() => addItem(name, item)}
				>
					<p className="item-name">{item.title}</p>
					<p className="hint">{item.description}</p>
					<div className="item-view">
						{interfaceItemsTypes[name].children({})}
					</div>
				</div>
			))}
		</>
	);
};

export default InterfaceEditorSidebarItems;
