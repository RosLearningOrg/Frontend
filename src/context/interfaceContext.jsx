import { createContext } from "react";
import useInterface from "./interfaceHook";

export const InterfaceContext = createContext(null);

const InterfaceContextProvider = (props) => {
	const interfaceContext = useInterface([]);

	return (
		<InterfaceContext.Provider value={{ ...interfaceContext }}>
			{props.children}
		</InterfaceContext.Provider>
	);
};

export default InterfaceContextProvider;
