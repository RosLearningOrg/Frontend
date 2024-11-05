import { useContext } from "react";
import { InterfaceContext } from "../../context/interfaceContext";

const DefaultProperties = () => {
	const { selectedItem, setSelectedProperty } = useContext(InterfaceContext);

	const props = [
		{
			name: "height",
			title: "Высота",
			type: "number",
			value: selectedItem.height,
			onChange: setSelectedProperty,
		},
		{
			name: "width",
			title: "Ширина",
			type: "number",
			value: selectedItem.width,
			onChange: setSelectedProperty,
		},
		{
			name: "posX",
			title: "Позиция X",
			type: "number",
			value: selectedItem.posX,
			onChange: setSelectedProperty,
		},
		{
			name: "posY",
			title: "Позиция Y",
			type: "number",
			value: selectedItem.posY,
			onChange: setSelectedProperty,
		},
	];

	return props.map((prop) => <DefaultProperty key={prop.name} prop={prop} />);
};

const DefaultProperty = ({ prop }) => {
	return (
		<div className="menu-property">
			<label htmlFor={prop.name}>{prop.title}</label>
			<input
				name={prop.name}
				type={prop.type}
				value={prop.value ??= ""}
				onChange={(e) => {
					prop.onChange(prop.name, e.target.value);
				}}
			/>
		</div>
	);
};

export default DefaultProperties;
