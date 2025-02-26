import { codeItemsTypes } from "../itemsTypes";
import CodeItemChildren from "../CodeItemChildren";
import VariableSelect from "../VariableSelect";

export const children = (item, setItem) => {
	const itemPropsDesc = codeItemsTypes.setVar.properties;

	return (
		<>
			<p className="code-item-order">{item.order + 1}</p>
			<p>{itemPropsDesc.variable.label}</p>
			<VariableSelect
				selectedVariable={item.properties.variable}
				onChange={(variable) => {
					item.properties.variable = variable;
					item.properties.value = itemPropsDesc.value.value;
					setItem(item);
				}}
			/>

			{item.properties.variable && (
				<CodeItemChildren
					item={item}
					propName="value"
					setItem={setItem}
				/>
			)}
		</>
	);
};
