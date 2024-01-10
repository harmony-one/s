import { Pool } from 'pg';
import { config } from '../config';

const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port as number,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const getAllTransactions = async () => {
  const result = await query('SELECT * FROM transactions ORDER BY id DESC');
  return result.rows;
};