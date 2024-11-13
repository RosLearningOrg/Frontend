import "./Editor.css";
import { useState } from "react";
import CodeEditorContent from "../components/code-editor/Content";
import CodeEditorLeftSidebar from "../components/code-editor/LeftSidebar";
import CodeEditorRightSidebar from "../components/code-editor/RightSidebar";
import InterfaceEditorContent from "../components/interface-editor/Content";
import InterfaceEditorSidebar from "../components/interface-editor/Sidebar";
import InterfaceContextProvider from "../context/interfaceContext";
import CodeContextProvider from "../context/codeContext";
import EditorContextProvider from "../context/editorContext";
import EditorHeaderButtons from "../components/EditorHeaderButtons";

const Editor = () => {
	const [selected, setSelected] = useState(0);
	const changeSelected = (index) => setSelected(index);
	const switchSelected = () => setSelected((prev) => (prev ? 0 : 1));

	return (
		<EditorContextProvider>
			<div
				className="editor-layout"
				onKeyDown={(e) => {
					e.preventDefault();
					if (e.key == "Tab") switchSelected();
				}}
			>
				<header className="editor-header">
					<div className="editor-header-left-section"></div>
					<div className="editor-header-tabs">
						<button
							onClick={() => changeSelected(0)}
							data-variant={selected == 0 ? "primary" : "tonal"}
						>
							Редактировать код
						</button>
						<button
							onClick={() => changeSelected(1)}
							data-variant={selected == 1 ? "primary" : "tonal"}
						>
							Редактировать интерфейс
						</button>
					</div>
					<EditorHeaderButtons />
				</header>
				<InterfaceContextProvider>
					<div
						className="editor-wrapper"
						data-state={selected == 1 ? "visible" : "hidden"}
					>
						<aside className="editor-sidebar" data-pos="left">
							<InterfaceEditorSidebar />
						</aside>
						<main className="editor-content">
							<InterfaceEditorContent />
						</main>
					</div>
				</InterfaceContextProvider>
				<CodeContextProvider>
					<div
						className="editor-wrapper"
						data-state={selected == 0 ? "visible" : "hidden"}
					>
						<aside className="editor-sidebar" data-pos="left">
							<CodeEditorLeftSidebar />
						</aside>
						<main className="editor-content">
							<CodeEditorContent />
						</main>
						<main className="editor-sidebar" data-pos="right">
							<CodeEditorRightSidebar />
						</main>
					</div>
				</CodeContextProvider>
			</div>
		</EditorContextProvider>
	);
};

export default Editor;
