import { ethers } from "ethers";

export type TransactionResponse = ethers.providers.TransactionResponse;

export interface DBTransaction {
  id: string
  address: string
  amount: string
}
