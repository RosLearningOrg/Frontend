import React, { useContext } from "react";
import "./InterfaceEditorSidebar.css";
import Button from "./Button";
import { InterfaceContext } from "../context/interfaceContext";
import { interfaceItemsTypes } from "../interface/itemsTypes";

const InterfaceEditorSidebar = () => {
	const {
		addItem,
		deselectItem,
		removeSelected,
        getSelected,
		setSelectedWidth,
		setSelectedHeight,
		setSelectedX,
		setSelectedY,
	} = useContext(InterfaceContext);

	return (
		<div className="interface-sidebar-inner">
			<div className="interface-sidebar-items">
				{interfaceItemsTypes.map((itemProps, index) => {
					return (
						<Button
							key={index}
							variant="unselected"
							onClick={() => {
								addItem(itemProps);
							}}
						>
							Create {itemProps.name}
						</Button>
					);
				})}
			</div>
			<div
				className="interface-sidebar-item-menu"
				variant={Object.keys(getSelected()) == 0 ? "hidden" : "visible"}
			>
				<label htmlFor="width">Width</label>
				<input
					name="width"
					type="number"
					value={getSelected().width}
					onChange={(e) => setSelectedWidth(e.target.value)}
				/>
				<label htmlFor="height">Height</label>
				<input
					name="height"
					type="number"
					value={getSelected().height}
					onChange={(e) => setSelectedHeight(e.target.value)}
				/>
				<label htmlFor="posY">Position X</label>
				<input
					name="posX"
					type="number"
					value={getSelected().posX}
					onChange={(e) => setSelectedX(e.target.value)}
				/>
				<label htmlFor="posY">Position Y</label>
				<input
					name="posY"
					type="number"
					value={getSelected().posY}
					onChange={(e) => setSelectedY(e.target.value)}
				/>
				<Button onClick={removeSelected}>Remove</Button>
				<Button onClick={deselectItem}>Deselect</Button>
			</div>
		</div>
	);
};

export default InterfaceEditorSidebar;
