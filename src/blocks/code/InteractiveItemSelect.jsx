import { useContext } from "react";
import SelectInput from "../../components/SelectInput";
import { EditorContext } from "../../context/editorContext";
import { interfaceItemsTypes } from "../interface/itemsTypes";

const InteractiveItemSelect = ({ selectedItemId, onChange }) => {
	const { interactiveItems } = useContext(EditorContext);

	return (
		<SelectInput
			items={interactiveItems.map((item) => ({
				value: item.id,
				text: `${item.id}: ${interfaceItemsTypes[item.name].title}`,
			}))}
			selected={selectedItemId}
			onChange={(id) => onChange(+id)}
		/>
	);
};

export default InteractiveItemSelect;
