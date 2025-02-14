import {useEffect, useRef, useState} from "react";

export default function CustomCellRenderer(props: any) {
    console.log("CustomCellRenderer:", props);
    const [value, setValue] = useState(props.value);
    const hasUpdated = useRef(false);

    useEffect(() => {
        // set a pubsub here to listen for updates
        // update the div content manually

    }, []);

    return (
        <div style={{ color: "blue", fontWeight: "bold" }}>
            {value} 🔄
        </div>
    );
};