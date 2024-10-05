import "./Sidebar.css";
import InterfaceEditorSidebarItem from "./SidebarItem";
import { interfaceItemsTypes } from "../../interface/itemsTypes";

const InterfaceEditorSidebar = (props) => {
	const {
		selectedItem,
		addItem,
		deselectItem,
		removeSelected,
		setSelectedWidth,
		setSelectedHeight,
		setSelectedX,
		setSelectedY,
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
				className="interface-sidebar-item-menu"
				variant={Object.keys(selectedItem) == 0 ? "hidden" : "visible"}
			>
				<div className="item-menu-info">
					<p>{selectedItem.name}</p>
					<p className="hint">{selectedItem.description}</p>
				</div>
				<div className="item-menu-properties">
					<div className="item-menu-property">
						<label htmlFor="width">W</label>
						<input
							name="width"
							type="number"
							value={selectedItem.width}
							onChange={(e) => setSelectedWidth(e.target.value)}
						/>
					</div>
					<div className="item-menu-property">
						<label htmlFor="height">H</label>
						<input
							name="height"
							type="number"
							value={selectedItem.height}
							onChange={(e) => setSelectedHeight(e.target.value)}
						/>
					</div>
					<div className="item-menu-property">
						<label htmlFor="posY">X</label>
						<input
							name="posX"
							type="number"
							value={selectedItem.posX}
							onChange={(e) => setSelectedX(e.target.value)}
						/>
					</div>
					<div className="item-menu-property">
						<label htmlFor="posY">Y</label>
						<input
							name="posY"
							type="number"
							value={selectedItem.posY}
							onChange={(e) => setSelectedY(e.target.value)}
						/>
					</div>
				</div>
				<button variant="tonal" onClick={removeSelected}>Удалить элемент</button>
			</div>
		</div>
	);
};

export default InterfaceEditorSidebar;
