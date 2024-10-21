
const SelectProperty = ({ name, prop, item, setFunc }) => {
	return (
		<>
			<label htmlFor={name}>{prop.label}</label>
			<select
				value={prop.value}
				onChange={(e) => {
					item.properties[name].value = e.target.value;
					setFunc(item);
				}}
			>
				{prop.options.map((opt, index) => {
					return (
						<option key={index} value={opt.value}>
							{opt.name}
						</option>
					);
				})}
			</select>
		</>
	);
};

export default SelectProperty;
