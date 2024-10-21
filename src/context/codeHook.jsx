import { useState } from "react";

function useCode(items) {
	const [codeItems, setCodeItems] = useState(items);

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
		codeItems,
		setCodeItems,
		addItem,
        setItem,
		moveItemDown,
		moveItemUp,
	};
}

export default useCode;
