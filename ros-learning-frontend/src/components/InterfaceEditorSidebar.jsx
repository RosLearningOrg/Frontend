import React, { useContext } from "react";
import "./InterfaceEditorSidebar.css";
import Button from "./Button";
import { InterfaceContext } from "../context/interfaceContext";
import { interfaceItemsTypes } from "../interface/itemsTypes";

const InterfaceEditorSidebar = () => {
	const { addInterfaceItem } = useContext(InterfaceContext);

	return (
		<div className="sidebar-inner">
			{interfaceItemsTypes.map((type) => {
				return (
					<Button
						variant="unselected"
						onClick={() => {
							addInterfaceItem(type);
						}}
					>
						Create {type.name}
					</Button>
				);
			})}
		</div>
	);
};

export default InterfaceEditorSidebar;
