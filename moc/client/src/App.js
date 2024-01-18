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

  // &:nth-child(3) {
  //   width: 300px;
  // }
`;

const StyledLink = styled.a`
  font-weight: bold;
  color: #00AEE9;
  text-decoration: none;

  &:visited {
    color: #00AEE9;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const flipAddr = '0x23719c80171E1c533E58cE757084f6b225721D95';
const capAmount = 10;

const srcChain = 'Harmony'
const srcAsset = 'ONE'

const dstChain = 'BSC'
const dstAsset = 'USDT'

const dotCountry = 'usdt'

const formatHashAndAddress = (str) => str.slice(0, 6) + '...' + str.slice(-4);

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toISOString().replace('T', ' ').slice(0, 19);
};

function App() {

  useEffect(() => {
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
        </tbody>
      </StyledTable>
    </Container>
  );
}

export default App;
