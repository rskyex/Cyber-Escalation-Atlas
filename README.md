# Cyber Escalation Atlas

An interactive research platform that maps and analyzes state-linked cyber operations across escalation, infrastructure, governance, and attribution dimensions. Built as part of the [Faultline](https://faultline.tech) research ecosystem.

## Overview

The Cyber Escalation Atlas provides structured analysis of 30 cyber incidents (2007-2025), bridging the gap between technical threat intelligence and policy analysis. It is designed for policymakers, analysts, educators, and students seeking to understand cyber operations as strategic behaviors.

### Four Analytical Lenses

- **Escalation Lens** - Interactive Unpeace scoring across Stable / Contested / Escalatory zones with phase-by-phase trajectories
- **Infrastructure Lens** - Critical sector targeting across 8 sectors with dependency maps, entanglement scoring, and ICS/OT analysis
- **Governance Lens** - Policy responses, norms violations, sanctions, indictments, and regulatory changes with citations from Tallinn Manual 2.0 and UN GGE
- **Attribution Lens** - Attribution confidence matrix and chain timelines showing who attributed, when, and with what evidence

### Data Tools

- **Cases** - Explore 30 structured case studies with filtering and comparison
- **Timeline** - Chronological visualization (2007-2025) sized by Unpeace score and colored by operation type
- **Threat Actor Profiles** - 7 named actors including Sandworm, Lazarus Group, SVR/APT29, Hafnium, and Scattered Spider
- **Sector Risk Dashboard** - Incident distribution across 11 critical infrastructure sectors with TTP analysis
- **Cross-Case Comparison** - Side-by-side comparison tool for multiple cases

### Research Tools

- **Brief Generator** - Generate structured analytical briefs filtered by threat actor, sector, and region
- **Norm Evolution Tracker** - 6 key international cyber norms tracked across all cases
- **Legal Framework Mapper** - UN Charter, IHL, Tallinn Manual 2.0, and ILC Articles mapped rule-by-rule to cases

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) 14 (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) 5.7 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 3.4 |
| Animation | [Framer Motion](https://www.framer.com/motion/) 11 |
| Charts | [Recharts](https://recharts.org/) 3 |
| Maps | [React Simple Maps](https://www.react-simple-maps.io/) 3 |
| Export | html2canvas + jsPDF |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/rskyex/Cyber-Escalation-Atlas.git
cd Cyber-Escalation-Atlas
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── cases/            # Case listing and detail pages
│   ├── escalation-lens/  # Escalation analysis
│   ├── infrastructure-lens/  # Infrastructure analysis
│   ├── governance-lens/  # Governance analysis
│   ├── attribution-lens/ # Attribution analysis
│   ├── actors/           # Threat actor profiles
│   ├── timeline/         # Chronological timeline
│   ├── sectors/          # Sector risk dashboard
│   ├── compare/          # Cross-case comparison
│   ├── brief/            # Brief generator
│   ├── norms/            # Norm evolution tracker
│   ├── legal/            # Legal framework mapper
│   └── api/              # API routes
├── components/           # Reusable React components
│   ├── case-detail/      # Case detail view components
│   ├── cases/            # Case listing components
│   ├── escalation/       # Escalation lens visualization
│   ├── governance/       # Governance lens visualization
│   ├── infrastructure/   # Infrastructure lens visualization
│   ├── compare/          # Comparison tool
│   ├── layout/           # Header, Footer, ThemeProvider
│   └── ui/               # Base UI components
├── data/                 # Incident data and type definitions
│   ├── incidents/        # 30 structured case studies
│   ├── actors.ts         # Threat actor profiles
│   ├── norms.ts          # International norms
│   └── legalFrameworks.ts # Legal framework mappings
└── lib/                  # Utilities and helpers
    ├── types/            # Type definitions
    └── utils/            # Scoring, filtering, geo, PDF utilities
```

## Data Model

The platform tracks cyber incidents across multiple dimensions:

- **Incident Types**: Espionage, Destructive, Ransomware, Influence, Sabotage, Hybrid
- **Escalation Tiers**: Probing, Intrusion, Disruption, Degradation, Destruction, Strategic
- **Target Sectors**: Energy, Finance, Government, Healthcare, Telecommunications, Transportation, Defense, Technology, Manufacturing, Media, Education
- **Governance Flags**: Norm Violation, Public Attribution, Sanctions, Indictment, UN Discussion, Regulatory Change, International Cooperation, Deterrence Signal

## License

This project is private and not currently open for redistribution.
