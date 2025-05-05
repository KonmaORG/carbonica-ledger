export interface WebhookBody {
  id: string;
  type: string;
  payload: Payload[];
}
export interface Amount {
  unit: string;
  quantity: string;
}

export interface InputOutput {
  address: string;
  amount: Amount[];
  tx_hash?: string;
  output_index?: number;
  data_hash?: string | null;
  inline_datum?: string | null;
  reference_script_hash?: string | null;
  collateral?: boolean;
  reference?: boolean;
  consumed_by_tx?: string | null;
}

export interface Transaction {
  hash: string;
  block: string;
  block_height: number;
  block_time: number;
  slot: number;
  index: number;
  output_amount: Amount[];
  fees: string;
  deposit: string;
  size: number;
  invalid_before: string;
  invalid_hereafter: string;
  utxo_count: number;
  withdrawal_count: number;
  mir_cert_count: number;
  delegation_count: number;
  stake_cert_count: number;
  pool_update_count: number;
  pool_retire_count: number;
  asset_mint_or_burn_count: number;
  redeemer_count: number;
  valid_contract: boolean;
}

export interface Payload {
  tx: Transaction;
  inputs: InputOutput[];
  outputs: InputOutput[];
}

export interface FlowResult {
  asset_id: string;
  sender_address: string;
  receiver_address: string;
  amount: number;
  txhash: string;
  status: "transferred";
  action_type: "transfer";
  bf_id: string;
}

export interface MergedToken {
  address: string;
  unit: string;
  quantity: bigint;
}
