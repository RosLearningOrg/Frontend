import { useContext, useEffect, useState } from "react";
import { EditorContext } from "./editorContext";

function useCode(items, vars) {
	const { savingCode, setSavingCode } = useContext(EditorContext);
	const [codeItems, setCodeItems] = useState(items);
	const [variables, setVariables] = useState(vars);
	const [selectedFunc, setSelectedFunc] = useState("Главная");

	useEffect(() => {
		console.log(codeItems);
		return setSavingCode(false);
	}, [savingCode]);

	const setVar = (name, value) => {
		setVariables((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const removeVar = (name) => {
		const { [name]: _, ...newVars } = variables;
		setVariables(newVars);
	};

	const addFunc = (name) => {
		setCodeItems((prev) => ({
			...prev,
			[name]: [],
		}));
	};

	const removeFunc = (name) => {
		const { [name]: _, ...newTabs } = codeItems;
		setCodeItems(newTabs);
	};

	const addItem = (name, item) => {
		setCodeItems((prev) => {
			const prevTab = prev[selectedFunc];
			const id =
				prevTab.length == 0 ? 1 : prevTab[prevTab.length - 1].id + 1;

			let properties = {};

			Object.entries(item.properties).forEach(([name, prop]) => {
				properties[name] = prop.value;
			});

			const newItem = {
				id: id,
				name: name,
				order: prevTab.length,
				properties: properties,
			};

			return {
				...prev,
				[selectedFunc]: [...prevTab, newItem],
			};
		});
	};

	const setItem = (newItem) => {
		setCodeItems((prev) => {
			const prevTab = prev[selectedFunc];
			const newTab = prevTab.map((item) =>
				item.id == newItem.id ? newItem : item
			);

			return {
				...prev,
				[selectedFunc]: [...newTab],
			};
		});
	};

	const moveItemDown = (id) => {
		const currItem = codeItems[selectedFunc].find((item) => item.id == id);

		setCodeItems((prev) => {
			const prevTab = prev[selectedFunc];

			const newTab = prevTab.map((item) => {
				if (item.order == currItem.order)
					return {
						...item,
						order: item.order + 1,
					};
				if (item.order == currItem.order + 1)
					return {
						...item,
						order: item.order - 1,
					};
				return item;
			});

			return {
				...prev,
				[selectedFunc]: [...newTab],
			};
		});
	};

	const moveItemUp = (id) => {
		const currItem = codeItems[selectedFunc].find((item) => item.id == id);

		setCodeItems((prev) => {
			const prevTab = prev[selectedFunc];

			const newTab = prevTab.map((item) => {
				if (item.order == currItem.order)
					return {
						...item,
						order: item.order - 1,
					};
				if (item.order == currItem.order - 1)
					return {
						...item,
						order: item.order + 1,
					};
				return item;
			});

			return {
				...prev,
				[selectedFunc]: [...newTab],
			};
		});
	};

	return {
		addFunc,
		removeFunc,
		selectedFunc,
		setSelectedFunc,
		variables,
		setVar,
		removeVar,
		codeItems,
		setCodeItems,
		addItem,
		setItem,
		moveItemDown,
		moveItemUp,
	};
}

export default useCode;
