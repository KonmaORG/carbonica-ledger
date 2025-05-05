import { MergedToken, FlowResult, Payload } from "./types";

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

  const inputs = getTokenQty(payload, "inputs");
  const outputs = getTokenQty(payload, "outputs");

  const outputMap = new Map<string, MergedToken[]>();
  for (const output of outputs) {
    const list = outputMap.get(output.unit) || [];
    list.push(output);
    outputMap.set(output.unit, list);
  }

  const flows = inputs.map((input) => {
    const outList = outputMap.get(input.unit) || [];
    const externalOutputs = outList.filter((o) => o.address !== input.address);
    const returnQty = outList
      .filter((o) => o.address === input.address)
      .reduce((acc, cur) => acc + cur.quantity, BigInt(0));

    return {
      unit: input.unit,
      input_qty: input.quantity,
      input_address: input.address,
      outputs: externalOutputs.map((o) => ({
        address: o.address,
        quantity: o.quantity,
      })),
      return_qty: returnQty,
    };
  });

  return flows.flatMap((f) =>
    f.outputs.map((o) => ({
      asset_id: f.unit,
      sender_address: f.input_address,
      receiver_address: o.address,
      amount: Number(o.quantity),
      txhash: payload[0].tx.hash,
      status: "transferred" as const,
      action_type: "transfer" as const,
      bf_id: id,
    }))
  );
}

export { tokenFlow };
