import {
  applyDoubleCborEncoding,
  applyParamsToScript,
  Data,
  Validator,
} from "@lucid-evolution/lucid";
import {
  identification_nft_identification_nft_mint,
  config_datum_holder_config_datum_holder_spend,
  validator_contract_validator_contract_mint,
  validator_contract_validator_contract_mint_mint,
} from "./karbonLedger";
import { getPolicyId } from "@/lib/utils";
import { cet_minter_cet_minter_mint } from "./karbonEmission";
import {
  crowdfunding_campaign_spend,
  identication_nft_identification_nft_mint_crowdfunding,
  state_token_script_state_token_script_spend,
} from "./crowdfunding_plutus";

export const identificationPolicyid: Data = process.env
  .NEXT_PUBLIC_IDENTIFICATION_PID as string;

//#region Karbon_Ledger

//------------------------------------------------------------------
const identificationNFT_Mint = applyDoubleCborEncoding(
  identification_nft_identification_nft_mint
);

export function IdentificationNFT_MintValidator(params: any[]): Validator {
  return {
    type: "PlutusV3",
    script: applyParamsToScript(identificationNFT_Mint, params),
  };
}

//------------------------------------------------------------------
const configdatumholderscript = applyDoubleCborEncoding(
  config_datum_holder_config_datum_holder_spend
);

export function ConfigDatumHolderValidator(): Validator {
  return {
    type: "PlutusV3",
    script: configdatumholderscript,
  };
}

// --------------------------------------------------------------
const ValidatorContractScript = applyDoubleCborEncoding(
  validator_contract_validator_contract_mint
);
export function ValidatorContract(): Validator {
  //config_nft : PolicyId; validator_contract_mint: PolicyId
  const validatorMinterParam = getPolicyId(ValidatorMinter);
  return {
    type: "PlutusV3",
    script: applyParamsToScript(ValidatorContractScript, [
      identificationPolicyid,
      validatorMinterParam,
    ]),
  };
}

// --------------------------------------------------------------
const ValidatorMinterScript = applyDoubleCborEncoding(
  validator_contract_validator_contract_mint_mint
);
export function ValidatorMinter(): Validator {
  //config_nft : PolicyId;
  return {
    type: "PlutusV3",
    script: applyParamsToScript(ValidatorMinterScript, [
      identificationPolicyid,
    ]),
  };
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#region Karbon_Emission
const cet_minter_mint = applyDoubleCborEncoding(cet_minter_cet_minter_mint);

export const CETMINTER: Validator = {
  type: "PlutusV3",
  script: cet_minter_mint,
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//#region Karbon_Crowdfunding
const IdetificationPID: string =
  "06cab6a81e5f3dcbfdd0a68e57edf77c43682063e8df89c545ec5dfd";

const identificationNFT_Mint_crowdfunding = applyDoubleCborEncoding(
  identication_nft_identification_nft_mint_crowdfunding
);

export function IdentificationNFTValidator(params: any[]): Validator {
  return {
    type: "PlutusV3",
    script: applyParamsToScript(identificationNFT_Mint, params),
  };
}

// ------------------------------------------------------------------
const state_token_script = applyDoubleCborEncoding(
  state_token_script_state_token_script_spend
);

export function StateTokenValidator(): Validator {
  return {
    type: "PlutusV3",
    script: applyParamsToScript(state_token_script, [IdetificationPID]),
  };
}

//   ------------------------------------------------------------------
const crowdfunding_script = applyDoubleCborEncoding(
  crowdfunding_campaign_spend
);

export function CrowdfundingValidator(params: any[]): Validator {
  return {
    type: "PlutusV3",
    script: applyParamsToScript(crowdfunding_script, params),
  };
}
