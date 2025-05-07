// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  verifyWebhookSignature,
  SignatureVerificationError,
} from "@blockfrost/blockfrost-js";
import { tokenFlow } from "./processBody";
import { supabaseServer } from "./supabase-server";
import { Payload, WebhookBody } from "./types";
import { TokenQuantityMismatchError } from "./customClass";

const SECRET_AUTH_TOKEN = process.env.BLOCKFROST_WEBHOOK_SECRET;

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Webhook endpoint is working ✅" });
}

export async function POST(request: NextRequest) {
  const signatureHeader = request.headers.get("blockfrost-signature");
  if (!signatureHeader) {
    return new NextResponse("Missing signature header", { status: 400 });
  }
  if (!SECRET_AUTH_TOKEN) {
    console.error("BLOCKFROST_WEBHOOK_SECRET is not set");
    return new NextResponse("Server configuration error", { status: 500 });
  }

  const rawBody = await bufferRequestBody(request);
  try {
    // const event = verifyWebhookSignature(
    //   rawBody,
    //   signatureHeader,
    //   SECRET_AUTH_TOKEN,
    //   600
    // );

    const parsedBody = JSON.parse(rawBody);
    if (!isValidWebhookBody(parsedBody)) {
      return new NextResponse("Invalid webhook body", { status: 400 });
    }
    const { id, type, payload } = parsedBody;
    switch (type) {
      case "transaction":
        const actions = tokenFlow(id, payload);
        const { data, error } = await supabaseServer
          .from("carbon_offset_actions")
          .insert(actions);

        if (error) {
          console.error("Supabase insert error:", error);
          return new NextResponse("Supabase insert Error", { status: 500 });
        }
        break;

      case "block":
      case "delegation":
      case "epoch":
        console.log(`Ignoring event type: ${type}`);
        return NextResponse.json({
          processed: false,
          message: `Event type ${type} not handled`,
        });
      default:
        console.warn(`Unexpected event type: ${type}`);
        return new NextResponse(`Unexpected event type: ${type}`, {
          status: 400,
        });
    }

    return NextResponse.json({ processed: true });
  } catch (error: any) {
    console.error(error);
    if (error instanceof SignatureVerificationError) {
      return new NextResponse("Signature is not valid!", { status: 400 });
    }
    if (error instanceof TokenQuantityMismatchError) {
      return new NextResponse(error.message || "Token Quantity Mismatch", {
        status: 400,
      });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

//#region Helper Function

function isValidWebhookBody(body: unknown): body is WebhookBody {
  return (
    typeof body === "object" &&
    body !== null &&
    "id" in body &&
    typeof body.id === "string" &&
    "type" in body &&
    typeof body.type === "string" &&
    "payload" in body &&
    Array.isArray(body.payload)
  );
}

async function bufferRequestBody(request: NextRequest): Promise<string> {
  try {
    const arrayBuffer = await request.arrayBuffer();
    return Buffer.from(arrayBuffer).toString("utf-8");
  } catch (error) {
    console.error("Error buffering request body:", error);
    throw new Error("Invalid request body");
  }
}
