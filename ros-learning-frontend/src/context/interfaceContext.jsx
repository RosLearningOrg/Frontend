import { createContext, useState } from "react";

export const InterfaceContext = createContext(null);

const InterfaceContextProvider = (props) => {
	const [interfaceItems, setInterfaceItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState({});

	const getItemById = (id) => {
		return interfaceItems.find((item) => item.id == id);
	};

	const setSelectedWidth = (newWidth) => {
		setSelected({ ...selectedItem, width: newWidth });
	};

	const setSelectedHeight = (newHeight) => {
		setSelected({ ...selectedItem, height: newHeight });
	};

	const setSelectedX = (newPosX) => {
		setSelected({ ...selectedItem, posX: newPosX });
	};

	const setSelectedY = (newPosY) => {
		setSelected({ ...selectedItem, posY: newPosY });
	};

	const setSelected = (newItem) => {
		newItem.selected = true;
		const newItems = interfaceItems.map((item) =>
			item.selected ? newItem : item
		);
		setInterfaceItems(newItems);
		setSelectedItem(newItem);
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
		setSelectedItem(getItemById(selId));
	};

	const deselectItem = () => {
		setSelectedItem({});
		setInterfaceItems((prev) =>
			prev.map(({ ...props }) => ({ ...props, selected: false }))
		);
	};

	const addItem = (itemProps) => {
		setInterfaceItems((prev) => [
			...prev,
			{
				id: prev == false ? 1 : prev[prev.length - 1].id + 1,
				selected: false,
				width: itemProps.defaultWidth,
				height: itemProps.defaultHeight,
				posX: 0,
				posY: 0,
				...itemProps,
			},
		]);
	};

	const contextValue = {
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

	return (
		<InterfaceContext.Provider value={contextValue}>
			{props.children}
		</InterfaceContext.Provider>
	);
};

export default InterfaceContextProvider;
