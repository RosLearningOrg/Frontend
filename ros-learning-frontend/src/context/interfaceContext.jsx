import { createContext, useState } from "react";

export const InterfaceContext = createContext(null);

const InterfaceContextProvider = (props) => {
	const [interfaceItems, setInterfaceItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState({});

	const getItemById = (id) => {
		return interfaceItems.find((item) => item.id == id);
	};

	const setSelectedWidth = (newWidth) => {
		changeItem({ ...selectedItem, width: newWidth });
	};

	const setSelectedHeight = (newHeight) => {
		changeItem({ ...selectedItem, height: newHeight });
	};

    const setSelectedX = (newPosX) => {
		changeItem({ ...selectedItem, posX: newPosX });
    }
    
    const setSelectedY = (newPosY) => {
		changeItem({ ...selectedItem, posY: newPosY });
    }

	const changeItem = (newItem) => {
		newItem.selected = true;
		const newItems = interfaceItems.map((item) =>
			item.id == newItem.id ? newItem : item
		);
		setInterfaceItems(newItems);
		setSelectedItem(newItem);
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

    const removeItem = (remId) => {
        console.log(remId);
    }

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

	const contextValue = {
		interfaceItems,
		selectedItem,
		addItem,
        removeItem,
		selectItem,
		deselectItem,
		changeItem,
		setSelectedWidth,
		setSelectedHeight,
        setSelectedX,
        setSelectedY
	};

	return (
		<InterfaceContext.Provider value={contextValue}>
			{props.children}
		</InterfaceContext.Provider>
	);
};

export default InterfaceContextProvider;
