<div align="center">

![MJW Design](https://mjwdesign.ca/wp-content/uploads/2024/01/mjw-design-logo.png)

**Built with [MJW Design](https://mjwdesign.ca) — AI-Powered Development**

---

</div>

# MJW COI Calculator Tool

A professional Certificate of Insurance (COI) calculator and proposal generator for insurance workflows. It helps collect coverage inputs, compute key metrics, generate polished PDF proposals, and optionally persist records through **PocketBase cloud saves** or **Supabase**. The app works fully offline in local mode with no backend configuration required.

## Screenshots

| Calculator Input Form | Metrics Panel & Proposal Output |
| :---- | :---- |
| MJW COI Calculator Tool input form interface — placeholder | MJW COI Calculator Tool metrics panel and PDF proposal output — placeholder |

## What It Does

Unlike generic spreadsheet calculators, this tool is purpose-built for COI workflows, combining structured data entry, real-time metrics computation, and production-ready PDF proposal generation in a single browser app.

| Feature | Description |
| :---- | :---- |
| **Input Form** | Structured coverage fields for collecting insured details, policy limits, effective dates, and carrier information. |
| **Metrics Panel** | Real-time computed metrics and coverage analysis derived from entered values. |
| **PDF Proposal** | Formatted, print-ready COI proposal documents generated entirely in the browser via `@react-pdf/renderer`. |
| **Cloud Persistence** | Optional PocketBase or Supabase backend for saving and retrieving COI records. |
| **Local Mode** | Fully functional with no backend — all computation and PDF export work without any environment variables. |

**Key interactions:**

- Fill in the input form with insured, policy, and coverage details.
- View real-time metrics and computed coverage analysis in the metrics panel.
- Generate and download a formatted PDF proposal directly from the browser.
- Optionally authenticate with PocketBase or Supabase to save and retrieve COI records.
- Export proposals for sharing with clients, brokers, or carriers.

## How to Use

The app opens with a blank input form ready for immediate data entry. Complete the coverage fields, then review the metrics panel to verify computed values before generating a proposal. Use the PDF export to produce a formatted document suitable for client delivery. For teams requiring shared record access, configure PocketBase or Supabase to enable cloud-backed saves.

The tool is optimised for desktop use where multi-field form entry and side-by-side metrics review work best, though all core features remain accessible on smaller screens.

## Stack

| Layer | Technology |
| :---- | :---- |
| UI framework | React 18 \+ TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| PDF generation | @react-pdf/renderer 3 |
| Date utilities | date-fns 4 |
| Optional cloud persistence (A) | PocketBase |
| Optional cloud persistence (B) | Supabase |
| Hosting | Netlify |

## Local Development

npm install

npm run dev

The app works fully with **no environment variables**. Without PocketBase or Supabase credentials, it runs as a local browser app with full calculation and PDF export support.

## Quality Checks

npm run typecheck

npm run lint

npm run build

## Available Scripts

npm run dev        \# Start development server (http://localhost:5173)

npm run build      \# Production build → dist/

npm run preview    \# Preview production build locally

npm run lint       \# ESLint check

npm run typecheck  \# TypeScript type check (no emit)

## Environment Variables

All environment variables are optional unless you enable the related backend feature. The app remains production-usable in local-only mode with no configured variables.

| Variable | Required? | Scope | Enables | Description |
| :---- | :---- | :---- | :---- | :---- |
| `VITE_POCKETBASE_URL` | Optional | Frontend/public | PocketBase authentication and cloud COI record saves | Public PocketBase/PocketHost URL used for user authentication and user-scoped CRUD. Example: `https://mjwdesign-core.pockethost.io`. |
| `VITE_SUPABASE_URL` | Optional | Frontend/public | Supabase authentication and cloud COI record saves | Public Supabase project URL. Example: `https://your-project.supabase.co`. |
| `VITE_SUPABASE_ANON_KEY` | Optional | Frontend/public | Supabase client initialisation | Public anon key for the Supabase project. Safe to expose in frontend code as it is scoped by Row Level Security. |

## Cloud Persistence

The app works fully with **no environment variables**. In local-only mode, computed metrics and generated PDFs are available immediately without saving to any backend.

### PocketBase

When `VITE_POCKETBASE_URL` is configured, the app can authenticate users and save COI records to a PocketBase collection. Normal user authentication runs through the public PocketBase URL; **no PocketBase superuser token is placed in frontend code**.

#### Recommended `coi_records` Collection

Create a PocketBase collection named `coi_records` with the following fields.

| Field | Type | Notes |
| :---- | :---- | :---- |
| `title` | text | Display name or reference number for the COI record. |
| `owner` | relation to `users` | Should point to the authenticated user. |
| `input_data` | json | Stores the full set of coverage input fields. |
| `metrics` | json | Stores computed metric values at time of save. |
| `effective_date` | text | Policy effective date string. |
| `expiry_date` | text | Policy expiry date string. |
| `created` | system field | Managed by PocketBase. |
| `updated` | system field | Managed by PocketBase. |

Recommended collection rules should allow authenticated users to create records for themselves and only read, update, or delete their own records. A practical rule pattern is `@request.auth.id != "" && owner = @request.auth.id` for user-scoped list/view/update/delete rules.

### Supabase

When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are configured, the app can use Supabase for authentication and persistent record storage. Configure Row Level Security policies on any COI records table so users can only access their own data.

## PDF Proposal Generation

PDF proposals are generated entirely in the browser using `@react-pdf/renderer`. No server-side rendering or external service is required. The `ProposalPDF` component in `src/components/ProposalPDF.tsx` defines the document layout and accepts computed coverage data as props. Generated PDFs can be downloaded directly from the browser without any backend interaction.

## Netlify Deployment

The `netlify.toml` at the project root configures the Vite build and static routing. To deploy on Netlify, connect this GitHub repository and use the following production settings.

| Setting | Value |
| :---- | :---- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node/package install | Netlify default Node environment with `npm install` |

\[build\]

  command \= "npm run build"

  publish \= "dist"

\[\[redirects\]\]

  from \= "/\*"

  to \= "/index.html"

  status \= 200

Deploy first with no environment variables to confirm the local-only calculator and PDF export work, then add `VITE_POCKETBASE_URL` or Supabase variables if cloud record persistence is needed.

## Project Structure

src/

  components/

    InputForm.tsx             \# Coverage and policy detail input form

    MetricsPanel.tsx          \# Real-time computed metrics display

    ProposalPDF.tsx           \# @react-pdf/renderer PDF proposal document

  lib/

    pocketbase.ts             \# Optional PocketBase client wrapper

  types/

    index.ts                  \# Shared input, metrics, and record types

  utils/

    calculator.ts             \# Core COI metrics computation logic

  App.tsx                     \# Root layout and page orchestration

  main.tsx                    \# Entry point

netlify.toml                  \# Netlify build and redirect configuration

## Changelog

### v0.1.0 — Initial Release

- Added structured COI input form with coverage and policy fields.
- Added real-time metrics panel with computed coverage analysis.
- Added browser-side PDF proposal generation via `@react-pdf/renderer`.
- Added optional PocketBase client integration for cloud record saves.
- Added optional Supabase client integration as an alternative persistence backend.
- Configured Netlify deployment with SPA redirect rules.
- App operates fully in local-only mode with no required environment variables.

---

Part of the **MJW Personal App Platform**.