import { useContext } from "react";
import SelectInput from "../SelectInput";
import { InterfaceContext } from "../../context/interfaceContext";
import { interfaceItemsTypes } from "../../blocks/interface/itemsTypes";

const CustomProperties = () => {
	const { selectedItem, setSelectedProperty } = useContext(InterfaceContext);
	if (!selectedItem?.properties) return null;

	const props = Object.entries(
		interfaceItemsTypes[selectedItem.name].properties
	).map(([name, prop]) => {
		let options = prop?.options;

		if (options) {
			options = options.map((opt) => ({
				value: opt.value,
				text: opt.name,
			}));
		}

		return {
			name: name,
			label: prop.label,
			type: prop.type,
			options: options,
			onChange: setSelectedProperty,
		};
	});

	return (
		<>
			{props.map((prop) =>
				prop.type == "select" ? (
					<SelectCustomProperty
						key={prop.name}
						prop={prop}
						item={selectedItem}
					/>
				) : (
					<PlainCustomProperty
						key={prop.name}
						prop={prop}
						item={selectedItem}
					/>
				)
			)}
		</>
	);
};

const SelectCustomProperty = ({ prop, item }) => {
	return (
		<>
			<label htmlFor={prop.name}>{prop.label}</label>
			<SelectInput
				name={prop.name}
				items={prop.options}
				noDefault={true}
				selected={(item.properties[prop.name] ??= "")}
				onChange={(value) => {
					item.properties[prop.name] = value;
					prop.onChange(item);
				}}
			/>
		</>
	);
};

const PlainCustomProperty = ({ prop, item }) => {
	return (
		<>
			<label htmlFor={prop.name}>{prop.label}</label>
			<input
				name={prop.name}
				type={prop.type}
				value={(item.properties[prop.name] ??= "")}
				onChange={(e) => {
					item.properties[prop.name] = e.target.value;
					prop.onChange(item);
				}}
			/>
		</>
	);
};

export default CustomProperties;
