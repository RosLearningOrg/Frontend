import { createContext, useState } from "react";

export const InterfaceContext = createContext(null);

const InterfaceContextProvider = (props) => {
	const [interfaceItems, setInterfaceItems] = useState([]);

	const getItemById = (id) => {
		return interfaceItems.find((item) => item.id == id);
	};

	const setSelectedWidth = (newWidth) => {
		setSelected({ ...getSelected(), width: newWidth });
	};

	const setSelectedHeight = (newHeight) => {
		setSelected({ ...getSelected(), height: newHeight });
	};

	const setSelectedX = (newPosX) => {
		setSelected({ ...getSelected(), posX: newPosX });
	};

	const setSelectedY = (newPosY) => {
		setSelected({ ...getSelected(), posY: newPosY });
	};

	const setSelected = (newItem) => {
		newItem.selected = true;
		const newItems = interfaceItems.map((item) =>
			item.selected ? newItem : item
		);
		setInterfaceItems(newItems);
	};

    const getSelected = () => {
        return (interfaceItems.find((item) => item.selected) ?? {})
    }

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
		addItem,
		selectItem,
		deselectItem,
        getSelected,
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
