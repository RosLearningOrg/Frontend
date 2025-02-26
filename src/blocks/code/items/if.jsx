import CodeItemChildren from "../CodeItemChildren";
import SelectInput from "../../../components/SelectInput";

export const children = (item, setItem) => {
	const operators = [
		{
			text: "=",
			value: "eq",
		},
		{
			text: "<",
			value: "lt",
		},
		{
			text: ">",
			value: "gt",
		},
		{
			text: "<=",
			value: "lte",
		},
		{
			text: ">=",
			value: "gte",
		},
	];

	return (
		<>
			<p className="code-item-order">{item.order + 1}</p>
			<p>Если:</p>

			<CodeItemChildren item={item} propName="arg0" setItem={setItem} />

			<SelectInput
				name="operator"
				items={operators}
				selected={item.properties.operator}
                onChange={(value) => {
                    item.properties.operator = value;
                    setItem(item);
                }}
                noDefault={true}
			/>

			<CodeItemChildren item={item} propName="arg1" setItem={setItem} />
            
			<p>то</p>
		</>
	);
};
