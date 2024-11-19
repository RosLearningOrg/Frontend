import * as Set from "./items/set";

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
				value: null,
			},
		},
	},
	ok: {
		title: "zadolbalsya",
        type: "children",
        children: Set.children,
		properties: {
			item: {
				label: "zadolbalsya",
				value: null,
			},
			property: {
				label: "значение",
				value: null,
			},
			value: {
				label: "равное",
				value: null,
			},
		},
	},
};
