import { Rnd } from "react-rnd";
import "./Content.css";
import { useContext } from "react";
import { CodeContext } from "../../context/codeContext";

const CodeEditorContent = () => {
	const { codeItems, moveItemDown, moveItemUp } = useContext(CodeContext);

	return (
		<div className="code-container">
			<div
				className="code-container-inner"
				style={{ height: codeItems.length * 70 + 10 }}
			>
				{codeItems.map((item) => {
					return (
						<Rnd
							key={item.id}
							bounds="parent"
							className="code-item"
							size={{ width: "100%", height: 70 }}
							position={{ x: 0, y: item.order * 70 }}
							dragGrid={[1, 70]}
							dragAxis="y"
							style={{ position: "relative" }}
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
								if (data.deltaY % 70 == 0 && data.deltaY > 0) {
									moveItemDown(item.id);
								}
								if (data.deltaY % 70 == 0 && data.deltaY < 0) {
									moveItemUp(item.id);
								}
							}}
						>
							<div className="code-item-inner">{item.id}</div>
						</Rnd>
					);
				})}
			</div>
		</div>
	);
};

export default CodeEditorContent;
