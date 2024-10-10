import { useState } from "react";

function useInterface(items) {
    const [interfaceItems, setInterfaceItems] = useState(items);
    const selectedItem = interfaceItems.find((item) => item.selected) ?? {};

    const setSelectedWidth = (width) => {
        setSelected({ ...selectedItem, width: width });
    };

    const setSelectedHeight = (height) => {
        setSelected({ ...selectedItem, height: height });
    };

    const setSelectedX = (posX) => {
        setSelected({ ...selectedItem, posX: posX });
    };

    const setSelectedY = (posY) => {
        setSelected({ ...selectedItem, posY: posY });
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
                posX: 0,
                posY: 0,
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
        removeSelected,
        setSelectedWidth,
        setSelectedHeight,
        setSelectedX,
        setSelectedY,
    };
}

export default useInterface;
