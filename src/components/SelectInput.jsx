const SelectInput = ({ name, items, selected, onChange, noDefault }) => {
	return (
		<>
			<select
				name={name}
				value={selected ? selected : ""}
				onChange={(e) => {
					onChange(e.target.value);
				}}
				onClick={(e) => {
					e.stopPropagation();
				}}
				onMouseDown={(e) => {
					e.stopPropagation();
				}}
			>
				{!noDefault && <option value="">- не выбрано -</option>}
				{items &&
					items.map((item, index) => {
						return (
							<option key={index} value={item.value}>
								{item.text}
							</option>
						);
					})}
			</select>
		</>
	);
};

export default SelectInput;
