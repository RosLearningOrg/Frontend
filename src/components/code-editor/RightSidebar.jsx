import "./RightSidebar.css";
import { useState } from "react";
import SidebarFunctions from "./SidebarFunctions";
import SidebarAssignes from "./SidebarAssignes";

const CodeEditorRightSidebar = () => {
	const [selected, setSelected] = useState(0);

	return (
		<>
			<div className="code-sidebar-tabs">
				<div
					onClick={() => setSelected(0)}
					data-selected={selected == 0 ? true : false}
				>
					Функции
				</div>
				<div
					onClick={() => setSelected(1)}
					data-selected={selected == 1 ? true : false}
				>
					Назначение
				</div>
			</div>
			<div
				className="code-sidebar-inner"
				data-state={selected == 0 ? "visible" : "hidden"}
			>
				<SidebarFunctions />
			</div>
			<div
				className="code-sidebar-inner"
				data-state={selected == 1 ? "visible" : "hidden"}
			>
				<SidebarAssignes />
			</div>
		</>
	);
};

export default CodeEditorRightSidebar;
