# 🌐 API Reference — Carbonica Ledger

This document describes the API and webhook architecture for Carbonica's interaction between Supabase, Cardano (via Blockfrost), and the frontend. It covers endpoint usage, security, expected payloads, and side effects.

---

## 🧭 Index

- [Webhook: `/api/cot-actions`](#1-webhook-api-cot-actions)
- [Supabase RPC: `get_carbon_credits`](#2-rpc-get_carbon_credits)
- [Utility APIs](#3-utility-api-routes)
- [Security & Validation](#4-security)
- [Error Handling](#5-error-handling)

---

## 1️⃣ Webhook: `/api/cot-actions/route.ts`

### 📌 Purpose:

To handle Cardano blockchain events via **Blockfrost Webhook** — specifically for:

- Minting COTs
- Detecting CET burns
- Logging token transfers

### 🔁 Trigger:

A webhook call from Blockfrost containing TX payload

### 🔐 Security:

- Validates signature using shared `BLOCKFROST_WEBHOOK_SECRET`
- Rejects if missing/invalid

### 📥 Sample Payload:

```json
{
  "event_id": "evt123",
  "tx_hash": "abc123...",
  "inputs": [...],
  "outputs": [...],
  "metadata": {...},
  "timestamp": 1715171000
}
```

### 📤 Behavior:

- Calls `tokenFlow()` in `lib/utils/tokenFlow.ts`
- Decides action type (mint, burn, transfer)
- Enriches data using metadata or lookup
- Inserts to:

  - `carbon_offset_tokens`
  - `carbon_offset_actions`

### ✅ Result:

Webhook returns 200 OK or appropriate error

---

## 2️⃣ RPC: `get_carbon_credits`

### 📌 Purpose:

Server-side Supabase RPC that calculates all COTs minted and CETs burned per user/project

### 🔁 Parameters:

```sql
SELECT * FROM get_carbon_credits(user_wallet TEXT);
```

### 📤 Returns:

- Net balance of COTs
- Breakdown of active vs retired
- Associated project IDs

Used in frontend dashboards to calculate token totals

---

## 3️⃣ Utility API Routes

### `/api/projects/register.ts`

Registers new projects via form submission

- Auth: requires user to be `developer`
- Validates required fields
- Inserts into `projects`

### `/api/verification/submit.ts`

- Starts verification round
- Accepts CBOR of unsignedTx & witness set
- Sets `verification.status = in_review`

### `/api/vote/submit.ts`

- Accepts validator’s vote
- Ensures:

  - Role is `validator`
  - Hasn’t voted before
  - Not voting on own project

---

## 4️⃣ Security

### Signature Verification (Webhook):

```ts
verifyWebhookSignature(
  rawBody,
  headers["X-Signature"],
  process.env.BLOCKFROST_WEBHOOK_SECRET
);
```

- Protects against spoofed webhooks

### Supabase RLS

- Enforced for all public REST calls
- Admin calls must use `service_role`

---

## 5️⃣ Error Handling

### HTTP Status Codes:

- `200 OK`: Successfully processed
- `400 Bad Request`: Invalid format or data
- `401 Unauthorized`: Missing auth token
- `403 Forbidden`: Role mismatch
- `500 Internal Server Error`: Catch-all for logic failures

### Logging

- All webhook events stored in Supabase logs (or optional `webhook_logs` table)

---

## 🧠 Notes

- Webhooks are idempotent — duplicate calls are ignored by checking `bf_id`
- Token state is driven by event detection, not user interaction
- CET burning is automatic — no UI required

For more: refer to [`tokenFlow.ts`](../src/lib/utils/tokenFlow.ts) and [`processBody.ts`](../src/api/cot-actions/).

Next up: [`glossary.md`](./glossary.md) — common terms and concepts.
