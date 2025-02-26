import { codeItemsTypes } from "../itemsTypes";
import DisplayItemSelect from "../DisplayItemSelect";
import DisplayItemPropertySelect from "../DisplayItemPropertySelect";
import DisplayItemPropertyValueSelect from "../DisplayItemPropertyValueSelect";
import CodeItemChildren from "../CodeItemChildren";

export const children = (item, setItem) => {
	const itemPropsDesc = codeItemsTypes.setItem.properties;

	return (
		<>
			<p className="code-item-order">{item.order + 1}</p>
			<p>{itemPropsDesc.item.label}</p>
			<DisplayItemSelect
				selectedItemId={item.properties.item}
				onChange={(id) => {
					item.properties.item = +id == 0 ? null : +id;
					item.properties.property = itemPropsDesc.property.value;
					item.properties.value = itemPropsDesc.value.value;
					setItem(item);
				}}
			/>

			{item.properties.item && (
				<>
					<p>{itemPropsDesc.property.label}</p>
					<DisplayItemPropertySelect
						displayItemId={item.properties.item}
						selectedPropertyName={item.properties.property}
						onChange={(propertyName, propertyType) => {
							item.properties.property = propertyName;
							item.properties.value = itemPropsDesc.value.value;
                            item.properties.value.valueType = propertyType;
							setItem(item);
						}}
					/>
				</>
			)}

			{item.properties.value.valueType == "select" &&
				item.properties.property && (
					<>
						<p>{itemPropsDesc.value.label}</p>
						<DisplayItemPropertyValueSelect
							displayItemId={item.properties.item}
							property={item.properties.property}
							selectedValue={item.properties.value.value}
							onChange={(value) => {
								item.properties.value = {
									type: "value",
                                    valueType: "select",
									value: value,
								};
								setItem(item);
							}}
						/>
					</>
				)}

			{item.properties.value.valueType != "select" &&
				item.properties.property && (
                    <CodeItemChildren 
                        item={item}
                        propName="value"
                        setItem={setItem}
                    />
				)}
		</>
	);
};
