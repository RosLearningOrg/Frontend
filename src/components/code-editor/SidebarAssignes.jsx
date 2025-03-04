import "./SidebarAssignes.css"
import { useContext } from "react";
import { CodeContext } from "../../context/codeContext";
import { EditorContext } from "../../context/editorContext";
import { interfaceItemsTypes } from "../../blocks/interface/itemsTypes";

const SidebarAssignes = () => {
	const { codeItems } = useContext(CodeContext);
	const { interactiveItems, assignFunc } = useContext(EditorContext);

	return (
		<>
			{interactiveItems.map((item) => (
				<div key={item.id} className="code-sidebar-assign-item">
					<p>
						{item.id}: {interfaceItemsTypes[item.name].title}
					</p>
					<select
						onChange={(e) => assignFunc(item.id, e.target.value)}
					>
						<option value="">- не выбрано -</option>
						{Object.keys(codeItems).map((name) => (
								<option value={name} key={name}>
									{name}
								</option>
						))}
					</select>
				</div>
			))}
		</>
	);
};

export default SidebarAssignes;
