import "./SidebarItems.css";
import { useContext } from "react";
import { codeItemsTypes } from "../../code/itemsTypes";
import { CodeContext } from "../../context/codeContext";
import { Rnd } from "react-rnd";

const SidebarItems = () => {
	const { addItem } = useContext(CodeContext);
	const ITEM_HEIGHT = 56;

	return (
		<>
			{Object.entries(codeItemsTypes).map(([name, item], index) => (
				<div
					className="code-sidebar-item"
					key={index}
					style={{
						position: "relative",
					}}
				>
					<div className="code-sidebar-item-inner">{item.title}</div>
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
						const codeItem = e.target.closest(".code-item");

						if (codeItem) {
							addItem(
								name,
								item,
								+codeItem.getAttribute("data-order")
							);
							return;
						}
						if (e.target.closest(".code-container")) {
							addItem(name, item, -1);
							return;
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
					<div className="code-sidebar-item-inner">{item.title}</div>
				</Rnd>
			))}
		</>
	);
};

export default SidebarItems;
