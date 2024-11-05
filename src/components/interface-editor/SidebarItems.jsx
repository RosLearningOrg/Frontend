import "./SidebarItems.css"
import { useContext } from "react";
import { interfaceItemsTypes } from "../../interface/itemsTypes";
import { InterfaceContext } from "../../context/interfaceContext";

const InterfaceEditorSidebarItems = () => {
	const { addItem } = useContext(InterfaceContext);

	return (
		<>
			{interfaceItemsTypes.map((item, index) => (
				<div
					key={index}
					className="interface-sidebar-item"
					onClick={() => addItem(item)}
				>
					<p className="item-name">{item.name}</p>
					<p className="hint">{item.description}</p>
					<div className="item-view">
						{item.children(item.properties)}
					</div>
				</div>
			))}
		</>
	);
};

export default InterfaceEditorSidebarItems;
