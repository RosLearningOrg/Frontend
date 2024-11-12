import "./SidebarMenu.css";
import { useContext } from "react";
import { InterfaceContext } from "../../context/interfaceContext";
import DefaultProperties from "./SidebarMenuDefaultProps";
import CustomProperties from "./SidebarMenuCustomProps";
import { interfaceItemsTypes } from "../../interface/itemsTypes";

const InterfaceEditorSidebarMenu = () => {
	const { selectedItem, removeSelected } = useContext(InterfaceContext);

	return (
		<>
			<div className="menu-info">
				<p>{interfaceItemsTypes[selectedItem.name]?.title}</p>
				<p className="hint">
					{interfaceItemsTypes[selectedItem.name]?.description}
				</p>
			</div>
			<div className="menu-custom-property">
				<CustomProperties />
			</div>
			<div className="menu-properties">
				<DefaultProperties />
			</div>
			<button data-variant="tonal" onClick={removeSelected}>
				Удалить элемент
			</button>
		</>
	);
};

export default InterfaceEditorSidebarMenu;
