import "./Sidebar.css";
import InterfaceEditorSidebarMenu from "./SidebarMenu";
import { useContext } from "react";
import { InterfaceContext } from "../../context/interfaceContext";
import InterfaceEditorSidebarItems from "./SidebarItems";

const InterfaceEditorSidebar = () => {
	const { selectedItem } = useContext(InterfaceContext);

	return (
		<div className="interface-sidebar-inner">
			<div className="interface-sidebar-items">
				<InterfaceEditorSidebarItems />
			</div>
			<div
				className="interface-sidebar-menu"
				data-variant={
					Object.keys(selectedItem) == 0 ? "hidden" : "visible"
				}
			>
				<InterfaceEditorSidebarMenu />
			</div>
		</div>
	);
};


export default InterfaceEditorSidebar;
