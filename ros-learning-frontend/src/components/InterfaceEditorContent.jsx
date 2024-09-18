import React, { useContext } from "react";
import { Rnd } from "react-rnd";
import { InterfaceContext } from "../context/interfaceContext";
import "./InterfaceEditorContent.css";

const InterfaceEditorContent = () => {
	const { interfaceItems } = useContext(InterfaceContext);

	return (
		<>
			{interfaceItems.map((item) => {
				return (
					<Rnd
						key={item.id}
						default={{
							x: 0,
							y: 0,
							width: item.type.defaultWidth,
							height: item.type.defaultHeight,
						}}
						className="interface-item"
						bounds="parent"
						style={item.type.style}
					>
                        {item.type.children}
					</Rnd>
				);
			})}
		</>
	);
};

export default InterfaceEditorContent;
