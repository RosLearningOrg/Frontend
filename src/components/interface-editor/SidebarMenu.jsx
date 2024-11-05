import "./SidebarMenu.css";
import { useContext } from "react";
import { InterfaceContext } from "../../context/interfaceContext";
import DefaultProperties from "./SidebarMenuDefaultProps";
import CustomProperties from "./SidebarMenuCustomProps";

const InterfaceEditorSidebarMenu = () => {
	const { selectedItem, removeSelected } = useContext(InterfaceContext);

	return (
		<>
			<div className="menu-info">
				<p>{selectedItem.name}</p>
				<p className="hint">{selectedItem.description}</p>
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
