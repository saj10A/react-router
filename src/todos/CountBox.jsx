import React, { memo } from "react";

const CountBox = (props) => {
    console.log(`نمایش ${props.title}`);

    return (
        <div className="text-center mt-3">
            <span>{props.title + " : " + props.count}</span>
        </div>
    )
}

export default memo(CountBox);