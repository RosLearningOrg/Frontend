import { useState } from "react";

function useEditor(display, interactive) {
	const [interactiveItems, setInteractiveItems] = useState(display);
	const [displayItems, setDisplayItems] = useState(interactive);

	const addDisplayItem = (item) => {
		setDisplayItems((prev) => [
			...prev,
			{
				id: item.id,
				name: item.name,
                properties: JSON.parse(JSON.stringify(item.properties))
			},
		]);
	};

	const addInteractiveItem = (item) => {
		setInteractiveItems((prev) => [
			...prev,
			{
				id: item.id,
				name: item.name,
                properties: JSON.parse(JSON.stringify(item.properties))
			},
		]);
	};

	const removeDisplayItem = (id) => {
		setDisplayItems((prev) => prev.filter((item) => item.id != id));
	};

	const removeInteractiveItem = (id) => {
		setInteractiveItems((prev) => prev.filter((item) => item.id != id));
	};

	return {
		interactiveItems,
		setInteractiveItems,
		displayItems,
		setDisplayItems,
		addDisplayItem,
		addInteractiveItem,
		removeDisplayItem,
		removeInteractiveItem,
	};
}

export default useEditor;
