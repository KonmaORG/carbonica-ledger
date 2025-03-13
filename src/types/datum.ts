import { Constr, Data, WalletApi } from "@lucid-evolution/lucid";
import { AddressSchema } from "./cardano";

//#region Datum

export const AssetClassSchema = Data.Object({
  policyid: Data.Bytes(),
  asset_name: Data.Bytes(),
});

export type AssetClass = Data.Static<typeof AssetClassSchema>;
export const AssetClass = AssetClassSchema as unknown as AssetClass;
//--------------------------------------------------------
export const Atleast = Data.Integer();

//-----------------------------
export const MultisigSchema = Data.Object({
  required: Atleast,
  signers: Data.Array(Data.Bytes()),
});
export type Multisig = Data.Static<typeof MultisigSchema>;
export const Multisig = MultisigSchema as unknown as Multisig;
//-----------------------------------

export const ConfigDatumSchema = Data.Object({
  fees_address: Data.Bytes(),
  fees_amount: Data.Integer(),
  fees_asset_class: AssetClassSchema,
  spend_address: Data.Bytes(),
  categories: Data.Array(Data.Bytes()),
  multisig_validator_group: MultisigSchema,
  multisig_refutxoupdate: MultisigSchema,
  cet_policyid: Data.Bytes(),
  cot_policyId: Data.Bytes(),
});
export type ConfigDatum = Data.Static<typeof ConfigDatumSchema>;
export const ConfigDatum = ConfigDatumSchema as unknown as ConfigDatum;
//----------------------------------------------------
export const KarbonDatumSchema = Data.Object({
  developer: AddressSchema,
  document: Data.Bytes(),
  categories: Data.Bytes(),
  asset_name: Data.Bytes(),
  fees_amount: Data.Integer(),
  fees_asset_class: AssetClassSchema,
});
export type KarbonDatum = Data.Static<typeof KarbonDatumSchema>;
export const KarbonDatum = KarbonDatumSchema as unknown as KarbonDatum;
//----------------------------------------------
