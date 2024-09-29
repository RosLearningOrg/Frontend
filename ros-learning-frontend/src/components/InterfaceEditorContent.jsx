import React from "react";
import { Rnd } from "react-rnd";
import "./InterfaceEditorContent.css";

const InterfaceEditorContent = (props) => {
	const {
		interfaceItems,
        selectedItem,
		selectItem,
		deselectItem,
		setSelected,
	} = props.context;

	return (
		<div className="interface-content-inner" onMouseDown={deselectItem}>
			{interfaceItems.map((item) => {
				return (
					<Rnd
						key={item.id}
						size={{ width: item.width, height: item.height }}
						position={{ x: item.posX, y: item.posY }}
						className="interface-item"
						variant={item.selected ? "selected" : "unselected"}
						bounds="parent"
						style={item.style}
						onMouseDown={(e) => {
							selectItem(item.id);
							e.stopPropagation();
						}}
						onResizeStart={() => {
							selectItem(item.id);
						}}
						onDrag={(e, d) => {
							setSelected({
								...selectedItem,
								posX: d.x,
								posY: d.y,
							});
						}}
						onResize={(e, direction, ref, delta, position) => {
							setSelected({
								...selectedItem,
								width: ref.offsetWidth,
								height: ref.offsetHeight,
								posX: position.x,
								posY: position.y,
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
