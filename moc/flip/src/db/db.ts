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

const getChainTransactions = async (chain: string) => {
  const result = await query('SELECT * FROM transactions WHERE src_chain = $1 OR dst_chain = $1 ORDER BY id DESC', [chain]);
  return result.rows;
}

const getAllRemainders = async () => {
  const result = await query('SELECT * FROM remainder ORDER BY id DESC');
  return result.rows;
};

const saveTransction = async (
  address: string, srcChain: string, srcHash: string, dstChain: string, dstHash: string, asset: string, amount: number) => {
  try {
    const insertQuery = `
      INSERT INTO transactions (address, src_chain, src_hash, dst_chain, dst_hash, asset, amount) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
    await query(insertQuery, [address, srcChain, srcHash, dstChain, dstHash, asset, amount]);
    console.log(`Transaction ${srcChain}: ${srcHash} / ${dstChain}: ${dstHash} saved to DB`);
  } catch (error) {
    console.error('Failed to save transaction', error as Error);
  }
}

const saveRemainder = async (
  address: string, dstChain: string, dstHash: string, asset: string, totalAmount: string, sentAmount: string, remainder: string, conversionRate: string) => {
  try {
    const insertQuery = `
    INSERT INTO remainder (address, chain, tx_hash, asset, total_amount, sent_amount, remainder, conversion_rate)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    await query(insertQuery, [address, dstChain, dstHash, asset, totalAmount, sentAmount, remainder, conversionRate]);
    console.log(`Remainder saved: ${dstHash}`);
  } catch (error) {
    console.error('Failed to save remainder', error as Error);
  }
}

export { getAllTransactions, getChainTransactions, getAllRemainders, saveTransction, saveRemainder };