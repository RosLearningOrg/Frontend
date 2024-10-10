import "./Content.css";
import { Rnd } from "react-rnd";

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
						{item.children(item.properties)}
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
