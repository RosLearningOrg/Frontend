import * as Set from "./items/set";
import * as TextValue from "./items/text";
import * as NumberValue from "./items/number";

export const codeItemsTypes = {
	setItem: {
		title: "Установить значение компонента",
		type: "block",
		children: Set.children,
		properties: {
			item: {
				label: "Установить для",
				value: null,
			},
			property: {
				label: "значение",
				value: null,
			},
			value: {
				label: "равное",
				value: {
					type: null,
					valueType: null,
					value: null,
				},
			},
		},
	},
	textValue: {
		title: "Текстовое значение",
		type: "children",
		children: TextValue.children,
		valueType: "text",
		properties: {
			text: {
				label: "текст",
				value: null,
			},
		},
	},
	numberValue: {
		title: "Численное значение",
		type: "children",
		children: NumberValue.children,
		valueType: "number",
		properties: {
			number: {
				label: "число",
				value: null,
			},
		},
	},
};
