import { IDENTIFICATION_PID, NETWORK, PROVIDER } from "@/config";
import { ConfigDatumHolderValidator } from "@/config/scripts/scripts";
import {
  fromText,
  LucidEvolution,
  makeWalletFromPrivateKey,
  mintingPolicyToId,
  Script,
  TxSignBuilder,
  Validator,
  validatorToAddress,
} from "@lucid-evolution/lucid";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function adaToLovelace(float: string) {
  const [ada, lovelace] = float.split(".");

  return BigInt(ada) * 1_000000n + BigInt(lovelace || 0);
}

export function getAddress(validatorFunction: { (): Validator; (): Script }) {
  const validator: Validator = validatorFunction();
  const address = validatorToAddress(NETWORK, validator);
  return address;
}
export function getPolicyId(validatorFunction: { (): Validator; (): Script }) {
  const validator: Validator = validatorFunction();
  const policyID = mintingPolicyToId(validator);
  return policyID;
}

export async function refUtxo(lucid: LucidEvolution) {
  const address = getAddress(ConfigDatumHolderValidator);
  const utxos = await lucid.utxosAt(address);

  const ref_configNFT = {
    [IDENTIFICATION_PID + fromText("KarbonIdentificationNFT")]: 1n,
  };
  const utxoWithIdentificationToken = utxos.filter((utxo) => {
    const assets = utxo.assets;

    return Object.keys(ref_configNFT).some(
      (key) => assets[key] === ref_configNFT[key]
    );
  }); // replace with lucid.findUtxowithUnit()

  return utxoWithIdentificationToken;
}

export async function privateKeytoAddress(privateKey: string) {
  const privateeyAddress = await makeWalletFromPrivateKey(
    PROVIDER,
    NETWORK,
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
