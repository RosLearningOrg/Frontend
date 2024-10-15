import { useState } from "react";

function useCode(items) {
	const [codeItems, setCodeItems] = useState(items);

	const addItem = (name) => {
		setCodeItems((prev) => [
			...prev,
			{
				id: prev == false ? 1 : prev[prev.length - 1].id + 1,
				order: prev.length,
				name: name,
			},
		]);
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
		moveItemDown,
		moveItemUp,
	};
}

export default useCode;
