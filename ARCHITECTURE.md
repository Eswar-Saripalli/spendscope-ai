# System Architecture

SpendScope AI follows a frontend-first SaaS dashboard architecture built with Next.js and React.

## Core Layers

- UI Layer
- State Management Layer
- Analytics Layer
- Persistence Layer

## Components

### Form Layer
Handles:
- AI tool input
- Spend collection
- Team size collection
- Dynamic tool management

### Results Layer
Handles:
- Savings calculations
- Recommendation rendering
- Spend comparison visualization
- PDF export
- Audit history

### State Management
Zustand is used for global state management.

### Persistence
localStorage is used to persist audit history.