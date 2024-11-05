import { useContext, useRef, useState } from "react";
import { CodeContext } from "../../context/codeContext";

const SidebarFunctions = () => {
	const [creatingFunc, setCreatingFunc] = useState(false);
	const { codeItems, selectedFunc, addFunc, removeFunc, setSelectedFunc } =
		useContext(CodeContext);
	const funcNameInput = useRef(null);

	return (
		<>
			{Object.keys(codeItems).map((func, index) => (
				<div
					className="code-sidebar-func"
					data-selected={selectedFunc == func ? true : false}
					key={index}
					onClick={() => {
						setSelectedFunc(func);
					}}
				>
					{func}
					{func != "Главная" && (
						<img
							onClick={(e) => {
								e.stopPropagation();
								if (selectedFunc == func)
									setSelectedFunc("Главная");
								removeFunc(func);
							}}
							src="/images/delete.svg"
							alt="photo"
							className="remove-func-bttn"
						/>
					)}
				</div>
			))}

			{!creatingFunc && (
				<button
					data-variant="square"
					onClick={() => {
						setCreatingFunc(true);
					}}
				>
					<img src="/images/plus.svg" alt="photo" />
					Создать функцию
				</button>
			)}

			{creatingFunc && (
				<div className="creating-var-container">
					<img
						onClick={() => setCreatingFunc(false)}
						src="/images/plus.svg"
						alt="photo"
						className="close-creating-var"
					/>
					<p>Название функции</p>
					<input type="text" ref={funcNameInput} />
					<button
						data-variant="primary"
						onClick={() => {
							addFunc(funcNameInput.current.value);
							setCreatingFunc(false);
						}}
					>
						Создать
					</button>
				</div>
			)}
		</>
	);
};

export default SidebarFunctions;
