import React, { useContext } from "react";
import { Rnd } from "react-rnd";
import { InterfaceContext } from "../context/interfaceContext";
import "./InterfaceEditorContent.css"

const InterfaceEditorContent = () => {
	const { interfaceItems, addInterfaceItem } = useContext(InterfaceContext);

	return (
		<>
			{interfaceItems.map((item) => {
				return (
					<Rnd
						key={item}
						default={{ x: 0, y: 0, width: 100, height: 50 }}
						className="draggable-element"
					></Rnd>
				);
			})}
		</>
	);
};

export default InterfaceEditorContent;
