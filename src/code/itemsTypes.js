import * as Set from "./items/set"

export const codeItemsTypes = [
    {
        name: "Установить значение компонента",
        children: Set.children,
        properties: {
            value: {
                label: "Установить значение",
                type: "text",
                value: ""
            },
            var: {
                label: "для",
                type: "text",
                value: ""
            }
        }
    }
]
