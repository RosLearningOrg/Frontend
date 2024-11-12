import * as Set from "./items/set";

export const codeItemsTypes = {
	setItem: {
		title: "Установить значение компонента",
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
};
