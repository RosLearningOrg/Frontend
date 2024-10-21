import "./SidebarMenu.css";
import { useContext } from "react";
import { InterfaceContext } from "../../context/interfaceContext";
import PlainProperty from "../PlainProperty";
import SelectProperty from "../SelectProperty";

const InterfaceEditorSidebarMenu = () => {
	const {
		selectedItem,
		removeSelected,
		setSelected,
		setSelectedProperty,
	} = useContext(InterfaceContext);

	return (
		<>
			<div className="menu-info">
				<p>{selectedItem.name}</p>
				<p className="hint">{selectedItem.description}</p>
			</div>
			<div className="menu-custom-property">
				<CustomProperties item={selectedItem} setFunc={setSelected} />
			</div>
			<div className="menu-properties">
				<DefaultProperty
					name="width"
					title="Ширина"
					value={selectedItem.width}
					onChange={(e) => setSelectedProperty("width", e.target.value) }
				/>
				<DefaultProperty
					name="height"
					title="Высота"
					value={selectedItem.height}
					onChange={(e) => setSelectedProperty("height", e.target.value)}
				/>
				<DefaultProperty
					name="posX"
					title="Позиция X"
					value={selectedItem.posX}
					onChange={(e) => setSelectedProperty("posX", e.target.value)}
				/>
				<DefaultProperty
					name="posY"
					title="Позиция Y"
					value={selectedItem.posY}
					onChange={(e) => setSelectedProperty("posY", e.target.value)}
				/>
			</div>
			<button data-variant="tonal" onClick={removeSelected}>
				Удалить элемент
			</button>
		</>
	);
};

const DefaultProperty = ({ name, title, value, onChange }) => {
	return (
		<div className="menu-property">
			<label htmlFor={name}>{title}</label>
			<input
				name={name}
				type="number"
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

const CustomProperties = ({ item, setFunc }) => {
	if (!item?.properties) return null;
	return (
		<>
			{Object.entries(item.properties).map(([name, prop], index) => {
				if (prop.type == "select")
					return (
						<SelectProperty
							key={index}
							name={name}
							prop={prop}
							item={item}
							setFunc={setFunc}
						/>
					);
				else
					return (
						<PlainProperty
							key={index}
							name={name}
							prop={prop}
							item={item}
							setFunc={setFunc}
						/>
					);
			})}
		</>
	);
};

export default InterfaceEditorSidebarMenu;
