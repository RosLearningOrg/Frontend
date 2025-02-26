import { Rnd } from "react-rnd";
import "./Content.css";
import { useContext } from "react";
import { CodeContext } from "../../context/codeContext";
import { codeItemsTypes } from "../../blocks/code/itemsTypes";

const CodeEditorContent = () => {
	const { codeItems, moveItem, removeItem, setItem, selectedFunc } =
		useContext(CodeContext);
	const ITEM_HEIGHT = 50;

	return (
		<div className="code-container">
			<div
				className="code-container-inner"
				style={{
					height: codeItems[selectedFunc].length * ITEM_HEIGHT + 10 + "px",
				}}
			>
				{codeItems[selectedFunc].map((item) => {
					return (
						<Rnd
							key={selectedFunc + item.id}
							data-order={item.order}
							className="code-item"
							size={{ width: "100%", height: ITEM_HEIGHT }}
							position={{ x: 0, y: item.order * ITEM_HEIGHT }}
							style={{
								position: "absolute",
								display: "flex",
								zIndex: 1,
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
							onDragStart={(_e, d) => {
								d.node.style.zIndex = 1000;
							}}
							onDragStop={(e, d) => {
								d.node.style.zIndex = 1;

                                if (e.layerX < 0) {
                                    removeItem(item.id);
                                    return;
                                }

								const codeItem = e.target.closest(".code-item");
								if (codeItem) {
									moveItem(
										item.id,
										+codeItem.getAttribute("data-order")
									);
									return;
								}

								if (e.target.closest(".code-container")) {
									if (
										d.y >
										(codeItems[selectedFunc].length - 1) *
											ITEM_HEIGHT
									) {
										moveItem(item.id, -1);
										return;
									} else return;
								}

								removeItem(item.id);
							}}
						>
							<div className="code-item-inner">
								{codeItemsTypes[item.name].children(
									item,
									setItem,
								)}
							</div>
						</Rnd>
					);
				})}
			</div>
		</div>
	);
};

export default CodeEditorContent;
