import { useState } from "react";

function useInterface(items) {
    const [interfaceItems, setInterfaceItems] = useState(items);
    const selectedItem = interfaceItems.find((item) => item.selected) ?? {};

    console.log(interfaceItems)

    const setSelectedProperty = (property, value) => {
        setSelected({ ...selectedItem, [property]: value });
    };

    const setSelected = (newItem) => {
        setInterfaceItems((prev) =>
            prev.map((item) => (item.selected ? newItem : item))
        );
    };

    const removeSelected = () => {
        setInterfaceItems((prev) => prev.filter((item) => !item.selected));
    };

    const selectItem = (selId) => {
        setInterfaceItems((prev) =>
            prev.map(({ ...props }) => ({
                ...props,
                selected: props.id == selId ? true : false,
            }))
        );
    };

    const deselectItem = () => {
        setInterfaceItems((prev) =>
            prev.map(({ ...props }) => ({ ...props, selected: false }))
        );
    };

    const addItem = (item) => {
        setInterfaceItems((prev) => [
            ...prev,
            {
                ...item,
                id: prev == false ? 1 : prev[prev.length - 1].id + 1,
                properties: JSON.parse(JSON.stringify(item.properties)),
                selected: false,
                width: item.defaultWidth,
                height: item.defaultHeight,
                posX: 20,
                posY: 20,
            },
        ]);
    };

    return {
        interfaceItems,
        selectedItem,
        addItem,
        selectItem,
        deselectItem,
        setSelected,
        setSelectedProperty,
        removeSelected,
    };
}

export default useInterface;
