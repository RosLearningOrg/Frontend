import { createContext, useState } from "react";

export const InterfaceContext = createContext(null);

const InterfaceContextProvider = (props) => {
	const [interfaceItems, setInterfaceItems] = useState([]);

	const addInterfaceItem = (type) => {
		setInterfaceItems((prev) => [
			...prev,
            {
                id: prev == false ? 1 : prev[prev.length - 1].id + 1,
                type: type
            }
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
