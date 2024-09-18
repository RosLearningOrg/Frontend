import { createContext, useState } from "react";

export const InterfaceContext = createContext(null);

const InterfaceContextProvider = (props) => {
	const [interfaceItems, setInterfaceItems] = useState([]);

	const addInterfaceItem = () => {
		setInterfaceItems((prev) => [
			...prev,
			prev == false ? 1 : prev[prev.length - 1] + 1,
		]);
	};

	const contextValue = {
		interfaceItems,
		addInterfaceItem,
	};

	return (
		<InterfaceContext.Provider value={contextValue}>
			{props.children}
		</InterfaceContext.Provider>
	);
};

export default InterfaceContextProvider;
