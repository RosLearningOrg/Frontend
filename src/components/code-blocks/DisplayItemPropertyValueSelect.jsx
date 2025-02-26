import { useContext } from "react";
import SelectInput from "../components/SelectInput";
import { EditorContext } from "../context/editorContext";
import { interfaceItemsTypes } from "../../blocks/interface/itemsTypes";

const DisplayItemPropertyValueSelect = ({
	displayItemId,
	property,
	selectedValue,
	onChange,
}) => {
	const { displayItems } = useContext(EditorContext);
	const displayItem = displayItems.find((i) => i.id == displayItemId);
	const displayItemProperties =
		interfaceItemsTypes[displayItem.name].properties;

	return (
		<SelectInput
			items={displayItemProperties[property].options.map((opt) => ({
				value: opt.value,
				text: opt.name,
			}))}
			selected={selectedValue}
			onChange={(value) => onChange(value)}
		/>
	);
};

export default DisplayItemPropertyValueSelect;
