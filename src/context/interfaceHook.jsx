import { useContext, useEffect, useState } from "react";
import { EditorContext } from "./editorContext";
import { interfaceItemsTypes } from "../blocks/interface/itemsTypes";

function useInterface(items) {
	const { savingInterface, setSavingInterface } = useContext(EditorContext);
	const [interfaceItems, setInterfaceItems] = useState(items);
    const [selectedItemId, setSelectedItemId] = useState(null);
	const selectedItem = interfaceItems.find((item) => item.id == selectedItemId) ?? {};

	const {
		addDisplayItem,
		addInteractiveItem,
		removeDisplayItem,
		removeInteractiveItem,
	} = useContext(EditorContext);

    useEffect(() => {
        if (sessionStorage.getItem("interface")) {
            setInterfaceItems(JSON.parse(sessionStorage.getItem("interface")));
        }
    }, [])

	useEffect(() => {
        if (savingInterface) {
            sessionStorage.setItem("interface", JSON.stringify(interfaceItems));
        }
		console.log(interfaceItems);
		return setSavingInterface(false);
	}, [savingInterface]);

	const setSelectedProperty = (property, value) => {
		setSelected({ ...selectedItem, [property]: value });
	};

	const setSelected = (newItem) => {
		setInterfaceItems((prev) =>
			prev.map((item) => (item.id == selectedItemId ? newItem : item))
		);
	};

	const removeSelected = () => {
		setInterfaceItems((prev) => prev.filter((item) => item.id != selectedItemId));

		if (interfaceItemsTypes[selectedItem.name].type == "interactive") {
			removeInteractiveItem(selectedItemId);
		}
		if (interfaceItemsTypes[selectedItem.name].type == "display") {
			removeDisplayItem(selectedItemId);
		}
	};

	const selectItem = (selId) => {
        setSelectedItemId(selId);
	};

	const deselectItem = () => {
        setSelectedItemId(null);
	};

	const addItem = (name, item) => {
		const id =
			interfaceItems == false
				? 1
				: interfaceItems[interfaceItems.length - 1].id + 1;

		let properties = {};
		Object.entries(item.properties).forEach(([name, prop]) => {
			properties[name] = prop.value;
		});

		const newItem = {
			id: id,
			name: name,
			properties: properties,
			width: item.defaultWidth,
			height: item.defaultHeight,
			posX: 20,
			posY: 20,
		};

		setInterfaceItems((prev) => [...prev, newItem]);

		if (item.type == "interactive") {
			addInteractiveItem(newItem);
		}
		if (item.type == "display") {
			addDisplayItem(newItem);
		}
	};

	return {
		interfaceItems,
		selectedItem,
		selectedItemId,
		addItem,
		selectItem,
		deselectItem,
		setSelected,
		setSelectedProperty,
		removeSelected,
	};
}

export default useInterface;
