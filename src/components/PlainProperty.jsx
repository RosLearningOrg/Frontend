
const PlainProperty = ({ name, prop, item, setFunc }) => {
	return (
		<>
			<label htmlFor={name}>{prop.label}</label>
			<input
				name={name}
				type={prop.type}
				value={prop.value}
				onChange={(e) => {
					item.properties[name].value = e.target.value;
					setFunc(item);
				}}
			/>
		</>
	);
};

export default PlainProperty;
