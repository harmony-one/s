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

  const handleBackspace = () => {
    setInputValue(inputValue.slice(0, -1));
  };

  const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
    <button key={number} onClick={() => handleNumberClick(number)}>
      {number}
    </button>
  ));

  const zeroButton = (
    <button key="0" className="zero-button" onClick={() => handleNumberClick(0)}>
      0
    </button>
  );

  const backspaceButton = (
    <button key="backspace" className="backspace-button" onClick={handleBackspace}>
      ⌫
    </button>
  );

  return (
    <div className="App">
      <div className="display">{displayValue}</div>
      <input type="text" value={inputValue} readOnly />
      <div className="number-pad">
        {numberButtons}
        {zeroButton}
        {backspaceButton}
      </div>
    </div>
  );
}

export default App;
