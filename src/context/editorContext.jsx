import { createContext } from "react";
import useEditor from "./editorHook";

export const EditorContext = createContext(null);

const EditorContextProvider = (props) => {
	const editorContext = useEditor([], []);

	return (
		<EditorContext.Provider value={{ ...editorContext }}>
			{props.children}
		</EditorContext.Provider>
	);
};

export default EditorContextProvider;
