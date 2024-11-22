import { useContext } from "react";
import SelectInput from "../components/SelectInput";
import { interfaceItemsTypes } from "../interface/itemsTypes";
import { EditorContext } from "../context/editorContext";

const DisplayItemPropertySelect = ({
	displayItemId,
	selectedPropertyName,
	onChange,
}) => {
	const { displayItems } = useContext(EditorContext);
	const displayItem = displayItems.find((i) => i.id == displayItemId);
	const displayItemProperties =
		interfaceItemsTypes[displayItem.name].properties;

	return (
		<SelectInput
			name="item"
			items={Object.entries(displayItemProperties).map(
				([propname, value]) => ({
					value: propname,
					text: value.label,
				})
			)}
			selected={selectedPropertyName}
			onChange={(propertyName) =>
				onChange(
                    propertyName, 
                    displayItemProperties[propertyName]?.type ?? null
                )
			}
		/>
	);
};

export default DisplayItemPropertySelect;
