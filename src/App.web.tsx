import React, {useState} from 'react';

export function App(): React.ReactElement {
  const [num, setNum] = useState<number>(1);
  const handleOnClick = () => setNum(prev => prev + 1);
  return (
    <div>
      <h1>Hi React Dom</h1>
      <button onClick={handleOnClick}>click me</button>
      <h2>{num}</h2>
    </div>
  );
}
