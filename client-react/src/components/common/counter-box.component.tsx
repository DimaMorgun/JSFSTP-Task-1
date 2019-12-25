import React, { FunctionComponent, useState } from 'react';

export const CounterBox: FunctionComponent = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <p>Counter value is {count}</p>
        </div>
    )
}