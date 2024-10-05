import "./Sidebar.css";
import InterfaceEditorSidebarItem from "./SidebarItem";
import InterfaceEditorSidebarMenu from "./SidebarMenu";
import { interfaceItemsTypes } from "../../interface/itemsTypes";

const InterfaceEditorSidebar = (props) => {
	const {
		selectedItem,
		addItem,
	} = props.context;

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
				variant={Object.keys(selectedItem) == 0 ? "hidden" : "visible"}
			>
				<InterfaceEditorSidebarMenu context={props.context} />
			</div>
		</div>
	);
};

export default InterfaceEditorSidebar;
