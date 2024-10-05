import "./SidebarItem.css";

const InterfaceEditorSidebarItem = ({ item, onClick }) => {
	return (
		<div className="interface-sidebar-item" onClick={onClick}>
			<p className="item-name">{item.name}</p>
			<p className="hint">{item.description}</p>
			<div className="item-view" style={item.style}>
				{item.children}
			</div>
		</div>
	);
};

export default InterfaceEditorSidebarItem;
