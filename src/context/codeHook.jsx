import { useState } from "react";

function useCode(items, vars) {
	const [codeItems, setCodeItems] = useState(items);
	const [variables, setVariables] = useState(vars);

	const setVar = (name, value) => {
		setVariables((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const removeVar = (name) => {
        const {[name]: _, ...newItem} = variables;
        setVariables(newItem)
	};

	const addItem = (item) => {
		setCodeItems((prev) => [
			...prev,
			{
				id: prev == false ? 1 : prev[prev.length - 1].id + 1,
				order: prev.length,
				children: item.children,
				properties: JSON.parse(JSON.stringify(item.properties)),
			},
		]);
	};

	const setItem = (newItem) => {
		setCodeItems((prev) =>
			prev.map((item) => (item.id == newItem.id ? newItem : item))
		);
	};

	const moveItemDown = (id) => {
		const currItem = codeItems.filter((item) => item.id == id)[0];

		setCodeItems((prev) =>
			prev.map((item) => {
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
			})
		);
	};

	const moveItemUp = (id) => {
		const currItem = codeItems.filter((item) => item.id == id)[0];

		setCodeItems((prev) =>
			prev.map((item) => {
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
			})
		);
	};

	return {
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
