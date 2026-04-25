# Project Context & Rules - SmartPlate

## Tech Stack
- Language: TypeScript
- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS
- UI Components: Shadcn/UI & Lucide Icons
- AI Integration: OpenAI/Gemini SDK via Server Actions

## Architecture Rules
1. Client-Server Separation: Use 'use client' only for interactive UI. Keep AI logic in Server Components or Actions.
2. Folder Structure: Group UI in /components, logic in /lib, and types in /types.
3. Type Safety: Strictly use TypeScript interfaces. No 'any'.

## Style Guide
- Naming: PascalCase for components, camelCase for functions.
- Modern Patterns: Use Functional Components and Tailwind utility classes.