import React from "react";
import { useState } from "react";
import Counter from "./Counter";

const ClickCount = (props) => {
    const {count , handleIncreaseCount, name} = props;
    console.log(name);
    return (
        <div className="text-center ">
            <button className="btn btn-success" onClick={handleIncreaseCount}>{name} count: {count}</button>
        </div>
    )
}

export default Counter(ClickCount , 3);