import { useState } from "react";

function useCode(items) {
    const [codeItems, setCodeItems] = useState(items);

    const addItem = () => {
        setCodeItems((prev) => [
            ...prev,
            {
                id: prev == false ? 1 : prev[prev.length - 1].id + 1,
                order: prev.length
            }
        ])
    }

    const moveItemDown = (id) => {
        const itemOrder = codeItems.filter((item) => item.id == id)[0].order;
        setCodeItems(prev => prev.map((item) => {
            if (item.order == itemOrder) return (
                {
                    ...item,
                    order: item.order + 1
                }
            )
            if (item.order == itemOrder + 1) return (
                {
                    ...item,
                    order: item.order - 1
                }
            )
            return item;
        }))
    }

    const moveItemUp = (id) => {
        const itemOrder = codeItems.filter((item) => item.id == id)[0].order;
        setCodeItems(prev => prev.map((item) => {
            if (item.order == itemOrder) return (
                {
                    ...item,
                    order: item.order - 1
                }
            )
            if (item.order == itemOrder - 1) return (
                {
                    ...item,
                    order: item.order + 1
                }
            )
            return item;
        }))
    }

    return {
        codeItems,
        setCodeItems,
        addItem,
        moveItemDown,
        moveItemUp
    };
}

export default useCode;
