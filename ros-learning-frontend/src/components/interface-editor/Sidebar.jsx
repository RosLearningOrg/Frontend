import "./Sidebar.css";
import Button from "../Button";
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
				{interfaceItemsTypes.map((props, index) => {
					return (
						<Button
							key={index}
							variant="unselected"
							onClick={() => {
								addItem(props);
							}}
						>
							Create {props.name}
						</Button>
					);
				})}
			</div>
			<div
				className="interface-sidebar-item-menu"
				variant={Object.keys(selectedItem) == 0 ? "hidden" : "visible"}
			>
	                <p>{selectedItem.name}</p>
				<label htmlFor="width">Width</label>
				<input
					name="width"
					type="number"
					value={selectedItem.width}
					onChange={(e) => setSelectedWidth(e.target.value)}
				/>
				<label htmlFor="height">Height</label>
				<input
					name="height"
					type="number"
					value={selectedItem.height}
					onChange={(e) => setSelectedHeight(e.target.value)}
				/>
				<label htmlFor="posY">Position X</label>
				<input
					name="posX"
					type="number"
					value={selectedItem.posX}
					onChange={(e) => setSelectedX(e.target.value)}
				/>
				<label htmlFor="posY">Position Y</label>
				<input
					name="posY"
					type="number"
					value={selectedItem.posY}
					onChange={(e) => setSelectedY(e.target.value)}
				/>
				<Button onClick={removeSelected}>Remove</Button>
				<Button onClick={deselectItem}>Deselect</Button>
			</div>
		</div>
	);
};

export default InterfaceEditorSidebar;
