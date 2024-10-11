import { useState } from "react";

function useCode(items) {
    const [codeItems, setCodeItems] = useState(items);

    return {
        codeItems,
        setCodeItems
    };
}

export default useCode;
