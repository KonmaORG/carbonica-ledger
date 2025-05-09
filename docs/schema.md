# 📚 Database Schema — Carbonica Protocol

This document outlines the full schema for the Carbonica project, detailing all tables, fields, types, relationships, constraints, and business logic context.

---

## 🧾 Table: `projects`

Projects submitted by developers to issue carbon credits.

| Column        | Type      | Description                                          |
| ------------- | --------- | ---------------------------------------------------- |
| `project_id`  | UUID      | Primary key, uniquely identifies a project           |
| `user_id`     | UUID      | FK → `users.user_id`, the creator of the project     |
| `name`        | Text      | Name of the project                                  |
| `description` | Text      | Summary of what the project does                     |
| `location`    | Text      | Geographic region of impact                          |
| `type`        | Text      | Type of project (e.g. forestry, agriculture)         |
| `status`      | Text      | Initial status: draft, submitted, verified, rejected |
| `txHash`      | Text      | Cardano transaction hash that registered the project |
| `created_at`  | Timestamp | Submission timestamp                                 |

⤷ Each project gets a temporary NFT via `PROJECT_TOKEN_PREFIX` before verification.

---

## 🛡️ Table: `verification`

Represents project verification lifecycle.

| Column             | Type      | Description                                           |
| ------------------ | --------- | ----------------------------------------------------- |
| `verification_id`  | UUID      | PK                                                    |
| `project_id`       | UUID      | FK → `projects.project_id`                            |
| `unsignedTx`       | Text      | CBOR of unsigned Cardano transaction (Plutus context) |
| `witness_set`      | Text      | CBOR-encoded witness set for verification             |
| `status`           | Text      | pending, in_review, approved, rejected                |
| `rejection_reason` | Text      | Optional rejection explanation                        |
| `created_at`       | Timestamp | Auto-generated                                        |

⤷ Must reach validator vote majority (≥3 of 5) to be approved.

---

## 🗳️ Table: `votes`

Voting records from validators on a project verification request.

| Column            | Type      | Description                         |
| ----------------- | --------- | ----------------------------------- |
| `vote_id`         | UUID      | PK                                  |
| `verification_id` | UUID      | FK → `verification.verification_id` |
| `user_id`         | UUID      | FK → `users.user_id`                |
| `vote_value`      | Enum      | 'approve' or 'reject'               |
| `voted_at`        | Timestamp | When the vote was cast              |

⤷ Tied to validator role. Once 3+ votes approve → verification is accepted.

---

## 🪙 Table: `carbon_offset_tokens`

Carbon credits minted upon approval of projects.

| Column       | Type      | Description                                   |
| ------------ | --------- | --------------------------------------------- |
| `asset_id`   | Text      | Full unit (policy+asset) of minted token      |
| `project_id` | UUID      | FK → `projects.project_id`                    |
| `minted_for` | UUID      | FK → `users.user_id` who owns the token       |
| `amount`     | Integer   | Quantity of carbon offset credits represented |
| `txhash`     | Text      | Mint transaction hash                         |
| `bf_id`      | Text      | Blockfrost event ID                           |
| `created_at` | Timestamp | When the token was minted                     |

⤷ Mint action is registered on-chain, then captured via webhook + processed into this table.

---

## 🔄 Table: `carbon_offset_actions`

Tracks **every** token lifecycle event: mint, transfer, burn.

| Column             | Type    | Description                  |
| ------------------ | ------- | ---------------------------- |
| `asset_id`         | Text    | Token unit ID                |
| `sender_address`   | Text    | Null if minted               |
| `receiver_address` | Text    | Null if burned               |
| `amount`           | Integer | Number of tokens moved       |
| `action_type`      | Enum    | mint, transfer, burn         |
| `status`           | Enum    | active, transferred, retired |
| `txhash`           | Text    | Cardano tx hash              |
| `bf_id`            | Text    | Blockfrost webhook event ID  |

⤷ Populated by `/api/cot-actions/route.ts` via `tokenFlow` logic.

---

## 🧾 Table: `carbon_offset_balances`

Real-time view of token holdings. Auto-generated via aggregation.

| Column     | Type   | Description                |
| ---------- | ------ | -------------------------- |
| `asset_id` | Text   | Token ID                   |
| `owner`    | Text   | Wallet address             |
| `balance`  | Number | Sum of current held tokens |

---

## 🔐 Table: `users`

Registered platform users with roles.

| Column           | Type      | Description                  |
| ---------------- | --------- | ---------------------------- |
| `user_id`        | UUID      | PK                           |
| `wallet_address` | Text      | Cardano wallet address       |
| `role`           | Enum      | admin, validator, developer  |
| `created_at`     | Timestamp | When the account was created |

---

## 📊 Table: `carbon_offset_token_status`

Tracks internal status states of issued COTs.

| Column       | Type      | Description                        |
| ------------ | --------- | ---------------------------------- |
| `asset_id`   | Text      | FK → carbon_offset_tokens.asset_id |
| `status`     | Enum      | active, transferred, retired       |
| `updated_at` | Timestamp | Time when last status was changed  |

---

This schema is designed to support full traceability and accountability on-chain and off-chain.

Next: proceed to [`workflow.md`](./workflow.md) to understand how data flows through this schema.
