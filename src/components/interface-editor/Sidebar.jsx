import "./Sidebar.css";
import InterfaceEditorSidebarItem from "./SidebarItem";
import InterfaceEditorSidebarMenu from "./SidebarMenu";
import { useContext } from "react";
import { InterfaceContext } from "../../context/interfaceContext";
import { interfaceItemsTypes } from "../../interface/itemsTypes";

const InterfaceEditorSidebar = (props) => {
	const { selectedItem, addItem } = useContext(InterfaceContext);

	return (
		<div className="interface-sidebar-inner">
			<div className="interface-sidebar-items">
				{interfaceItemsTypes.map((item, index) => {
					return (
						<InterfaceEditorSidebarItem
							key={index}
							item={item}
							onClick={() => {
								addItem(item);
							}}
						/>
					);
				})}
			</div>
			<div
				className="interface-sidebar-menu"
				data-variant={
					Object.keys(selectedItem) == 0 ? "hidden" : "visible"
				}
			>
				<InterfaceEditorSidebarMenu context={props.context} />
			</div>
		</div>
	);
};

export default InterfaceEditorSidebar;
