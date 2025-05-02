// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  verifyWebhookSignature,
  SignatureVerificationError,
} from "@blockfrost/blockfrost-js";

const SECRET_AUTH_TOKEN =
  process.env.BLOCKFROST_WEBHOOK_SECRET || "WEBHOOK_AUTH_TOKEN";

// Helper to buffer the request body
async function bufferRequestBody(request: NextRequest): Promise<string> {
  const arrayBuffer = await request.arrayBuffer();
  const body = Buffer.from(arrayBuffer).toString("utf-8");
  return body;
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Webhook endpoint is working ✅" });
}

export async function POST(request: NextRequest) {
  const signatureHeader = request.headers.get("blockfrost-signature");

  if (!signatureHeader) {
    console.log("The request is missing Blockfrost-Signature header");
    return new NextResponse("Missing signature header", { status: 400 });
  }
  console.log("request", request);

  const rawBody = await bufferRequestBody(request);

  try {
    const event = verifyWebhookSignature(
      rawBody,
      signatureHeader,
      SECRET_AUTH_TOKEN,
      600
    );

    const parsedBody = JSON.parse(rawBody);
    const { type, payload } = parsedBody;

    switch (type) {
      case "transaction":
        console.log(`Received ${payload.length} transactions`);
        for (const tx of payload) {
          console.log(`Transaction ${tx.tx.hash}`);
        }
        break;

      case "block":
      case "delegation":
      case "epoch":
        console.log(
          `Expecting "transaction" event, but received event type of ${type}`
        );
        break;

      default:
        console.warn(`Unexpected event type ${type}`);
        break;
    }

    return NextResponse.json({ processed: true });
  } catch (error) {
    console.error(error);
    if (error instanceof SignatureVerificationError) {
      return new NextResponse("Signature is not valid!", { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
