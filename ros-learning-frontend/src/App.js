import "./App.css";
import { useState } from "react";
import Button from "./components/Button";
import CodeEditorContent from "./components/CodeEditorContent";
import CodeEditorSidebar from "./components/CodeEditorSidebar";
import InterfaceEditorContent from "./components/InterfaceEditorContent";
import InterfaceEditorSidebar from "./components/InterfaceEditorSidebar";
import useInterface from "./context/interfaceContext";

const App = () => {
	const [selected, setSelected] = useState(0);
    const interfaceContext = useInterface([])

	const switchSelected = (index) => {
		setSelected(index);
	};

	return (
		<div className="app">
			<header>
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
				<aside>
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
				<main>
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
