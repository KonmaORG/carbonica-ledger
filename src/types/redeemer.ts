import { Constr, Data, TLiteral, WalletApi } from "@lucid-evolution/lucid";
import { AcceptRejectActionSchema, ActionSchema, OrefSchema } from "./cardano";

export const PaymentKeyHashSchema = Data.Bytes();
export const StakeKeyHashSchema = Data.Bytes();

export const AddressSchema = Data.Tuple([
  PaymentKeyHashSchema,
  StakeKeyHashSchema,
]);

//#region Karbon ledger

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

//#region Karbon Crowdfuding

export type CampaignState = "Initiated" | "Running" | "Cancelled" | "Finished";

export const CampaignState: Record<
  CampaignState,
  { Title: CampaignState; Schema: TLiteral<CampaignState>; Constr: Constr<[]> }
> = {
  Initiated: {
    Title: "Initiated",
    Schema: Data.Literal("Initiated"),
    Constr: new Constr(0, []),
  },
  Running: {
    Title: "Running",
    Schema: Data.Literal("Running"),
    Constr: new Constr(1, []),
  },
  Cancelled: {
    Title: "Cancelled",
    Schema: Data.Literal("Cancelled"),
    Constr: new Constr(2, []),
  },
  Finished: {
    Title: "Finished",
    Schema: Data.Literal("Finished"),
    Constr: new Constr(3, []),
  },
};

export const CampaignStateSchema = Data.Enum([
  CampaignState.Initiated.Schema,
  CampaignState.Running.Schema,
  CampaignState.Cancelled.Schema,
  CampaignState.Finished.Schema,
]);

export const CampaignStateRedeemer = {
  Initiated: Data.to(new Constr(0, [])),
  Running: Data.to(new Constr(1, [])),
  Cancelled: Data.to(new Constr(2, [])),
  Finished: Data.to(new Constr(3, [])),
  Released: Data.to(new Constr(4, [])),
};
// #endregion
