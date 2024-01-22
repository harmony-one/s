import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledTable = styled.table`
  margin-top: 20px;
  border-collapse: collapse;
  border: 1px solid black;
`;

const StyledTh = styled.th`
  border: 1px solid black;
  padding: 8px;
  width: 150;

  // &:nth-child(3) {
  //   width: 300px;
  // }
`;

const StyledTd = styled.td`
  border: 1px solid black;
  padding: 8px;
  width: 150;
`;

const StyledLink = styled.a`
  // color: ${props => props.chain === srcChain ? srcColor : dstColor};
  color: #00AEE9;
  text-decoration: none;

  &:visited {
    // color: ${props => props.chain === srcChain ? srcColor : dstColor};
    color: #00AEE9;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const txsUrl = 'https://moc-bsc-usdt.fly.dev/txs';

const flipAddr = '0x23719c80171E1c533E58cE757084f6b225721D95';
const capAmount = 10;

const srcChain = 'Harmony';
const srcAsset = 'ONE';
const srcExplorer = 'https://explorer.harmony.one';
const srcColor = '#00AEE9';

const dstChain = 'BSC';
const dstAsset = 'USDT';
const dstExplorer = 'https://bscscan.com';
const dstColor = '#F3BA2F';

const dotCountry = 'usdt'

const fetchTxs = async () => {
  const response = await fetch(txsUrl);
  return response.json();
};
const formatHash = (str) => str.slice(0, 6) + '...' + str.slice(-4);

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toUTCString().replace(/GMT.*/, 'GMT');
};

const getExplorer = (chain, txHash) => {
  if (chain === srcChain) {
    return `${srcExplorer}/tx/${txHash}`;
  } else {
    return `${dstExplorer}/tx/${txHash}`;
  }
}

function App() {
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    fetchTxs().then(setTxs);
  }, []);

  return (
    <Container>
      <h1>{dotCountry}.country Flip</h1>
      <h2>Address: {flipAddr}</h2>
      <h3>Important Notes</h3>
      <text>DO NOT attempt to send more than ${capAmount} of any asset.</text>
      <text>DO NOT attempt to send any other assets than native {srcAsset} ({srcChain}) or {dstAsset} ({dstChain}), all other funds will be lost.</text>

      <h3>What is it?</h3>
      <text>{dotCountry}.country offers a revolutionary service that allows you to swap native tokens seamlessly. No smart contracts, no transaction signing – just send ${srcAsset} to receive ${dstAsset}.</text>

      <h3>How it works?</h3>
      <text>First, you send ${srcAsset} tokens to a wallet address on {dotCountry}.country. Next, our system automatically calculates the equivalent amount in ${dstAsset} based on the current exchange rate and sends it to your specified wallet. Finally, you can access your ${dstAsset} on the {dstChain} network using your original address in as little as 4 seconds, for less than $0.10! It's that easy – no smart contracts, no transaction signing, just quick and secure token swaps. (this process in reverse will also work, send {dstAsset} on {dstChain} and receive {srcAsset} on {srcChain}!)</text>

      <h3>Why is it useful?</h3>
      <text>Our service provides a secure, cost-effective, and rapid solution for native token swaps. By eliminating the complexities and risks of traditional methods, we make it easier for you to manage your assets across different networks.</text>

      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Address</StyledTh>
            <StyledTh>Source Chain</StyledTh>
            <StyledTh>Source Tx Hash</StyledTh>
            <StyledTh>Destination Chain</StyledTh>
            <StyledTh>Destination Tx Hash</StyledTh>            
            <StyledTh>Asset</StyledTh>            
            <StyledTh>Amount</StyledTh>            
            <StyledTh>Date</StyledTh>
          </tr>
        </thead>
        <tbody>
          {txs.map(tx => (
            <tr key={tx.id}>
              <StyledTd>{formatHash(tx.address)}</StyledTd>
              <StyledTd>{tx.src_chain}</StyledTd>
              <StyledTd>
                {/* <StyledLink chain={tx.src_chain} href={getExplorer(tx.src_chain, tx.src_hash)} target="_blank" rel="noopener noreferrer"> */}
                <StyledLink href={getExplorer(tx.src_chain, tx.src_hash)} target="_blank" rel="noopener noreferrer">
                  {formatHash(tx.src_hash)}
                </StyledLink>
              </StyledTd>
              <StyledTd>{tx.dst_chain}</StyledTd>
              <StyledTd>
                {/* <StyledLink chain={tx.dst_chain} href={getExplorer(tx.dst_chain, tx.dst_hash)} target="_blank" rel="noopener noreferrer"> */}
                <StyledLink href={getExplorer(tx.dst_chain, tx.dst_hash)} target="_blank" rel="noopener noreferrer">
                  {formatHash(tx.dst_hash)}
                </StyledLink>
              </StyledTd>
              <StyledTd>{tx.asset}</StyledTd>
              <StyledTd>{parseFloat(tx.amount).toFixed(6)}</StyledTd>
              <StyledTd>{formatDate(tx.date)}</StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
}

export default App;
