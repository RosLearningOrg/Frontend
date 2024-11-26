import { useContext } from "react";
import SelectInput from "../components/SelectInput";
import { CodeContext } from "../context/codeContext";

const VariableSelect = ({ selectedVariable, onChange }) => {
	const { variables } = useContext(CodeContext);

	return (
		<SelectInput
			items={Object.keys(variables).map((item) => ({
				value: item,
				text: item,
			}))}
			selected={selectedVariable}
			onChange={(variable) => onChange(variable)}
		/>
	);
};

export default VariableSelect;
