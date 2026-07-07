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
- Optionally authenticate with PocketBase or Supabase to save and retrieve COI records across sessions.
- Use local mode with no environment variables for offline or pre-deployment use.

## How to Use

The app opens directly to the calculator input form. Enter the insured's details, policy limits, effective and expiration dates, and carrier information. The metrics panel updates in real time as values are entered, showing computed coverage analysis. When the inputs are complete, generate and download a PDF proposal with a single action. Records can optionally be saved to a PocketBase or Supabase backend for retrieval across sessions or by other users. In local mode, all computation and export features work without any backend configuration.

## Stack

| Layer | Technology |
| :---- | :---- |
| UI framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| PDF generation | @react-pdf/renderer 3 |
| Date utilities | date-fns 4 |
| Optional cloud persistence (A) | PocketBase |
| Optional cloud persistence (B) | Supabase |
| Hosting | Netlify |

## Local Development

```
npm install
```

```
npm run dev
```

The app works fully with **no environment variables**. Without PocketBase or Supabase variables, it runs as a local browser app with all calculation, metrics, and PDF export features fully available.

## Quality Checks

```
npm run typecheck
```

```
npm run lint
```

```
npm run build
```

## Available Scripts

```
npm run dev        # Start development server (http://localhost:5173)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint check
npm run typecheck  # TypeScript type check (no emit)
```

## Environment Variables

All environment variables are optional unless you enable the related feature. The app remains production-usable in local-only mode with no configured variables.

| Variable | Required? | Scope | Enables | Description |
| :---- | :---- | :---- | :---- | :---- |
| `VITE_POCKETBASE_URL` | Optional | Frontend/public | PocketBase sign-in and cloud COI record saves | Public PocketBase/PocketHost URL used for user authentication and user-scoped record CRUD. Example: `https://mjwdesign-core.pockethost.io`. |
| `VITE_SUPABASE_URL` | Optional | Frontend/public | Supabase cloud persistence | Public Supabase project URL. Found in your Supabase project settings under API. |
| `VITE_SUPABASE_ANON_KEY` | Optional | Frontend/public | Supabase client authentication | Public Supabase anon/public key. Safe to include as a `VITE_` variable. |

## Cloud Persistence and PocketBase Setup

The app works fully with **no environment variables**. In local-only mode, all calculator and PDF export features operate entirely in the browser with no data persisted between sessions.

Cloud saves are optional. When `VITE_POCKETBASE_URL` is configured, the app can authenticate users and save COI records to a PocketBase collection. Normal user authentication runs through the public PocketBase URL; **no PocketBase superuser token is placed in frontend code**.

### Recommended `coi_records` Collection

Create a PocketBase collection named `coi_records`. The current implementation expects authenticated users to own their own records through an `owner` relation field. For the MJW canonical schema, configure the following fields.

| Field | Type | Notes |
| :---- | :---- | :---- |
| `title` | text | Display label for the COI record. |
| `insured_name` | text | Name of the insured party. |
| `owner` | relation to `users` | Should point to the authenticated user. |
| `record_json` | json | Stores the full calculator input and computed metrics. |
| `proposal_notes` | text | Optional notes attached to the proposal. |
| `effective_date` | text or date | Policy effective date. |
| `expiration_date` | text or date | Policy expiration date. |
| `visibility` | select | Recommended values: `private`, `shared`. |
| `created` | system field | Managed by PocketBase. |
| `updated` | system field | Managed by PocketBase. |

Recommended collection rules should allow authenticated users to create records for themselves and only read, update, or delete their own records. A practical rule pattern is `@request.auth.id != "" && owner = @request.auth.id` for user-scoped list/view/update/delete rules.

### Supabase Setup

When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are configured, the app can use Supabase as an alternative persistence backend. Create a `coi_records` table in your Supabase project with equivalent fields. Enable Row Level Security and apply policies that restrict users to reading and writing their own records. Both PocketBase and Supabase integration are optional; the app does not require either to function.

## Netlify Deployment

The `netlify.toml` at the project root configures the Vite build and static routing. To deploy on Netlify, connect this GitHub repository and use the following production settings.

| Setting | Value |
| :---- | :---- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node/package install | Netlify default Node environment with `npm install` |

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Deploy first with no environment variables to confirm the local-only app works, then add `VITE_POCKETBASE_URL` or Supabase variables for cloud persistence if those features are needed.

## Accessibility and Production Readiness

The release UI includes accessible labels on all major form fields, action buttons, and panel controls. Empty and no-configuration states are intentionally explicit so the app remains understandable before optional backend services are configured. The PDF proposal output is generated entirely client-side, ensuring the core deliverable is always available regardless of backend status.

## Project Structure

```
src/
  components/
    InputForm.tsx         # Structured COI coverage input form
    MetricsPanel.tsx      # Real-time computed metrics and coverage analysis
    ProposalPDF.tsx       # @react-pdf/renderer PDF proposal document component
  lib/
    pocketbase.ts         # Optional PocketBase client wrapper
  types/
    index.ts              # Shared COI input, metrics, and record types
  utils/
    calculator.ts         # Core COI metrics computation logic
  App.tsx                 # Root layout + form/metrics/export wiring
  main.tsx                # Entry point
  index.css               # Tailwind base styles

netlify.toml              # Netlify build and redirect configuration
tailwind.config.js        # Tailwind CSS configuration
vite.config.ts            # Vite build configuration
```

## Changelog

### v1.0.0 — Initial Release

- Structured COI input form with insured, policy limit, date, and carrier fields.
- Real-time metrics panel with computed coverage analysis.
- In-browser PDF proposal generation via `@react-pdf/renderer` with no server dependency.
- Optional PocketBase cloud saves for authenticated user-scoped COI records.
- Optional Supabase persistence as an alternative cloud backend.
- Fully functional local mode with no environment variables required.
- Netlify deployment configuration with SPA redirect support.

---

Part of the **MJW Personal App Platform**.