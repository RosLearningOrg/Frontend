import React, { useContext } from "react";
import { InterfaceContext } from "../context/interfaceContext";
import Button from "./Button";
import "./InterfaceEditorSidebar.css"

const InterfaceEditorSidebar = () => {
	const { interfaceItems, addInterfaceItem } = useContext(InterfaceContext);

	return (
		<div className="interface-editor-sidebar-container">
			<Button variant="unselected" onClick={addInterfaceItem}>Create element</Button>
		</div>
	);
};

export default InterfaceEditorSidebar;
