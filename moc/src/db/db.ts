import { Pool } from 'pg';
import { config } from '../config';
import {DBTransaction} from "../types/customTypes";

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

export const getAllRemainders = async () => {
  const result = await query('SELECT * FROM remainder ORDER BY id DESC');
  return result.rows;
};

export const getPendingTransactions = async (
  offset = 0,
  limit = 100
): Promise<DBTransaction[]> => {
  const { rows } = await query(
    `SELECT * FROM transactions_v1 WHERE is_executed = FALSE ORDER BY id DESC  OFFSET $1 LIMIT $2`,
    [offset, limit]
  );
  return rows
};
