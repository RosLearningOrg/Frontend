import * as Set from "./items/set";
import * as Get from "./items/get";
import * as SetVar from "./items/setVar";
import * as GetVar from "./items/getVar";
import * as TextValue from "./items/text";
import * as NumberValue from "./items/number";
import * as If from "./items/if";
import * as Endif from "./items/endif";

export const codeItemsTypes = {
	if: {
		title: "Условие",
		type: "block",
		children: If.children,
		properties: {
			arg0: {
                label: "",
				value: {
					type: null,
					valueType: null,
					value: null,
				},
			},
			operator: {
                label: "",
				value: "eq",
			},
			arg1: {
                label: "",
				value: {
					type: null,
					valueType: null,
					value: null,
				},
			},
		},
	},
    endif: {
		title: "Конец условия",
		type: "block",
		children: Endif.children,
        propertis: {}
    },
	setItem: {
		title: "Установить значение компонента",
		type: "block",
		children: Set.children,
		properties: {
			item: {
                label: "Для компонента:",
				value: null,
			},
			property: {
                label: "установить:",
				value: null,
			},
			value: {
                label: "равное:",
				value: {
					type: null,
					valueType: null,
					value: null,
				},
			},
		},
	},
	setVar: {
		title: "Установить значение переменной",
		type: "block",
		children: SetVar.children,
		properties: {
			variable: {
                label: "Для переменной:",
				value: null,
			},
			value: {
                label: "установить значение, равное:",
				value: {
					type: null,
					valueType: "number",
					value: null,
				},
			},
		},
	},
	getItem: {
		title: "Значение компонента",
		type: "children",
		children: Get.children,
		valueType: "number",
		properties: {
            value: {
                label: "компонент",
                value: null
            }
		},
	},
	getVar: {
		title: "Значение переменной",
		type: "children",
		children: GetVar.children,
		valueType: "number",
		properties: {
            value: {
                label: "перменная",
                value: null
            }
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
