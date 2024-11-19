import "./LeftSidebar.css";
import { useState } from "react";
import SidebarItems from "./SidebarItems";
import SidebarVariables from "./SidebarVariables";

const CodeEditorLeftSidebar = () => {
	const [selected, setSelected] = useState(0);

	return (
		<>
			<div className="code-sidebar-tabs">
				<div
					onClick={() => setSelected(0)}
					data-selected={selected == 0 ? true : false}
				>
					Элементы
				</div>
				<div
					onClick={() => setSelected(1)}
					data-selected={selected == 1 ? true : false}
				>
					Переменные
				</div>
			</div>
			<div
                className="code-items-sidebar-inner"
				data-state={selected == 0 ? "visible" : "hidden"}
			>
                <SidebarItems />
			</div>
			<div
				className="code-sidebar-inner"
				data-state={selected == 1 ? "visible" : "hidden"}
			>
                <SidebarVariables />
			</div>
		</>
	);
};

export default CodeEditorLeftSidebar;
