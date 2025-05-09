# Carbonica Ledger

Carbonica Ledger is a decentralized protocol for managing and verifying carbon offset projects and issuing carbon credits on the Cardano blockchain.

This repository contains the frontend (Next.js) and backend integration (Supabase + Blockfrost) for:

- Registering offset projects
- Verifying projects through validator voting
- Minting and tracking Carbon Offset Tokens (COTs)
- Logging Carbon Emission Tokens (CETs) and their redemption against COTs
- Full on-chain and off-chain lifecycle auditing

---

## 🚀 Features

- 🌍 Project registration & validator-based verification
- 🪙 Token minting (COT) and burning (CET)
- 🔁 Blockchain events processed via Blockfrost webhooks
- 📊 Project dashboard, user profile, and token registry
- 🧾 Full audit trail of token actions (mint/transfer/burn)

---

## 🧱 Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Frontend   | Next.js + TailwindCSS + ShadCN UI |
| Database   | Supabase                          |
| Blockchain | Cardano (via Blockfrost API)      |
| Hosting    | Netlify (Frontend), Supabase      |

---

## 📦 Project Structure

```
konmaorg-carbonica-ledger/
├── README.md
├── public/
├── src/
│   ├── app/ (Routing & Layout)
│   ├── components/ (UI & logic components)
│   ├── lib/ (Blockfrost, metadata, utils)
│   ├── webPages/ (Views for each route)
│   ├── api/cot-actions/ (Webhook logic)
│   └── contexts/ (Auth, Cardano, Verification)
├── .env.example
├── package.json
├── tsconfig.json
└── netlify.toml
```

---

## 🛠️ Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/your-org/konmaorg-carbonica-ledger.git
cd konmaorg-carbonica-ledger
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure your environment**

- Rename `.env.example` to `.env`
- Fill in Blockfrost + Supabase keys

**4. Run the development server**

```bash
npm run dev
```

---

## 🌐 Live Deployment

- Frontend: [Netlify](https://netlify.app)
- Supabase: [Hosted project dashboard](https://app.supabase.io)
- Blockfrost: [API Dashboard](https://blockfrost.io)

---

## 📖 Documentation

Documentation lives in the `/docs` folder:

- `schema.md`: Table & field definitions
- `workflow.md`: Project lifecycle steps
- `roles.md`: Access permissions
- `api.md`: API endpoints and webhook integration
- `glossary.md`: Technical terms and identifiers

---

## 🧠 Contributing

- Pull requests are welcome
- Use proper commit messages
- Follow the project's ESLint & TypeScript config

---

## 📜 License

MIT © Konmaorg
