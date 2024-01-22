import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
});

const query = (text: string, params?: any[]) => pool.query(text, params);

const getAllTransactions = async () => {
  const result = await query('SELECT * FROM transactions ORDER BY id DESC');
  return result.rows;
};

const getAllRemainders = async () => {
  const result = await query('SELECT * FROM remainder ORDER BY id DESC');
  return result.rows;
};

const saveTransction = async (
  address: string, srcChain: string, srcHash: string, dstChain: string, dstHash: string, asset: string, amount: number) => {
  const insertQuery = `
  INSERT INTO transactions (address, src_chain, src_hash, dst_chain, dst_hash, asset, amount) 
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  await query(insertQuery, [address, srcChain, srcHash, dstChain, dstHash, asset, amount]);
  // TODO: srcHash undefined
  console.log(`Transaction ${srcChain}: ${srcHash} / ${dstChain}: ${dstHash} saved to DB`);
}

export { getAllTransactions, getAllRemainders, saveTransction };