import React, { useState } from "react";
import Counter from "./Counter";

const HoverCount = (props) => {
   const {count , handleIncreaseCount} = props;

    return (
        <div className="mt-3 text-center">
            <button className="btn btn-info" onMouseEnter={handleIncreaseCount}>Count: {count}</button>
        </div>
    )
}

export default Counter(HoverCount , 5);