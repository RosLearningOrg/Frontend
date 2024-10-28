import { createContext } from "react";
import useCode from "./codeHook";

export const CodeContext = createContext(null);

const CodeContextProvider = (props) => {
	const codeContext = useCode([], {});

	return (
		<CodeContext.Provider value={{ ...codeContext }}>
			{props.children}
		</CodeContext.Provider>
	);
};

export default CodeContextProvider;
