# 📖 Glossary — Carbonica Ledger

This glossary defines technical, blockchain, and platform-specific terms used throughout the Carbonica documentation and application.

---

### 🪙 **Carbon Offset Token (COT)**

A **fungible** token issued on Cardano to represent verified carbon offsets. Minted after a project is approved. COTs can be transferred or burned.

---

### 🔥 **Carbon Emission Token (CET)**

A **non-transferable** token representing a carbon emission event. These must be burned against COTs for neutralization.

---

### 🧾 **PROJECT_TOKEN_PREFIX**

A policy+asset prefix used to mint a **temporary identifier NFT** for a project upon registration. This token links the project’s metadata on-chain prior to full verification.

---

### 🛠️ **Verification**

A process where validators vote to approve/reject a submitted project. When a project receives **majority (≥3)** votes of approval, it is eligible for token minting.

---

### 🗳️ **Validator Vote**

A vote by a `validator` role user indicating support or rejection of a project. Votes are stored in the `votes` table and cannot be changed once submitted.

---

### 📄 **CBOR (Concise Binary Object Representation)**

Used to represent unsigned Cardano transactions and witness sets. CBOR encoding allows raw blockchain data to be submitted for signing.

---

### 🔄 **Token Flow**

An internal term describing token lifecycle detection:

- **Mint** → token appears in outputs only
- **Transfer** → token appears in both inputs and outputs with equal amounts
- **Burn** → token is in inputs but missing or reduced in outputs

Handled via `tokenFlow()` in backend utils.

---

### 🧮 **carbon_offset_balances**

A view-like aggregation of balances across addresses. Useful for rendering current token holdings.

---

### 📦 **carbon_offset_actions**

Transaction log that records **every mint**, **transfer**, or **burn** of COTs. Used for audits and UI history.

---

### 🔐 **Supabase Row-Level Security (RLS)**

Authorization mechanism that ensures users can only interact with data they own or are permitted to view. Used for enforcing role-based access.

---

### 🌐 **Blockfrost Webhook**

A real-time POST request from Blockfrost to notify the backend of on-chain events such as minting or burning. Used to sync blockchain state with database records.

---

### 📊 **get_carbon_credits (RPC)**

A Supabase remote procedure call to calculate:

- Net carbon credits held
- Amount retired
- Grouped by project and token

---

### 🧾 **bf_id**

A unique identifier for each webhook event received from Blockfrost. Used to prevent duplicate processing.
