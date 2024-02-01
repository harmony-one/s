import React, { useState } from 'react';

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

function App() {
  const initialAddresses = [
    "0xa0f8aB28a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8bB28a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8cB28a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8dB28a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8bb28a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8b928a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8ba28a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8ab31a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8ab30a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8ab2Fa9dC7e7492f27FDe2680Ab988b0C925C",
    "0xa0f8ab32a9dC7e7492f27FDe2680Ab988b0C925C",
    "0xdB2aaa140CE0c477981A4190CdD7891C85dcf544",
    "0x00000000000000000000000000000000000000fc",
    "0x97cC98b3820564Aa430A6Bdd84809f276a68BF62",
    "0x24dEa8B35E098B0eED3b26319B5426C332d208a9",
    "0x21C3de23d98Caddc406E3d31b25e807aDDF33633",
    "0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc",
    "0x0c0f71bd9b83cd896df16c13f65cd332b762f0c3",
    "0x7eb5ad93f257e2e66a94eeec7c243f56c3f34ffb",
    "0x7b9497b8459624b2f36808f4186db125bae97f5e",
    "0xfa613230a772e98066f0f241c3788ef6bb17ebda",
    "0x3498b3287a23ec9d0d2d1135930f6674db44a5e5",
    "0x75f6ba2d05617ea99906840edcc8d5096f033f2d",
    "0x40f2d4ea740e9056402e4338bd5355b60ded4823",
    "0x1b51e74b3d64b9add7de7d963cdf939d293640d4",
    "0x155bdf7aa1019bbb2cc9503654a1be8ba5afc2e7",
    "0x4b4f5edc5f153a425088dffe5fd9d6558a21986d",
    "0x5284a8a118d2863fb6ba6d3b6a49cc55338790d1",
    "0x2feb60fc12f732bfb9af1cfbd95e66257c3fc58c",
    "0x7c1f78b9b5b3fec251bd5bddbb7a50a4bd4536ad",
    "0x67a2607e8a1dfe9770a83e76d7069fd40e63bcaa",
    "0x2945fc5ed628f1676b43ec1424f7980021fb4e0b",
    "0xa675eb77de6f4687e5f8b499046ce5259db9b4c3",
    "0xbd48e562b8fa1264c6e700cf62ba30427edafdf3",
    "0x761372dfc7123d396330f7c78295c579efc068bd",
    "0xa0e583f15ba864797cdb07c6ce1ac1d8224393ec",
    "0x9d7faec129d0a9b60280e252e290674682143e28"

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