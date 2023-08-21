import React from "react";
import { useState } from "react";

const Counter = () => {
    const [count , setCount] = useState(0);
    const handleIncreaseCount = (num) => {
        for (let index = 0; index < num; index++) {
            setCount((prevCount) => prevCount + 1);
        }
    }
         return (
        <div className="text-center my-4">
            <button className="btn btn-success" onClick={() => handleIncreaseCount(5)}>Count: {count}</button>
        </div>
    )
}

export default Counter;