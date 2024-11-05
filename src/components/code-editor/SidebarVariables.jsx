import { useContext, useRef, useState } from "react";
import { CodeContext } from "../../context/codeContext";

const SidebarVariables = () => {
	const { variables, setVar, removeVar } = useContext(CodeContext);
	const [creatingVar, setCreatingVar] = useState(false);
	const varNameInput = useRef(null);

	return (
		<>
			{Object.entries(variables).map(([name, value], index) => (
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
			))}

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
		</>
	);
};

export default SidebarVariables;
