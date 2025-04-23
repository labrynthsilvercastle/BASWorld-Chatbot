import React from "react";

const YesNoWidget = ({ onSelect }) => (
    <div>
        <button onClick={() => onSelect(true)}>Yes</button>
        <button onClick={() => onSelect(false)}>No</button>
    </div>
);

export default YesNoWidget;