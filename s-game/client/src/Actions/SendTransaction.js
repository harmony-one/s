// import { Harmony } from '@harmony-js/core';

// async function sendHarmonyTransaction(endpoint, privateKey, recipientAddress, inscriptionData) {
//   try {
//     const harmony = new Harmony(endpoint, { chainType: 'hmy', chainId: 1 });

//     const senderAddress = harmony.crypto.getAddress(privateKey).checksum;
//     const signer = harmony.wallet.addByPrivateKey(privateKey);

//     const transaction = harmony.transactions.newTx({
//       from: senderAddress,
//       to: recipientAddress,
//       value: '1000000000000000000',
//       gasLimit: '21000',
//       gasPrice: '1000000000',
//       data: inscriptionData,
//     });

//     const signedTx = await harmony.wallet.signTransaction(transaction);
//     const [sentTx, txHash] = await harmony.blockchain.sendTransaction(signedTx);

//     console.log('Transaction sent successfully.');
//     console.log('Transaction Hash:', txHash);
//   } catch (error) {
//     console.error('Error sending Harmony transaction:', error);
//   }
// }

// export default sendHarmonyTransaction;
