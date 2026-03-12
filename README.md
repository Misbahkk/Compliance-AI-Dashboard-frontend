# ReviewReady - ABPI Compliance AI

AI-powered compliance platform that flags ABPI Code violations in pharmaceutical promotional content before formal review, with auto-generated compliant alternatives and PMCPA case matching.

## Features

- **LLM-Powered Analysis**: Enterprise-grade language model maps every claim against ABPI Code clauses
- **PMCPA Case Intelligence**: Every flag is contextualized by relevant historical rulings
- **3 Compliant Alternatives**: Each issue comes with three LLM-generated rewrites
- **RAG Compliance Score**: Overall compliance temperature check for submission readiness
- **Zero Data Retention**: Documents never leave your secure enterprise boundary
- **Audit Trail**: Every query and output logged with identity and timestamp

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production to the `build` folder
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
Compliance_ai/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js              # Main application component
│   └── index.js            # Entry point
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Application Pages

1. **Landing Page** - Marketing and feature overview
2. **Compliance App** - Document upload and analysis dashboard
3. **Organisation Portal** - User management and onboarding
4. **Super Admin** - Platform administration and analytics

## Technology Stack

- React 18.2.0
- React DOM 18.2.0
- React Scripts 5.0.1
- Inline CSS (no external CSS frameworks)

## UI/UX Features

- Fully responsive design
- Dark theme with teal accent colors
- Glass morphism card design
- Animated counters and progress indicators
- Interactive hover states
- Smooth transitions

