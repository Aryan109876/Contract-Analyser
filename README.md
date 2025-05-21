# Contract Clause Auto-Extractor & Compliance Checker

A sophisticated web application for automating contract review, clause extraction, and regulatory compliance checking for legal professionals.

## Overview

The Contract Clause Auto-Extractor & Compliance Checker is designed to streamline the contract review process by leveraging advanced Natural Language Processing (NLP) and machine learning techniques. This application helps legal professionals:

- Extract and categorize key clauses from contracts
- Check for compliance with UK legal and financial regulations
- Track changes across contract versions
- Quickly search for specific terms in contract repositories

## Features

### Contract Management

- Upload and analyze contracts in multiple formats (PDF, DOCX)
- View extracted clauses with highlighting of potential compliance issues
- Compare different versions of contracts with visual diff highlighting
- Organize contracts by type, status, and compliance level

### Clause Extraction

- Automatic identification of key clauses (liability, termination, etc.)
- NLP-powered extraction of clause text and metadata
- Clause categorization and tagging
- Clause library with standard, compliant clauses

### Compliance Checking

- Automated analysis against UK legal and financial regulations
- Severity-based flagging of non-compliant terms
- Suggestions for compliant alternatives
- Detailed explanations of compliance issues

### Analytics & Reporting

- Dashboard with contract analytics
- Compliance status overview
- Extraction of key contract data
- Exportable compliance reports

## Technology Stack

### Frontend

- Vue.js 3 with TypeScript
- Vuetify 3 for UI components
- Chart.js for data visualization
- Pinia for state management
- Vue Router for navigation

### Backend (Planned)

- Python with Django REST Framework
- spaCy/NLTK for Natural Language Processing
- MongoDB for unstructured contract data storage
- AWS Lambda for serverless processing

### Search (Planned)

- ElasticSearch for full-text contract search

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/contract-clause-extractor.git
   cd contract-clause-extractor
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

## Project Structure

```
contract-clause-extractor/
├── src/
│   ├── assets/            # Static assets
│   ├── components/        # Vue components
│   ├── views/             # Page components
│   ├── router/            # Route definitions
│   ├── services/          # API services
│   ├── stores/            # Pinia stores
│   ├── types/             # TypeScript type definitions
│   ├── styles/            # Global styles
│   ├── App.vue            # Root component
│   └── main.ts            # Entry point
├── public/                # Public static assets
├── index.html             # HTML template
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

This project was inspired by the need to automate repetitive tasks in legal contract review and compliance checking in the UK financial sector.

---

**Note**: This is the frontend implementation of the application. The backend services for NLP processing and database operations would need to be implemented separately.