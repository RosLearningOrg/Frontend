import { codeItemsTypes } from "../itemsTypes";
import VariableSelect from "../VariableSelect";

export const children = (item, propName, setItem) => {
	const itemPropsDesc = codeItemsTypes.getVar.properties;
	const value = item.properties[propName].value;

	return (
		<div className="code-item-children">
			<p>{itemPropsDesc.value.label}</p>
			<VariableSelect
				selectedVariable={value ? value : ""}
				onChange={(variable) => {
					item.properties[propName].value = variable;
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
