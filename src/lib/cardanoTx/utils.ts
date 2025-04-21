import { NETWORK, IDENTIFICATION_PID, BF_URL, BF_PID } from "@/config";
import { ConfigDatumHolderValidator } from "@/config/scripts/scripts";
import { KarbonDatum } from "@/types/datum";
import {
  LucidEvolution,
  validatorToAddress,
  fromText,
  Validator,
  makeWalletFromPrivateKey,
  TxSignBuilder,
  keyHashToCredential,
  credentialToAddress,
  UTxO,
  Data,
  Blockfrost,
  Network,
} from "@lucid-evolution/lucid";

export async function refUtxo(lucid: LucidEvolution) {
  const validator: Validator = ConfigDatumHolderValidator();
  const address = validatorToAddress(NETWORK as Network, validator);

  const ref_configNFT =
    IDENTIFICATION_PID + fromText("KarbonIdentificationNFT");
  const utxoWithIdentificationToken = await lucid.utxosAtWithUnit(
    address,
    ref_configNFT
  );

  return utxoWithIdentificationToken;
}

export async function privateKeytoAddress(privateKey: string) {
  const PROVIDER = new Blockfrost(BF_URL, BF_PID);
  const privateeyAddress = await makeWalletFromPrivateKey(
    PROVIDER,
    NETWORK as Network,
    privateKey
  ).address();
  return privateeyAddress;
}

export async function multiSignwithPrivateKey(
  tx: TxSignBuilder,
  privateKeys: string[]
) {
  let signed = tx;
  for (const privateKey of privateKeys) {
    signed = await signWithPrivateKey(signed, privateKey);
  }
  return signed;
}
export async function signWithPrivateKey(
  tx: TxSignBuilder,
  privateKey: string
) {
  const signed = await tx.sign.withPrivateKey(privateKey);
  return signed;
}

export function hashtoAddress(hash: string[]) {
  const vkh = keyHashToCredential(hash[0]);
  const skh = keyHashToCredential(hash[1]);
  const address = credentialToAddress(NETWORK as Network, vkh, skh);
  return address;
}

export async function getKarbonDatum(lucid: LucidEvolution, utxo: UTxO) {
  const data = await lucid.datumOf(utxo);
  const datum = Data.castFrom(data, KarbonDatum);
  return datum;
}

export function tupleToAddress(tuple: [string, string]) {
  const pc = keyHashToCredential(tuple[0]);
  const sc = keyHashToCredential(tuple[1]);
  const address = credentialToAddress(NETWORK as Network, pc, sc);
  return address;
}
