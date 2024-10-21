import "./SidebarMenu.css";
import { useContext } from "react";
import { InterfaceContext } from "../../context/interfaceContext";
import SelectInput from "../SelectInput";

const InterfaceEditorSidebarMenu = () => {
	const { selectedItem, removeSelected, setSelected, setSelectedProperty } =
		useContext(InterfaceContext);

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
					onChange={(e) =>
						setSelectedProperty("width", e.target.value)
					}
				/>
				<DefaultProperty
					name="height"
					title="Высота"
					value={selectedItem.height}
					onChange={(e) =>
						setSelectedProperty("height", e.target.value)
					}
				/>
				<DefaultProperty
					name="posX"
					title="Позиция X"
					value={selectedItem.posX}
					onChange={(e) =>
						setSelectedProperty("posX", e.target.value)
					}
				/>
				<DefaultProperty
					name="posY"
					title="Позиция Y"
					value={selectedItem.posY}
					onChange={(e) =>
						setSelectedProperty("posY", e.target.value)
					}
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
			{Object.entries(item.properties).map(([name, prop]) => {
				if (prop.type == "select")
					return (
						<div key={name}>
							<label htmlFor={name}>{prop.label}</label>
							<SelectInput
								name={name}
								items={prop.options.map((opt) => ({
									value: opt.value,
									text: opt.name,
								}))}
                                noDefault={true}
								selected={item.properties[name].value}
								onChange={(value) => {
									item.properties[name].value = value;
									setFunc(item);
								}}
							/>
						</div>
					);
				else
					return (
						<div key={name}>
							<label htmlFor={name}>{prop.label}</label>
							<input
								name={name}
								type={prop.type}
								value={prop.value}
								onChange={(e) => {
									item.properties[name].value =
										e.target.value;
									setFunc(item);
								}}
							/>
						</div>
					);
			})}
		</>
	);
};

export default InterfaceEditorSidebarMenu;
