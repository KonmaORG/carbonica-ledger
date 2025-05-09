# 🔁 Project & Token Workflow — Carbonica Ledger

This document provides an end-to-end breakdown of how data and actions flow through the Carbonica ecosystem — from project submission to token lifecycle management.

Each stage describes the actors involved, validations, data written, and blockchain interactions.

---

## 1️⃣ Project Registration

📍 **Actor**: Developer
📂 **Tables used**: `projects`
📄 **Outcome**: Project is saved in database with status `submitted`

### Steps:

1. Developer logs into the app.
2. Navigates to “Register Project” page.
3. Fills form: name, description, type, location, etc.
4. System inserts into `projects`:

   - Generates UUID
   - Sets `status = draft`

5. When form is complete, developer submits → `status = submitted`

📝 **Special Note**:

- A temporary project token (NFT-like) with `PROJECT_TOKEN_PREFIX` is minted and registered on-chain.
- The corresponding `txHash` is stored.

---

## 2️⃣ Project Verification (Validator Voting)

📍 **Actor**: Validators (role = validator)
📂 **Tables used**: `verification`, `votes`
📄 **Outcome**: Project is either approved or rejected

### Steps:

1. Admin or validator triggers a new `verification` record tied to the project

   - Stores CBOR `unsignedTx` (from frontend wallet builder)
   - Saves CBOR `witness_set`
   - `status = in_review`

2. Validators cast votes via dashboard (approve/reject):

   - Each `vote` is recorded in `votes`
   - When **3 of 5 votes approve**, verification is marked `approved`
   - Else if 3 reject, it’s `rejected`

3. If approved:

   - Transaction is finalized
   - Tokens will be minted via webhook-triggered logic

📝 **Validator Rules**:

- Validators only see verification requests
- Cannot vote twice
- Cannot vote on their own project

---

## 3️⃣ Token Minting (COT)

📍 **Actor**: Protocol backend (via Blockfrost)
📂 **Tables used**: `carbon_offset_tokens`, `carbon_offset_actions`
📄 **Outcome**: Project receives minted carbon credits

### Trigger:

- Blockfrost Webhook detects token mint event on-chain
- Hits: `POST /api/cot-actions/route.ts`

### Steps:

1. Signature is validated against `BLOCKFROST_WEBHOOK_SECRET`

2. Payload is parsed → inputs & outputs aggregated

3. `tokenFlow()` determines if it's a `mint`, `transfer`, or `burn`

4. For mints:

   - Looks up `txHash` of input token with `PROJECT_TOKEN_PREFIX`
   - Queries `projects` table for that tx → fetches project_id and user_id
   - Creates a record in `carbon_offset_tokens`:

     - asset_id
     - project_id
     - minted_for = user_id
     - amount
     - txhash
     - bf_id

5. Parallel record added to `carbon_offset_actions` with `action_type = mint`

---

## 4️⃣ Token Transfers

📍 **Actor**: Users on Cardano
📂 **Table used**: `carbon_offset_actions`
📄 **Outcome**: Token ownership changes

### Trigger:

- User sends COT on-chain
- Blockfrost Webhook triggers same webhook route

### Steps:

1. System parses `inputs` and `outputs`
2. Detects:

   - Same token in both input/output → transfer

3. Creates record:

   - sender_address
   - receiver_address
   - amount
   - action_type = `transfer`
   - status = `transferred`

📝 Transfers are read-only events — no DB writes outside actions table.

---

## 5️⃣ CET Burning (Carbon Emission Tokens)

📍 **Actor**: Emission reporters / organizations
📂 **Tables used**: `carbon_offset_actions`, balances adjusted accordingly
📄 **Outcome**: CET tokens are burned, offsetting carbon

### Trigger:

- Burn TX on-chain (token appears in inputs but not outputs)

### Steps:

1. Detected by webhook → processed by `tokenFlow`
2. Creates `carbon_offset_actions` record:

   - receiver_address = null
   - action_type = `burn`
   - status = `retired`

📝 A burn must reduce total quantity from sender. If not, it's rejected as invalid by logic in `processBody.ts`

---

## 6️⃣ Balances and Status Sync

📍 **Actor**: System
📂 **Tables used**: `carbon_offset_balances`, `carbon_offset_token_status`
📄 **Outcome**: View-like tables for state visualization

### Details:

- **carbon_offset_balances**: derived via sum of actions
- **carbon_offset_token_status**: updated per action

  - mint → `active`
  - transfer → `transferred`
  - burn → `retired`

These are used to show real-time token distribution in UI.

---

## ✅ Summary

| Stage            | Entry Point           | Output Tables                      |
| ---------------- | --------------------- | ---------------------------------- |
| Register Project | Web UI (project form) | `projects`                         |
| Verification     | Dashboard + voting    | `verification`, `votes`            |
| Token Mint       | Blockfrost Webhook    | `carbon_offset_tokens`, `actions`  |
| Token Transfer   | On-chain + Webhook    | `carbon_offset_actions`            |
| CET Burn         | On-chain + Webhook    | `carbon_offset_actions`            |
| Balance Refresh  | Derived from actions  | `carbon_offset_balances`, `status` |

This workflow integrates user-facing forms, validator logic, and on-chain detection for a holistic lifecycle.
