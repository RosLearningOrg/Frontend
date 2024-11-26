import * as Button from "./items/button";
import * as Indicator from "./items/indicator";
import * as TextBox from "./items/textBox";

export const interfaceItemsTypes = {
    button: {
        title: "Кнопка",
        type: "interactive",
        children: Button.children,
        defaultWidth: 100,
        defaultHeight: 50,
        description: "Простой элемент интерфейса, служит для выполнения некоторых действий по нажатию на него",
        properties: {}
    },
    indicator: {
        title: "Индикатор",
        type: "display",
        children: Indicator.children,
        defaultWidth: 50,
        defaultHeight: 50,
        description: "Имеет два состояния, вкл. и выкл. и отображает зеленый или красный цвет соответственно",
        properties: { 
            state: {
                label: "Состояние",
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
    textfield: {
        title: "Текстовое поле",
        type: "display",
        children: TextBox.children,
        defaultWidth: 100,
        defaultHeight: 50,
        description: "Отображает заданный текст в прямоугольной области",
        properties: { 
            text: {
                label: "Текст",
                type: "text",
                value: "Введите текст"
            },
            fontsize: {
                label: "Размер шрифта",
                type: "number",
                value: 14
            },
            textalign: {
                label: "Выравнивание текста",
                type: "select",
                value: "center",
                options: [
                    {
                        name: "По центру",
                        value: "center"
                    },
                    {
                        name: "По левому краю",
                        value: "left"
                    },
                    {
                        name: "По правому краю",
                        value: "right"
                    }
                ]
            }
        }
    },
}

