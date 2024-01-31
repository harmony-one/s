import React, { useState } from 'react';

function generateEmojiFromHexPair(hexPair) {
  const codePoint = parseInt(hexPair, 16);
  const baseOffset = 0x1F600; // Offset for the range of smiley emojis
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

function App() {
  const initialAddresses = [
    "0xa0f8aB28a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8bB28a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8cB28a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8dB28a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xb5B353B145F95d0ca364d92aEA24514f6352f5DF",
    "0xb6B353B145F95d0ca364d92aEA24514f6352f5DF",
    "0xb7B353B145F95d0ca364d92aEA24514f6352f5DF",
    "0x5795a56B46553913d53d34F7aE494a99E882209A",
    "0x5896a56B46553913d53d34F7aE494a99E882209A",
    "0x5997a56B46553913d53d34F7aE494a99E882209A",
    "0xa0f8bb28a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8b928a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8ba28a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8ab31a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8ab30a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8ab2Fa9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8ab32a9dC7e7492f27FDe2680Ab988b0C925C"
  ];

  const [walletAddress, setWalletAddress] = useState('');
  const [fourDigits, setFourDigits] = useState('');
  const [data, setData] = useState(initialAddresses.map(addr => generateDataRow(addr)));
  const [filteredData, setFilteredData] = useState([]);

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