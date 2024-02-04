import React, { useState, useEffect } from 'react';

function generateEmojiFromHexPair(hexPair) {
  const codePoint = parseInt(hexPair, 16);
  const baseOffset = 0x1F300; // Offset for the range of smiley emojis
  const emojiCode = baseOffset + codePoint;
  try {
    return String.fromCodePoint(emojiCode);
  } catch {
    return '🆘'; // Fallback emoji
  }
}

function generateDataRow(walletAddress) {
  if (!walletAddress.startsWith("0x") || walletAddress.length !== 42) {
    throw new Error("Invalid EVM wallet address");
  }

  const firstTwoLetters = walletAddress.substring(2, 4);
  const emojiString = [
    walletAddress.substring(4, 6),
    walletAddress.substring(6, 8),
    walletAddress.substring(8, 10)
  ].map(generateEmojiFromHexPair).join('');
  const lastFourDigits = parseInt(walletAddress.substring(38), 16).toString().padStart(4, '0').slice(-4);

  return {
    walletAddress,
    firstTwoLetters,
    emojiString,
    lastFourDigits
  };
}

function generateRandomWalletAddress() {
  const prefix = '0x';
  let address = prefix;
  for (let i = 0; i < 40; i++) {
    address += Math.floor(Math.random() * 16).toString(16); // Generates a random hex digit and appends it to the address
  }
  return address;
}

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [fourDigits, setFourDigits] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Initialize with some addresses if needed
    setData([]);

    const intervalId = setInterval(() => {
      setData(currentData => {
        const newAddresses = [];
        for (let i = 0; i < 1000; i++) {
          const randomAddress = generateRandomWalletAddress();
          newAddresses.push(generateDataRow(randomAddress));
        }
        return [...currentData, ...newAddresses];
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAdd = () => {
    try {
      const newRow = generateDataRow(walletAddress);
      setData([...data, newRow]);
      setWalletAddress('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFilter = () => {
    const results = data.filter(row => row.lastFourDigits === fourDigits);
    setFilteredData(results);
  };

  return (
    <div className="App" style={{ margin: '20px' }}>
      <h2>Total Rows: {data.length}</h2>

      <div>
        <input 
          type="text" 
          value={walletAddress} 
          onChange={e => setWalletAddress(e.target.value)} 
          placeholder="Enter EVM Wallet Address"
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleAdd}>Add Address</button>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <input 
          type="text" 
          value={fourDigits} 
          onChange={e => setFourDigits(e.target.value)} 
          placeholder="Enter Last 4 Digits"
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleFilter}>Filter Data</button>
      </div>

      {filteredData.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Filtered Results:</h3>
          <table style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>First 2 Letters</th>
                <th>Emojis</th>
                <th>Last 4 Digits</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td>{row.firstTwoLetters}</td>
                  <td>{row.emojiString}</td>
                  <td>{row.lastFourDigits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <table style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Wallet Address</th>
            <th>First 2 Letters</th>
            <th>Emojis</th>
            <th>Last 4 Digits</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.walletAddress}</td>
              <td>{row.firstTwoLetters}</td>
              <td>{row.emojiString}</td>
              <td>{row.lastFourDigits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
