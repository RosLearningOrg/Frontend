import * as Button from "./items/button";
import * as Indicator from "./items/indicator";

export const interfaceItemsTypes = [
    {
        name: "Кнопка",
        children: Button.children,
        style: Button.style,
        defaultWidth: 100,
        defaultHeight: 50,
        description: "Простой элемент интерфейса, служит для выполнения некоторых действий по нажатию на него"
    },
    {
        name: "Индикатор",
        children: Indicator.children,
        style: Indicator.style,
        defaultWidth: 50,
        defaultHeight: 50,
        description: "Имеет два состояния, вкл. и выкл. и отображает зеленый или красный цвет соответственно"
    },
    {
        name: "Indicator",
        children: Indicator.children,
        style: Indicator.style,
        defaultWidth: 50,
        defaultHeight: 50,
        description: "Имеет два состояния, вкл. и выкл. и отображает зеленый или красный цвет соответственно"
    }
]

