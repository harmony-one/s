// // import sendHarmonyTransaction from "./SendTransaction";

// export function storeTransactionInIndexedDB(transactionData) {
//     return new Promise((resolve, reject) => {
//       const request = indexedDB.open('LocalTransactions', 1);
  
//       request.onerror = (event) => {
//         console.error('Error opening IndexedDB:', event.target.error);
//         reject(event.target.error);
//       };
  
//       request.onsuccess = (event) => {
//         const db = event.target.result;
//         const transaction = db.transaction('UnsyncedTransactions', 'readwrite');
//         const objectStore = transaction.objectStore('UnsyncedTransactions');
  
//         const getRequest = objectStore.get('transactionsKey');
  
//         getRequest.onsuccess = (event) => {
//           const transactions = getRequest.result || [];
  
//           transactions.push(transactionData); // Store the transactionData
  
//           const putRequest = objectStore.put(transactions, 'transactionsKey');
  
//           putRequest.onsuccess = () => {
//             console.log('Transaction stored successfully');
//             resolve();
//           };
  
//           putRequest.onerror = (event) => {
//             console.error('Error storing transaction:', event.target.error);
//             reject(event.target.error);
//           };
//         };
  
//         getRequest.onerror = (event) => {
//           console.error('Error retrieving transactions:', event.target.error);
//           reject(event.target.error);
//         };
//       };
//     });
//   }
  
//   function retrieveTransactionsFromIndexedDB() {
//     return new Promise((resolve, reject) => {
//       const request = indexedDB.open('LocalTransactions', 1);
  
//       request.onerror = (event) => {
//         console.error('Error opening IndexedDB:', event.target.error);
//         reject([]);
//       };
  
//       request.onsuccess = (event) => {
//         const db = event.target.result;
//         const transaction = db.transaction('UnsyncedTransactions', 'readonly');
//         const objectStore = transaction.objectStore('UnsyncedTransactions');
  
//         const getRequest = objectStore.get('transactionsKey');
  
//         getRequest.onsuccess = (event) => {
//           const transactions = getRequest.result || [];
//           resolve(transactions);
//         };
  
//         getRequest.onerror = (event) => {
//           console.error('Error retrieving transactions:', event.target.error);
//           reject([]);
//         };
//       };
//     });
//   }
  
//   async function sendTransactions(transactions) {
//     for (const transaction of transactions) {
//       // await sendHarmonyTransaction(transaction);
//       console.log(transaction);
//     }
//   }
  
//   window.addEventListener('online', async () => {
//     const isDeviceOnline = navigator.onLine;
//     if (isDeviceOnline) {
//       const storedTransactions = await retrieveTransactionsFromIndexedDB();
//       if (storedTransactions && storedTransactions.length > 0) {
//         await sendTransactions(storedTransactions);
//       }
//     }
//   });
  
//   // const exampleTransaction = { /* Your transaction data */ };
//   // storeTransactionInIndexedDB(exampleTransaction)
//   //   .then(() => console.log('Transaction stored successfully'))
//   //   .catch(error => console.error('Error storing transaction:', error));
  