"use client";

import { useState } from "react";

function Counter({ users }) {
  const [count, setCounter] = useState(1);
  return (
    <>
      <button onClick={() => setCounter(count + 1)}>{count}+</button>
    </>
  );
}

export default Counter;
