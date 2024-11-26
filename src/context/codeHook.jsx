import { useContext, useEffect, useState } from "react";
import { EditorContext } from "./editorContext";
import { codeItemsTypes } from "../code/itemsTypes";

function useCode(items, vars) {
	const { savingCode, setSavingCode } = useContext(EditorContext);
	const [codeItems, setCodeItems] = useState(items);
	const [variables, setVariables] = useState(vars);
	const [selectedFunc, setSelectedFunc] = useState("Главная");

	useEffect(() => {
		console.log(codeItems);
        console.log(variables)
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

	const addItem = (name, order) => {
		order = order == -1 ? codeItems[selectedFunc].length : order;
        const item = codeItemsTypes[name];

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
				order: order,
				properties: properties,
			};

			const newTab = prevTab.map((item) => ({
				...item,
				order: order > item.order ? item.order : item.order + 1,
			}));

			return {
				...prev,
				[selectedFunc]: [...newTab, newItem],
			};
		});
	};

	const removeItem = (id) => {
		setCodeItems((prev) => {
			const order = codeItems[selectedFunc].find(
				(item) => item.id == id
			).order;

			const prevTab = prev[selectedFunc];

			let newTab = prevTab.filter((item) => item.id != id);

			newTab = newTab.map((item) => ({
				...item,
				order: order > item.order ? item.order : item.order - 1,
			}));

			return {
				...prev,
				[selectedFunc]: [...newTab],
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

	const moveItem = (id, order) => {
		const currItem = codeItems[selectedFunc].find((item) => item.id == id);
		order = order == -1 ? codeItems[selectedFunc].length - 1 : order;

		setCodeItems((prev) => {
			const prevTab = prev[selectedFunc];

			const newTab = prevTab.map((item) => {
				if (item.order == currItem.order)
					return {
						...item,
						order: order,
					};

				let newOrder = item.order;
				if (order > currItem.order) {
					if (item.order <= order && item.order > currItem.order) {
						newOrder--;
					}
				}
				if (order < currItem.order) {
					if (item.order >= order && item.order < currItem.order) {
						newOrder++;
					}
				}

				return {
					...item,
					order: newOrder,
				};
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
		moveItem,
		removeItem,
	};
}

export default useCode;
