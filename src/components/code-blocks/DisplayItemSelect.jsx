import { useContext } from "react";
import SelectInput from "../components/SelectInput";
import { EditorContext } from "../context/editorContext";
import { interfaceItemsTypes } from "../../blocks/interface/itemsTypes";

const DisplayItemSelect = ({ selectedItemId, onChange }) => {
	const { displayItems } = useContext(EditorContext);

	return (
		<SelectInput
			items={displayItems.map((item) => ({
				value: item.id,
				text: `${item.id}: ${interfaceItemsTypes[item.name].title}`,
			}))}
			selected={selectedItemId}
			onChange={(id) => onChange(id)}
		/>
	);
};

export default DisplayItemSelect;
