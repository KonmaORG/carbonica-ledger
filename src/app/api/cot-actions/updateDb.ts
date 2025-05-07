import { supabaseServer } from "./supabase-server";
import { FlowResult, Payload } from "./types";

const PROJECT_TOKEN_PREFIX = "c22c5b0927e8685bf7275eca2d052e77c14b0fb17efd4be6";

export async function UpdateDB(actions: FlowResult[], payload: Payload[]) {
  try {
    const mintActions = actions.filter(
      (action) => action.action_type === "mint"
    );
    const restActions = actions.filter(
      (action) => action.action_type !== "mint"
    );

    // Transform mintActions to match carbon_offset_tokens schema
    const transformedMintActions = await Promise.all(
      mintActions.map(async (action) => {
        const projectTxHash = findProjectTokenTxHash(payload);
        if (!projectTxHash) {
          throw new Error("Project token transaction hash not found");
        }
        const { projectId, mintedFor } = await getProjectId(projectTxHash);
        return {
          asset_id: action.asset_id,
          project_id: projectId,
          minted_for: mintedFor,
          amount: action.amount,
          txhash: action.txhash,
          created_at: new Date().toISOString(),
          bf_id: action.bf_id,
        };
      })
    );

    if (mintActions.length > 0) {
      const { error: mintError } = await supabaseServer
        .from("carbon_offset_tokens")
        .insert(transformedMintActions);

      if (mintError) {
        console.error(
          "Supabase insert error for carbon_offset_tokens:",
          mintError
        );
        throw mintError;
      }
    }

    if (restActions.length > 0) {
      const { error: actionsError } = await supabaseServer
        .from("carbon_offset_actions")
        .insert(restActions);

      if (actionsError) {
        throw actionsError;
      }
    }
  } catch (error: any) {
    throw error;
  }
}

async function getProjectId(tx_hash: string) {
  const { data: projectData, error: projectError } = await supabaseServer
    .from("projects")
    .select("project_id,user_id")
    .eq("txHash", tx_hash)
    .single();

  if (projectError || !projectData) {
    throw projectError;
  }
  console.log(projectData);
  return { projectId: projectData.project_id, mintedFor: projectData.user_id };
}

function findProjectTokenTxHash(payload: Payload[]) {
  for (const input of payload[0].inputs) {
    if (
      input.amount.some((item) => item.unit.startsWith(PROJECT_TOKEN_PREFIX))
    ) {
      return input.tx_hash;
    }
  }
  throw new Error("Project token not found in payload outputs");
}
