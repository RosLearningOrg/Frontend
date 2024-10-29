import { useState } from "react";

function useCode(items, vars) {
	const [codeItems, setCodeItems] = useState(items);
	const [variables, setVariables] = useState(vars);
	const [selectedTab, setSelectedTab] = useState("Главная");

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

    const addTab = (name) => {
        setCodeItems((prev) => ({
            ...prev,
            [name]: []
        }))
    }

    const removeTab = (name) => {
        const {[name]: _, ...newTabs} = codeItems;
        setCodeItems(newTabs);
    }

	const addItem = (item) => {
		setCodeItems((prev) => {
			const prevTab = prev[selectedTab];
			const id =
				prevTab.length == 0 ? 1 : prevTab[prevTab.length - 1].id + 1;

			const newItem = {
				id: id,
				order: prevTab.length,
				children: item.children,
				properties: JSON.parse(JSON.stringify(item.properties)),
			};

			return {
				...prev,
				[selectedTab]: [...prevTab, newItem],
			};
		});
	};

	const setItem = (newItem) => {
		setCodeItems((prev) => {
			const prevTab = prev[selectedTab];
			const newTab = prevTab.map((item) =>
				item.id == newItem.id ? newItem : item
			);

			return {
				...prev,
				[selectedTab]: [...newTab],
			};
		});
	};

	const moveItemDown = (id) => {
		const currItem = codeItems[selectedTab].find((item) => item.id == id);

		setCodeItems((prev) => {
			const prevTab = prev[selectedTab];

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
				[selectedTab]: [...newTab],
			};
		});
	};

	const moveItemUp = (id) => {
		const currItem = codeItems[selectedTab].find((item) => item.id == id);

		setCodeItems((prev) => {
			const prevTab = prev[selectedTab];

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
				[selectedTab]: [...newTab],
			};
		});
	};

	return {
        addTab,
        removeTab,
		selectedTab,
		setSelectedTab,
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
