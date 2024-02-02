// const dbName = 'transactions';
// const dbVersion = 1;

// const openRequest = indexedDB.open(dbName, dbVersion);

// openRequest.onsuccess = (event) => {
//   const db = event.target.result;

//   const storeName = 'TransactionStore';

//   const transaction = db.transaction([storeName], 'readwrite');
//   const objectStore = transaction.objectStore(storeName);

//   const dataToStore = { senderAddress: 1234, recipientAddress: 5678, gasPrice: 0.001, inscription: '00001' };

//   const addRequest = objectStore.add(dataToStore);

//   addRequest.onsuccess = () => {
//     console.log('Transaction stored successfully.');
//   };

//   addRequest.onerror = (error) => {
//     console.error('Error storing transaction:', error);
//   };
// };

// openRequest.onerror = (error) => {
//   console.error('Error opening database:', error);
// };