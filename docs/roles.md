# 👤 Roles & Permissions — Carbonica Ledger

This document outlines the platform’s role-based access control (RBAC) system. Each user is assigned a `role` upon creation. Permissions are enforced both in the frontend (Next.js contexts) and backend (Supabase Row Level Security).

Roles are structured to reflect real-world accountability:

- **Developer**: Project owner
- **Validator**: Third-party reviewer
- **Admin**: Platform-level governance

---

## 👥 Roles Defined

### 🧪 Developer

Carbon project creators. They:

- Submit project details
- Await verification
- Receive carbon credits if approved

**Permissions:**

| Feature                         | Allowed?       |
| ------------------------------- | -------------- |
| Register project                | ✅             |
| View own projects               | ✅             |
| Edit draft project              | ✅             |
| Submit project for verification | ✅             |
| Vote on projects                | ❌             |
| See verification dashboard      | ✅ (read-only) |
| Receive credits (if approved)   | ✅             |
| Burn emission tokens            | ✅             |

---

### 🧾 Validator

Independent reviewers who approve or reject submitted projects. Only validators may vote.

**Permissions:**

| Feature                     | Allowed? |
| --------------------------- | -------- |
| View all verification tasks | ✅       |
| Vote (approve/reject)       | ✅       |
| View vote history           | ✅       |
| See own projects            | ❌       |
| Submit new project          | ❌       |
| Mint tokens                 | ❌       |
| View credits registry       | ✅       |

**Constraints:**

- Cannot vote more than once per project
- Cannot vote on own submissions
- Votes are final (cannot be changed)

---

### 🛠️ Admin

Admin role combines dev + validator privileges with additional override access.

**Permissions:**

| Feature                          | Allowed?           |
| -------------------------------- | ------------------ |
| Full access to all tables        | ✅                 |
| Submit + approve projects        | ✅                 |
| View and override votes          | ✅                 |
| Direct minting (bypassing votes) | ✅ (optional tool) |
| Manage platform configurations   | ✅                 |
| Debug or reprocess webhooks      | ✅                 |
| Access API usage logs            | ✅                 |

---

## 🔐 Enforcement Mechanisms

### Frontend Controls (Next.js)

- Contexts: `AuthContext`, `VerificationContext`
- Pages and forms wrapped with `<ProtectedRoute>`
- Routes like `/projects/register`, `/verification`, `/registry` gated by role checks

### Supabase RLS (Row-Level Security)

- Tables like `projects`, `votes`, `verification`, `carbon_offset_tokens` use:

  - `auth.uid() = user_id`
  - `EXISTS()` for allowed role checks

- Role is determined by `users.role`
- Use of service role keys for server-only logic (minting, updates)

### API Endpoint Restrictions

- API routes in `/api/cot-actions/` are role-agnostic, but auth headers can be extended for role-based filters

---

## 🧠 Role Upgrade Logic

| Source                          | Role Assigned |
| ------------------------------- | ------------- |
| Email/domain match (admin list) | admin         |
| Project form submission         | developer     |
| Manual via DB or script         | validator     |

You may upgrade/downgrade a user’s role manually using Supabase Dashboard or admin-only forms.

---

## ✅ Summary Matrix

| Action               | Developer | Validator     | Admin |
| -------------------- | --------- | ------------- | ----- |
| Register project     | ✅        | ❌            | ✅    |
| Vote on verification | ❌        | ✅            | ✅    |
| Approve project      | ❌        | ✅ (via vote) | ✅    |
| View registry        | ✅        | ✅            | ✅    |
| Burn CET tokens      | ✅        | ✅            | ✅    |
| Mint COT tokens      | ❌        | ❌            | ✅    |

All roles are logged and audit-tracked to ensure transparent governance across the platform.
