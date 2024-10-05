import "./SidebarMenu.css"

const InterfaceEditorSidebarMenu = (props) => {
	const {
		selectedItem,
		removeSelected,
		setSelectedWidth,
		setSelectedHeight,
		setSelectedX,
		setSelectedY,
	} = props.context;

	return (
		<>
			<div className="menu-info">
				<p>{selectedItem.name}</p>
				<p className="hint">{selectedItem.description}</p>
			</div>
			<div className="menu-properties">
				<div className="menu-property">
					<label htmlFor="width">W</label>
					<input
						name="width"
						type="number"
						value={selectedItem.width}
						onChange={(e) => setSelectedWidth(e.target.value)}
					/>
				</div>
				<div className="menu-property">
					<label htmlFor="height">H</label>
					<input
						name="height"
						type="number"
						value={selectedItem.height}
						onChange={(e) => setSelectedHeight(e.target.value)}
					/>
				</div>
				<div className="menu-property">
					<label htmlFor="posY">X</label>
					<input
						name="posX"
						type="number"
						value={selectedItem.posX}
						onChange={(e) => setSelectedX(e.target.value)}
					/>
				</div>
				<div className="menu-property">
					<label htmlFor="posY">Y</label>
					<input
						name="posY"
						type="number"
						value={selectedItem.posY}
						onChange={(e) => setSelectedY(e.target.value)}
					/>
				</div>
			</div>
			<button variant="tonal" onClick={removeSelected}>
				Удалить элемент
			</button>
		</>
	);
};

export default InterfaceEditorSidebarMenu;
