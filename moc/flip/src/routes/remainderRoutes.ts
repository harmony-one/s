import express from 'express';
import { getAllRemainders } from '../db/db';

const router = express.Router();

router.get('/', async (req, res) => {
  const remainders = await getAllRemainders();
  let htmlResponse = `<h1>Transaction Data</h1>`;
  htmlResponse += `<table border="1">
  <tr>
    <th>ID</th>
    <th>Address</th>
    <th>Chain</th>
    <th>Tx Hash</th>
    <th>Asset</th>
    <th>Total Amount</th>
    <th>Sent Amount</th>
    <th>Remainder</th>
    <th>Date</th>
  </tr>`;

  for (const tx of remainders) {
    htmlResponse += `<tr>
      <td>${tx.id}</td>
      <td>${tx.address}</td>
      <td>${tx.chain}</td>
      <td>${tx.tx_hash}</td>
      <td>${tx.asset}</td>
      <td>${parseFloat(tx.total_amount).toFixed(6)}</td>
      <td>${parseFloat(tx.sent_amount).toFixed(6)}</td>
      <td>${parseFloat(tx.remainder).toFixed(6)}</td>
      <td>${tx.date}</td>
    </tr>`;
  }

  htmlResponse += `</table>`;

  res.send(htmlResponse);

});

export default router;
