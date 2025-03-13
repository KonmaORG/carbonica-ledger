import { Constr, Data, WalletApi } from "@lucid-evolution/lucid";
import { AcceptRejectActionSchema, ActionSchema, OrefSchema } from "./cardano";

//#region Redeemer

export const KarbonRedeemerSpendSchema = Data.Object({
  action: AcceptRejectActionSchema,
  amount: Data.Integer(),
  oref: OrefSchema,
});
export type KarbonRedeemerSpend = Data.Static<typeof KarbonRedeemerSpendSchema>;
export const KarbonRedeemerSpend =
  KarbonRedeemerSpendSchema as unknown as KarbonRedeemerSpend;

export const KarbonRedeemerMintSchema = Data.Object({
  action: ActionSchema,
  amount: Data.Integer(),
  oref: OrefSchema,
});
export type KarbonRedeemerMint = Data.Static<typeof KarbonRedeemerMintSchema>;
export const KarbonRedeemerMint =
  KarbonRedeemerMintSchema as unknown as KarbonRedeemerMint;
// ...........................

export const IdentificationRedeemerSchema = Data.Enum([
  Data.Literal("Mint"),
  Data.Literal("Burn"),
]);
export type IdentificationRedeemer = Data.Static<
  typeof IdentificationRedeemerSchema
>;
export const IdentificationRedeemer =
  IdentificationRedeemerSchema as unknown as IdentificationRedeemer;

// #endregion
