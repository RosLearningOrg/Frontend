import * as Button from "./items/button";
import * as Indicator from "./items/indicator";

export const interfaceItemsTypes = [
    {
        name: "Кнопка",
        children: Button.children,
        defaultWidth: 100,
        defaultHeight: 50,
        description: "Простой элемент интерфейса, служит для выполнения некоторых действий по нажатию на него",
        properties: {
            text: {
                name: "Текст",
                type: "text",
                value: ""
            }
        }
    },
    {
        name: "Индикатор",
        children: Indicator.children,
        defaultWidth: 50,
        defaultHeight: 50,
        description: "Имеет два состояния, вкл. и выкл. и отображает зеленый или красный цвет соответственно",
        properties: { 
            state: {
                name: "Состояние",
                type: "select",
                value: "false",
                options: [
                    {
                        name: "Вкл.",
                        value: "true"
                    },
                    {
                        name: "Выкл.",
                        value: "false"
                    }
                ]
            }
        }
    },
    // {
    //     name: "Текстовое поле",
    //     children: Indicator.children,
    //     style: Indicator.style,
    //     defaultWidth: 100,
    //     defaultHeight: 30,
    //     description: "Имеет два состояния, вкл. и выкл. и отображает зеленый или красный цвет соответственно"
    // }
]

