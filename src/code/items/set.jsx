import SelectInput from "../../components/SelectInput";

export const children = (item, setItem, displayItems) => {
	const displayItem = displayItems.find(
		(_item) => _item.id == item.properties.item?.value
	);

	let property = null;
	if (displayItem) {
		property = displayItem.properties[item.properties.property.value];
	}

	return (
		<>
			<p>{item.order + 1}.</p>
			<p>{item.properties.item.label}</p>
			<SelectInput
				name="item"
				items={displayItems.map((item) => ({
					value: item.id,
					text: `${item.id}: ${item.name}`,
				}))}
				selected={item.properties.item.value}
				onChange={(id) => {
					item.properties.item.value = +id;
                    item.properties.property.value = null;
                    item.properties.value.value = null;
					setItem(item);
				}}
			/>

			{displayItem && (
				<>
					<p>{item.properties.property.label}</p>
					<SelectInput
						name="item"
						items={Object.entries(displayItem.properties).map(
							([propname, value]) => ({
								value: propname,
								text: value.label,
							})
						)}
						selected={item.properties.property.value}
						onChange={(property) => {
							item.properties.property.value = property;
                            item.properties.value.value = null;
							setItem(item);
						}}
					/>
				</>
			)}

			{property?.type == "select" && displayItem && (
				<>
					<p>{item.properties.value.label}</p>
					<SelectInput
						name="item"
						items={
							displayItem.properties[
								item.properties.property.value
							].options
						.map((opt) => ({
							value: opt.value,
							text: opt.name,
						}))}
						selected={item.properties.value.value}
						onChange={(value) => {
							item.properties.value.value = value;
							setItem(item);
						}}
					/>
				</>
			)}

			{property && property?.type != "select" && displayItem && (
				<>
					<p>{item.properties.value.label}</p>
					<input
						type={property.type}
						value={item.properties.value.value ??= ""}
						onChange={(e) => {
							item.properties.value.value = e.target.value;
							setItem(item);
						}}
					/>
				</>
			)}
		</>
	);
};
