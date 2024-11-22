import { codeItemsTypes } from "../itemsTypes";

export const children = (item, propName, setItem) => {
	const itemPropsDesc = codeItemsTypes.numberValue.properties;
	const value = item.properties[propName].value;

	return (
		<div className="code-item-children">
			<p>{itemPropsDesc.number.label}</p>
			<input
				type="number"
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
