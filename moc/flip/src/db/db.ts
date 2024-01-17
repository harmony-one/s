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

export const getTransactions = async (
  params: {
    offset?: number,
    limit?: number,
    isExecuted?: boolean,
    address?: string
    intervalSeconds?: number
  }
): Promise<DBTransaction[]> => {
  const { offset = 0, limit = 100, address, isExecuted , intervalSeconds } = params

  const whereConditions = [];

  if(typeof isExecuted !== 'undefined') {
    whereConditions.push(`"is_executed" = ${isExecuted}`)
  }

  if(address) {
    whereConditions.push(`"address" = '${address}'`)
  }

  if(intervalSeconds) {
    whereConditions.push(`date BETWEEN NOW() - INTERVAL '${intervalSeconds} SECONDS' AND NOW()`)
  }
  const whereClause = whereConditions.length > 0
    ? 'WHERE ' + whereConditions.join('AND ')
    : ''

  const { rows } = await query(
    `SELECT * FROM transactions_v1 ${whereClause} ORDER BY id DESC OFFSET $2 LIMIT $3`,
    [isExecuted, offset, limit]
  );
  return rows
};

export const getTotalAmountForAddress = async (
  params: {
    address?: string
    intervalSeconds?: number
  }
): Promise<number> => {
  const { address, intervalSeconds } = params

  const { rows } = await query(
    `SELECT sum(amount) FROM transactions_v1 WHERE "address" = $1 AND date BETWEEN NOW() - INTERVAL '${intervalSeconds} SECONDS' AND NOW();`,
    [address]
  );
  return rows[0].sum
};

export const setTxExecuted = async (txId: string, isExecuted: boolean, dstHash: string): Promise<DBTransaction[]> => {
  const { rows } = await query(
    `update transactions_v1 set is_executed = $2, dst_hash = $3 where id = $1`,
    [txId, isExecuted, dstHash]
  );
  return rows
};
