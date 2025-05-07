import {
  MergedToken,
  FlowResult,
  Payload,
  TokenFlow,
  StatusType,
} from "./types";
import { TokenQuantityMismatchError } from "./customError";

const policyId = "68d6e7d81446bb1b72ef42759185bba6e686fc3111eeb9e9af6bafbe";

function getTokenQty(
  payload: Payload[],
  key: "inputs" | "outputs"
): MergedToken[] {
  const merged = new Map<string, MergedToken>();

  for (const item of payload) {
    for (const value of item[key]) {
      for (const amount of value.amount) {
        if (!amount.unit.startsWith(policyId)) continue;

        const mergedKey = `${value.address}_${amount.unit}`;
        const quantity = BigInt(amount.quantity);

        const existing = merged.get(mergedKey);
        if (existing) {
          existing.quantity += quantity;
        } else {
          merged.set(mergedKey, {
            address: value.address,
            unit: amount.unit,
            quantity,
          });
        }
      }
    }
  }

  return Array.from(merged.values());
}

function tokenFlow(id: string, payload: Payload[]): FlowResult[] {
  if (!payload?.[0]?.tx?.hash) return [];

  const isMintOrBurn = payload[0].tx.asset_mint_or_burn_count > 0;
  const inputs = getTokenQty(payload, "inputs");
  const outputs = getTokenQty(payload, "outputs");

  const outputMap = new Map<string, MergedToken[]>();
  for (const output of outputs) {
    const list = outputMap.get(output.unit) || [];
    list.push(output);
    outputMap.set(output.unit, list);
  }

  const inputMap = new Map<string, MergedToken[]>();
  for (const input of inputs) {
    const list = inputMap.get(input.unit) || [];
    list.push(input);
    inputMap.set(input.unit, list);
  }

  // Handle regular transfers and burns (process inputs)
  const flows: TokenFlow[] = inputs.map((input) => {
    const outList = outputMap.get(input.unit) || [];
    const externalOutputs = outList.filter((o) => o.address !== input.address);
    const returnQty = outList
      .filter((o) => o.address === input.address)
      .reduce((acc, cur) => acc + cur.quantity, BigInt(0));

    // Calculate total output quantity
    const totalOutputQty =
      externalOutputs.reduce((acc, cur) => acc + cur.quantity, BigInt(0)) +
      returnQty;

    // If not a mint/burn, validate quantities
    if (!isMintOrBurn && input.quantity !== totalOutputQty) {
      throw new TokenQuantityMismatchError(
        input.unit,
        input.quantity,
        totalOutputQty
      );
    }

    // If output is less than input and mint/burn is active, it's a burn
    const actionType =
      isMintOrBurn && totalOutputQty < input.quantity ? "burn" : "transfer";

    return {
      unit: input.unit,
      input_qty: input.quantity,
      input_address: input.address,
      outputs: externalOutputs.map((o) => ({
        address: actionType === "burn" ? null : o.address,
        quantity: o.quantity,
      })),
      return_qty: returnQty,
      action_type: actionType,
    };
  });
  // Handle mints (tokens in outputs but not in inputs)
  if (isMintOrBurn) {
    for (const output of outputs) {
      if (!inputMap.has(output.unit)) {
        // This is a mint: token appears in outputs but not inputs
        flows.push({
          unit: output.unit,
          input_qty: BigInt(0),
          input_address: null,
          outputs: [
            {
              address: output.address,
              quantity: output.quantity,
            },
          ],
          return_qty: BigInt(0),
          action_type: "mint",
        });
      }
    }
  }
  // Generate final results
  return flows.flatMap((f) => {
    const actions: FlowResult[] = [];

    // Handle regular outputs (transfers or burns with external outputs)
    if (f.outputs.length > 0) {
      actions.push(
        ...f.outputs.map((o) => ({
          asset_id: f.unit,
          sender_address: f.action_type === "mint" ? null : f.input_address,
          receiver_address: f.action_type === "burn" ? null : o.address,
          amount: Number(o.quantity),
          txhash: payload[0].tx.hash,
          status:
            f.action_type === "mint"
              ? "active"
              : f.action_type === "burn"
              ? "retired"
              : ("transferred" as StatusType),
          action_type: f.action_type,
          bf_id: id,
        }))
      );
    }

    // Handle burns with no external outputs (burned quantity = input_qty - return_qty)
    if (
      f.action_type === "burn" &&
      f.input_qty > f.return_qty &&
      f.outputs.length === 0
    ) {
      actions.push({
        asset_id: f.unit,
        sender_address: f.input_address,
        receiver_address: null,
        amount: Number(f.input_qty - f.return_qty),
        txhash: payload[0].tx.hash,
        status: "retired",
        action_type: "burn",
        bf_id: id,
      });
    }

    return actions;
  });
}

export { tokenFlow };
