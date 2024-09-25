import React, { useContext } from "react";
import { Rnd } from "react-rnd";
import { InterfaceContext } from "../context/interfaceContext";
import "./InterfaceEditorContent.css";

const InterfaceEditorContent = () => {
	const {
		interfaceItems,
		selectedItem,
		changeItem,
		selectItem,
		deselectItem,
	} = useContext(InterfaceContext);

	return (
		<div className="interface-content-inner" onMouseDown={deselectItem}>
			{interfaceItems.map((item) => {
				return (
					<Rnd
						key={item.id}
						size={{ width: item.width, height: item.height }}
                        position={{ x: item.posX, y: item.posY}}
						className="interface-item"
						variant={item.selected ? "selected" : "unselected"}
						bounds="parent"
						style={item.style}
						onMouseDown={(e) => {
							selectItem(item.id);
							e.stopPropagation();
						}}
						onDrag={(e, d) => {
                            changeItem({
                                ...selectedItem,
                                posX: d.x,
                                posY: d.y
                            })
						}}
						onResize={(e, direction, ref, delta, position) => {
							changeItem({
								...selectedItem,
								width: ref.offsetWidth,
								height: ref.offsetHeight,
							});
						}}
					>
						{item.children}
					</Rnd>
				);
			})}
		</div>
	);
};

export default InterfaceEditorContent;
