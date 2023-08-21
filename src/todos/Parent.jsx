import React, { useCallback } from "react";
import { useState } from "react";
import CountBox from "./CountBox";
import CountButton from "./CountButton";
import Title from "./Title";

const Parent = () => {

    const [title, setTitle] = useState("سلام به دوستان کدیادی");
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(5);

    const handleSetFirstCount = useCallback(() => {
        setCount(count + 1);
    }, [count]); 

    const handleSetSecondCount = useCallback(() => {
        setCount2(count2 + 1);
    } , [count2]);
     
    return (
        <div>
            <Title title={title} />
            <CountBox title="مجموعه 1" count={count} />
            <CountButton title="مجموعه 1" handleClick={handleSetFirstCount} />
            <CountBox title="مجموعه 2" count={count2} />
            <CountButton title="مجموعه 2" handleClick={handleSetSecondCount} />
        </div>
    )
}

export default Parent;