import React, { useState } from 'react';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Simple Counter - Updated x2</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;