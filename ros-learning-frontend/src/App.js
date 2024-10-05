import "./App.css";
import { useState } from "react";
import useInterface from "./context/interfaceContext";
import Button from "./components/Button";
import CodeEditorContent from "./components/code-editor/Content";
import CodeEditorSidebar from "./components/code-editor/Sidebar";
import InterfaceEditorContent from "./components/interface-editor/Content";
import InterfaceEditorSidebar from "./components/interface-editor/Sidebar";

const App = () => {
	const [selected, setSelected] = useState(0);
    const interfaceContext = useInterface([])

	const switchSelected = (index) => {
		setSelected(index);
	};

	return (
		<div className="app">
			<header className="editor-header">
				<Button
					onClick={() => switchSelected(0)}
					variant={selected == 0 ? "selected" : "unselected"}
				>
					Edit Code
				</Button>
				<Button
					onClick={() => switchSelected(1)}
					variant={selected == 1 ? "selected" : "unselected"}
				>
					Edit Interface
				</Button>
			</header>
				<aside className="editor-sidebar">
					<div
						className="sidebar-wrapper"
						state={selected == 0 ? "visible" : "hidden"}
					>
						<CodeEditorSidebar />
					</div>
					<div
						className="sidebar-wrapper"
						state={selected == 1 ? "visible" : "hidden"}
					>
						<InterfaceEditorSidebar context={interfaceContext} />
					</div>
				</aside>
				<main className="editor-content">
					<div
						className="content-wrapper"
						state={selected == 0 ? "visible" : "hidden"}
					>
						<CodeEditorContent />
					</div>
					<div
						className="content-wrapper"
						state={selected == 1 ? "visible" : "hidden"}
					>
						<InterfaceEditorContent context={interfaceContext} />
					</div>
				</main>
		</div>
	);
};

export default App;
