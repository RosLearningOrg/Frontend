import InteractiveItemSelect from "../InteractiveItemSelect";
import { codeItemsTypes } from "../itemsTypes";

export const children = (item, propName, setItem) => {
	const itemPropsDesc = codeItemsTypes.getItem.properties;
	const value = item.properties[propName].value;

	return (
		<div className="code-item-children">
			<p>{itemPropsDesc.value.label}</p>
			<InteractiveItemSelect
				selectedItemId={value ? value : ""}
				onChange={(id) => {
					item.properties[propName].value = id;
					setItem(item);
				}}
			/>
			<button
				onClick={(e) => {
					item.properties[propName].value = null;
					item.properties[propName].type = null;
					setItem(item);
					e.stopPropagation();
				}}
				onMouseDown={(e) => {
					e.stopPropagation();
				}}
			>
				<img src="/images/delete.svg" alt="" />
			</button>
		</div>
	);
};
