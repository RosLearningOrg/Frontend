import "./SidebarItems.css";
import { useContext } from "react";
import { codeItemsTypes } from "../../blocks/code/itemsTypes";
import { CodeContext } from "../../context/codeContext";
import { Rnd } from "react-rnd";

const SidebarItems = () => {
	const { addItem, setItem, selectedFunc, codeItems } =
		useContext(CodeContext);
	const ITEM_HEIGHT = 56;

	const addBlock = (e, name) => {
		const codeItem = e.target.closest(".code-item");

		if (codeItem) {
			addItem(name, +codeItem.getAttribute("data-order"));
			return;
		}
		if (e.target.closest(".code-container")) {
			addItem(name, -1);
			return;
		}
	};

	const addChildren = (e, name) => {
		const childrenSlot = e.target.closest(".code-item-children-slot");
		if (!childrenSlot) return;

		const itemId = childrenSlot.getAttribute("data-item-id");
		const itemPropname = childrenSlot.getAttribute("data-item-propname");
		const item = codeItems[selectedFunc].find((item) => item.id == itemId);

		const itemValueType = item.properties[itemPropname].valueType;
		const childItemValueType = codeItemsTypes[name].valueType;
		if (itemValueType == "number" && childItemValueType == "text") return;

		const newItem = JSON.parse(JSON.stringify(item));
		newItem.properties[itemPropname].type = name;
		setItem(newItem);
	};

	return (
		<>
			{Object.entries(codeItemsTypes).map(([, item], index) => (
				<div
					className="code-sidebar-item"
					key={index}
					style={{
						position: "relative",
					}}
				>
					<div
						className={
							item.type == "block"
								? "code-sidebar-item-inner"
								: "code-sidebar-item-children-inner"
						}
					>
						{item.title}
					</div>
				</div>
			))}

			{Object.entries(codeItemsTypes).map(([name, item], index) => (
				<Rnd
					className="code-sidebar-item"
					key={index}
					size={{ width: "100%", height: ITEM_HEIGHT }}
					position={{ x: 0, y: index * ITEM_HEIGHT }}
					style={{
						position: "relative",
						zIndex: 999,
					}}
					onDragStart={(_e, d) => {
						d.node.style.zIndex = 1000;
					}}
					onDragStop={(e, d) => {
						d.node.style.zIndex = 999;
						if (item.type == "block") {
							addBlock(e, name);
						} else if (item.type == "children") {
							addChildren(e, name);
						}
					}}
					enableResizing={{
						bottom: false,
						bottomLeft: false,
						bottomRight: false,
						left: false,
						right: false,
						top: false,
						topLeft: false,
						topRight: false,
					}}
				>
					<div
						className={
							item.type == "block"
								? "code-sidebar-item-inner"
								: "code-sidebar-item-children-inner"
						}
					>
						{item.title}
					</div>
				</Rnd>
			))}
		</>
	);
};

export default SidebarItems;
