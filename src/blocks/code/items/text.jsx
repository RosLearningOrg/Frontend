import { codeItemsTypes } from "../itemsTypes";

export const children = (item, propName, setItem) => {
	const itemPropsDesc = codeItemsTypes.textValue.properties;
	const value = item.properties[propName].value;

	return (
		<div className="code-item-children">
			<p>{itemPropsDesc.text.label}</p>
			<input
				type="text"
				value={value ? value : ""}
				onInput={(e) => {
					item.properties[propName].value = e.target.value;
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
