import PlainProperty from "../../components/PlainProperty";

export const children = (item, setItem) => {
	return (
		<>
			<PlainProperty
				name="value"
				prop={item.properties.value}
				item={item}
				setFunc={setItem}
			/>

			{item.properties.value.value && (
				<PlainProperty
					name="var"
					prop={item.properties.var}
					item={item}
					setFunc={setItem}
				/>
			)}
		</>
	);
};
