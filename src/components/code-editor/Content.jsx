import { Rnd } from "react-rnd";
import "./Content.css";
import { useContext } from "react";
import { CodeContext } from "../../context/codeContext";
import { EditorContext } from "../../context/editorContext";
import { codeItemsTypes } from "../../code/itemsTypes";

const CodeEditorContent = () => {
	const { codeItems, moveItemDown, moveItemUp, setItem, selectedFunc } =
		useContext(CodeContext);
	const { displayItems } = useContext(EditorContext);
	const ITEM_HEIGHT = 50;

	return (
		<div className="code-container">
			<div
				className="code-container-inner"
				style={{
					height: codeItems[selectedFunc].length * ITEM_HEIGHT + 10,
				}}
			>
				{codeItems[selectedFunc].map((item) => {
					return (
						<Rnd
							key={item.id}
							bounds="parent"
							className="code-item"
							size={{ width: "100%", height: ITEM_HEIGHT }}
							position={{ x: 0, y: item.order * ITEM_HEIGHT }}
							dragGrid={[1, ITEM_HEIGHT]}
							dragAxis="y"
							style={{ position: "relative", display: "flex" }}
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
							onDrag={(_e, data) => {
								if (
									data.deltaY % ITEM_HEIGHT == 0 &&
									data.deltaY > 0
								) {
									moveItemDown(item.id);
								}
								if (
									data.deltaY % ITEM_HEIGHT == 0 &&
									data.deltaY < 0
								) {
									moveItemUp(item.id);
								}
							}}
						>
							<div className="code-item-inner">
								{codeItemsTypes[item.name].children(
									item,
									setItem,
									displayItems
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
