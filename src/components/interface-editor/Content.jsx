import "./Content.css";
import { Rnd } from "react-rnd";
import { useContext } from "react";
import { InterfaceContext } from "../../context/interfaceContext";
import { interfaceItemsTypes } from "../../interface/itemsTypes";

const InterfaceEditorContent = () => {
	const {
		interfaceItems,
		selectedItemId,
		selectedItem,
		selectItem,
		deselectItem,
		setSelected,
	} = useContext(InterfaceContext);

	return (
		<div className="interface-content-inner" onMouseDown={deselectItem}>
			{interfaceItems.map((item) => {
				return (
					<Rnd
						key={item.id}
						size={{ width: item.width, height: item.height }}
						position={{ x: item.posX, y: item.posY }}
						className="interface-item"
						variant={item.id == selectedItemId ? "selected" : "unselected"}
						bounds="parent"
						onMouseDown={(e) => {
							selectItem(item.id);
							e.stopPropagation();
						}}
						onResizeStart={() => {
							selectItem(item.id);
						}}
						onDrag={(_e, d) => {
							setSelected({
								...selectedItem,
								posX: d.x,
								posY: d.y,
							});
						}}
						onResize={(_e, _direction, ref, _delta, position) => {
							setSelected({
								...selectedItem,
								width: ref.offsetWidth,
								height: ref.offsetHeight,
								posX: position.x,
								posY: position.y,
							});
						}}
					>
						{interfaceItemsTypes[item.name].children(item.properties)}
						<div className="interface-item-id hint">
							id: {item.id}
						</div>
					</Rnd>
				);
			})}
		</div>
	);
};

export default InterfaceEditorContent;
