import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [displayValue, setDisplayValue] = useState('1234'); // Example display value

  const handleNumberClick = (number) => {
    if (inputValue.length < 4) {
      setInputValue(inputValue + number);
    }
  };

  const numberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
    <button key={number} onClick={() => handleNumberClick(number)}>
      {number}
    </button>
  ));

  return (
    <div className="App">
      <div className="display">{displayValue}</div>
      <input type="text" value={inputValue} readOnly />
      <div className="number-pad">{numberPad}</div>
    </div>
  );
}

export default App;
