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

## Backend & Logic Rules
1. Server Actions: Use Next.js Server Actions ('use server') for all data mutations and AI calls.
2. Validation: Always use 'Zod' for input validation before processing data.
3. Error Handling: Wrap logic in try-catch blocks and return structured error objects.
4. Security: Never expose API keys to the client.