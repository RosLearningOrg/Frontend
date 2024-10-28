import "./Sidebar.css";
import { useContext, useState } from "react";
import { CodeContext } from "../../context/codeContext";
import { codeItemsTypes } from "../../code/itemsTypes";

const CodeEditorSidebar = () => {
	const { addItem, variables, setVar, removeVar } = useContext(CodeContext);
	const [selected, setSelected] = useState(0);

    console.log(variables)

	return (
		<>
			<div className="code-sidebar-tabs">
				<div
					onClick={() => setSelected(0)}
					data-selected={selected == 0 ? true : false}
				>
					Елементы
				</div>
				<div
					onClick={() => setSelected(1)}
					data-selected={selected == 1 ? true : false}
				>
					Переменные
				</div>
			</div>
			<div
				className="code-sidebar-inner"
				data-state={selected == 0 ? "visible" : "hidden"}
			>
				{codeItemsTypes.map((item, index) => {
					return (
						<button key={index} onClick={() => addItem(item)}>
							{item.title}
						</button>
					);
				})}
			</div>
			<div
				className="code-sidebar-inner"
				data-state={selected == 1 ? "visible" : "hidden"}
			>
                {Object.entries(variables).map(([name, value], index) => {
                    return (
                        <div key={index}>{name}, {value}</div>
                    )
                })}
                <button onClick={() => {setVar("ok", "ok")}}></button>
			</div>
		</>
	);
};

export default CodeEditorSidebar;
