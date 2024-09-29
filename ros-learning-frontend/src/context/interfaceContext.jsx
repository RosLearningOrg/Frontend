import { createContext, useCallback, useState } from "react";

export const InterfaceContext = createContext(null);

const InterfaceContextProvider = (props) => {
	const [interfaceItems, setInterfaceItems] = useState([]);
	const selectedItem = useCallback(
		() => interfaceItems.find((item) => item.selected) ?? {},
		[interfaceItems]
	)();

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
