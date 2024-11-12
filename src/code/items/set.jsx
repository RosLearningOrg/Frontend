import SelectInput from "../../components/SelectInput";
import { codeItemsTypes } from "../itemsTypes";
import { interfaceItemsTypes } from "../../interface/itemsTypes";

export const children = (item, setItem, displayItems) => {
	const itemPropsDesc = codeItemsTypes.setItem.properties;

	const displayItem = displayItems.find(
		(_item) => _item.id == item.properties.item
	);

	let property = null;
	if (displayItem) {
		property =
			interfaceItemsTypes[displayItem.name].properties[
				item.properties.property
			];
	}

	return (
		<>
			<p className="code-item-order">{item.order + 1}</p>
			<p>{itemPropsDesc.item.label}</p>
			<SelectInput
				name="item"
				items={displayItems.map((item) => ({
					value: item.id,
					text: `${item.id}: ${interfaceItemsTypes[item.name].title}`,
				}))}
				selected={item.properties.item}
				onChange={(id) => {
					item.properties.item = +id;
					item.properties.property = null;
					item.properties.value = null;
					setItem(item);
				}}
			/>
			{displayItem && (
				<>
					<p>{itemPropsDesc.property.label}</p>
					<SelectInput
						name="item"
						items={Object.entries(
							interfaceItemsTypes[displayItem.name].properties
						).map(([propname, value]) => ({
							value: propname,
							text: value.label,
						}))}
						selected={item.properties.property}
						onChange={(property) => {
							item.properties.property = property;
							item.properties.value = null;
							setItem(item);
						}}
					/>
				</>
			)}

			{property?.type == "select" && displayItem && (
				<>
					<p>{itemPropsDesc.value.label}</p>
					<SelectInput
						name="item"
						items={property.options.map((opt) => ({
							value: opt.value,
							text: opt.name,
						}))}
						selected={item.properties.value}
						onChange={(value) => {
							item.properties.value = value;
							setItem(item);
						}}
					/>
				</>
			)}

			{property && property?.type != "select" && displayItem && (
				<>
					<p>{itemPropsDesc.value.label}</p>
					<input
						type={property.type}
						value={(item.properties.value ??= "")}
						onChange={(e) => {
							item.properties.value = e.target.value;
							setItem(item);
						}}
					/>
				</>
			)}
		</>
	);
};
