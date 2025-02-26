import { codeItemsTypes } from "../../blocks/code/itemsTypes";

const CodeItemChildren = ({ item, propName, setItem }) => {
	const itemPropsDesc = codeItemsTypes[item.name].properties;
	const label = itemPropsDesc[propName].label;
	const prop = item.properties[propName];

	return (
		<>
			<p>{label}</p>
			{prop.type ? (
				<>{codeItemsTypes[prop.type].children(item, propName, setItem)}</>
			) : (
				<>
					<div
						className="code-item-children-slot"
						data-item-id={item.id}
						data-item-propname={propName}
					>
						{prop.valueType == "number" && "число"}
						{prop.valueType == "text" && "текст"}
					</div>
				</>
			)}
		</>
	);
};

export default CodeItemChildren;
