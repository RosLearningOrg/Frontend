import "./SidebarMenu.css";

const InterfaceEditorSidebarMenu = (props) => {
    const {
        selectedItem,
        removeSelected,
        setSelected,
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
            <div className="menu-custom-property">
                <CustomProperties item={selectedItem} setFunc={setSelected} />
            </div>
            <div className="menu-properties">
                <DefaultProperty
                    name="width"
                    title="Ширина"
                    value={selectedItem.width}
                    onChange={(e) => setSelectedWidth(e.target.value)}
                />
                <DefaultProperty
                    name="height"
                    title="Высота"
                    value={selectedItem.height}
                    onChange={(e) => setSelectedHeight(e.target.value)}
                />
                <DefaultProperty
                    name="posX"
                    title="Позиция X"
                    value={selectedItem.posX}
                    onChange={(e) => setSelectedX(e.target.value)}
                />
                <DefaultProperty
                    name="posY"
                    title="Позиция Y"
                    value={selectedItem.posY}
                    onChange={(e) => setSelectedY(e.target.value)}
                />
            </div>
            <button variant="tonal" onClick={removeSelected}>
                Удалить элемент
            </button>
        </>
    );
};

const DefaultProperty = ({ name, title, value, onChange }) => {
    return (
        <div className="menu-property">
            <label htmlFor={name}>{title}</label>
            <input
                name={name}
                type="number"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

const CustomProperties = ({ item, setFunc }) => {
    if (item?.properties)
        return (
            <>
                {Object.entries(item.properties).map(([name, def], index) => {
                    if (def.type == "select")
                        return (
                            <SelectProperty
                                key={index}
                                name={name}
                                def={def}
                                item={item}
                                setFunc={setFunc}
                            />
                        );
                    else
                        return (
                            <PlainProperty
                                key={index}
                                name={name}
                                def={def}
                                item={item}
                                setFunc={setFunc}
                            />
                        );
                })}
            </>
        );
};

const PlainProperty = ({ name, def, item, setFunc }) => {
    return (
        <>
            <label htmlFor={name}>{def.name}</label>
            <input
                name={name}
                type={def.type}
                value={def.value}
                onChange={(e) => {
                    item.properties[name].value = e.target.value;
                    setFunc(item);
                }}
            />
        </>
    );
};

const SelectProperty = ({ name, def, item, setFunc }) => {
    return (
        <>
            <label htmlFor={name}>{def.name}</label>
            <select
                value={def.value}
                onChange={(e) => {
                    item.properties[name].value = e.target.value;
                    setFunc(item);
                }}
            >
                {def.options.map((opt, index) => {
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

export default InterfaceEditorSidebarMenu;
