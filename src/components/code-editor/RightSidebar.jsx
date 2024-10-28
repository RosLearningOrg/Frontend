import { CodeContext } from "../../context/codeContext";
import "./RightSidebar.css";
import { useState, useContext, useRef } from "react";

const CodeEditorRightSidebar = () => {
	const [selected, setSelected] = useState(0);
	const [creatingTab, setCreatingTab] = useState(false);
	const { codeItems, selectedTab, addTab, setSelectedTab } =
		useContext(CodeContext);
	const tabNameInput = useRef(null);

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
				{Object.keys(codeItems).map((tab, index) => {
					return (
						<div
							className="code-sidebar-func"
							data-selected={selectedTab == tab ? true : false}
							key={index}
							onClick={() => {
								setSelectedTab(tab);
							}}
						>
							{tab}
						</div>
					);
				})}

				{!creatingTab && (
					<button
						data-variant="square"
						onClick={() => {
							setCreatingTab(true);
						}}
					>
						<img src="/images/plus.svg" alt="photo" />
						Создать функцию
					</button>
				)}
				{creatingTab && (
					<div className="creating-var-container">
						<img
							onClick={() => setCreatingTab(false)}
							src="/images/plus.svg"
							alt="photo"
							className="close-creating-var"
						/>
						<p>Название функции</p>
						<input type="text" ref={tabNameInput} />
						<button
							data-variant="primary"
							onClick={() => {
								addTab(tabNameInput.current.value);
								setCreatingTab(false);
							}}
						>
							Создать
						</button>
					</div>
				)}
			</div>
			<div
				className="code-sidebar-inner"
				data-state={selected == 1 ? "visible" : "hidden"}
			></div>
		</>
	);
};

export default CodeEditorRightSidebar;
