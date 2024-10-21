import * as Set from "./items/set"

export const codeItemsTypes = [
    {
        title: "Установить значение компонента",
        name: "setItem",
        children: Set.children,
        properties: {
            item: {
                label: "Установить для",
                value: null
            },
            property: {
                label: "значение",
                value: null
            },
            value: {
                label: "равное",
                value: null,
            },
        }
    }
]
