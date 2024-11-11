import { useContext } from "react";
import "./EditorHeaderButtons.css";
import { EditorContext } from "../context/editorContext";

const EditorHeaderButtons = () => {
	let { setSavingCode, setSavingInterface } = useContext(EditorContext);

	return (
		<div className="editor-header-buttons">
			<div
				className="icon-container"
				onClick={() => {
					setSavingCode(true);
					setSavingInterface(true);
				}}
			>
				save
			</div>
			<div className="icon-container">run</div>
		</div>
	);
};

export default EditorHeaderButtons;
