import "./Sidebar.css";
import { useContext, useRef, useState } from "react";
import { CodeContext } from "../../context/codeContext";
import { codeItemsTypes } from "../../code/itemsTypes";

const CodeEditorSidebar = () => {
	const { addItem, variables, setVar, removeVar } = useContext(CodeContext);
	const [selected, setSelected] = useState(0);
	const [creatingVar, setCreatingVar] = useState(false);
	const varNameInput = useRef(null);

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
						<button
							data-variant="tonal"
							key={index}
							onClick={() => addItem(item)}
						>
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
						<div key={index} className="var-container">
							<img
								src="/images/delete.svg"
								alt="photo"
								className="remove-var-bttn"
								onClick={() => {
									removeVar(name);
								}}
							/>
							<p>Название:</p>
							<p>{name}</p>
							<p>Значение:</p>
							<input
								type="number"
								value={value}
								onChange={(e) => setVar(name, e.target.value)}
							/>
						</div>
					);
				})}
				{!creatingVar && (
					<button
						data-variant="square"
						onClick={() => {
							setCreatingVar(true);
						}}
					>
						<img src="/images/plus.svg" alt="photo" />
						Создать перменную
					</button>
				)}
				{creatingVar && (
					<div className="creating-var-container">
						<img
							onClick={() => setCreatingVar(false)}
							src="/images/plus.svg"
							alt="photo"
							className="close-creating-var"
						/>
						<p>Название переменной</p>
						<input type="text" ref={varNameInput} />
						<button
							data-variant="primary"
							onClick={() => {
								setVar(varNameInput.current.value, 0);
								setCreatingVar(false);
							}}
						>
							Создать
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default CodeEditorSidebar;
