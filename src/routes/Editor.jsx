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

const Editor = () => {
	const [selected, setSelected] = useState(0);
	const switchSelected = (index) => setSelected(index);

	return (
		<div className="editor-layout">
			<EditorContextProvider>
				<header className="editor-header">
					<button
						onClick={() => switchSelected(0)}
						data-variant={selected == 0 ? "primary" : "tonal"}
					>
						Редактировать код
					</button>
					<button
						onClick={() => switchSelected(1)}
						data-variant={selected == 1 ? "primary" : "tonal"}
					>
						Редактировать интерфейс
					</button>
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
			</EditorContextProvider>
		</div>
	);
};

export default Editor;
