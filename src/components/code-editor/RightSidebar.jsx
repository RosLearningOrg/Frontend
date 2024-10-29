import { CodeContext } from "../../context/codeContext";
import { EditorContext } from "../../context/editorContext";
import "./RightSidebar.css";
import { useState, useContext, useRef } from "react";

const CodeEditorRightSidebar = () => {
	const [selected, setSelected] = useState(0);
	const [creatingTab, setCreatingTab] = useState(false);
	const { codeItems, selectedTab, addTab, removeTab, setSelectedTab } =
		useContext(CodeContext);
	const { interactiveItems, assignFunc } = useContext(EditorContext);
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
							{tab != "Главная" && (
								<img
									onClick={(e) => {
										e.stopPropagation();
										if (selectedTab == tab)
											setSelectedTab("Главная");
										removeTab(tab);
									}}
									src="/images/delete.svg"
									alt="photo"
									className="remove-func-bttn"
								/>
							)}
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
			>
				{interactiveItems.map((item) => {
					return (
						<>
							<p key={item.id}>
								{item.id}: {item.name}
							</p>
							<select
								onChange={(e) =>
									assignFunc(item.id, e.target.value)
								}
							>
								<option value="">- не выбрано -</option>
								{Object.keys(codeItems).map((name) => {
									return (
										<option value={name} key={name}>
											{name}
										</option>
									);
								})}
							</select>
						</>
					);
				})}
			</div>
		</>
	);
};

export default CodeEditorRightSidebar;
