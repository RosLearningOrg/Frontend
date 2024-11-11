import { useContext, useEffect, useState } from "react";
import { EditorContext } from "./editorContext";

function useInterface(items) {
	const { savingInterface, setSavingInterface } = useContext(EditorContext);
	const [interfaceItems, setInterfaceItems] = useState(items);
	const selectedItem = interfaceItems.find((item) => item.selected) ?? {};

	const {
		addDisplayItem,
		addInteractiveItem,
		removeDisplayItem,
		removeInteractiveItem,
	} = useContext(EditorContext);

	useEffect(() => {
		console.log(interfaceItems);
		return setSavingInterface(false);
	}, [savingInterface]);

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

		if (selectedItem.type == "interactive") {
			removeInteractiveItem(selectedItem.id);
		}
		if (selectedItem.type == "display") {
			removeDisplayItem(selectedItem.id);
		}
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
		const newItem = {
			...item,
			id:
				interfaceItems == false
					? 1
					: interfaceItems[interfaceItems.length - 1].id + 1,
			properties: JSON.parse(JSON.stringify(item.properties)),
			selected: false,
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
		addItem,
		selectItem,
		deselectItem,
		setSelected,
		setSelectedProperty,
		removeSelected,
	};
}

export default useInterface;
