import * as Button from "./items/button";
import * as Indicator from "./items/indicator";

export const interfaceItemsTypes = [
    {
        name: "Button",
        children: Button.children,
        style: Button.style,
        defaultWidth: 100,
        defaultHeight: 50,
    },
    {
        name: "Indicator",
        children: Indicator.children,
        style: Indicator.style,
        defaultWidth: 50,
        defaultHeight: 50,
    }
]

