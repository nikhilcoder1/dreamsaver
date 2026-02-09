# DreamSaver

## Project Description
A webapp that tracks your dreams and gives insights using AI. We'll use Gemini AI to give insights. The app should be stylized and somewhat dreamy.

There should be a landing page describing the product along with a text box for users to submit their first dream. This will sign the user up and submit their dream. The user will have a dashboard page that displays all of their recordings. If they click on a recording, they should be taken to another page that contains their recording and meta information as well as the AI insight/significance.

For the free tier they will be able to record as many dreams as they wish, but they'll only get 5 free AI insights. There will just be one subscription that allows them unlimited AI insights for $8/month.

## Product Requirements Document
PRODUCT REQUIREMENTS DOCUMENT (PRD) - DreamSaver v1.0

1. INTRODUCTION

1.1. Document Purpose
This Product Requirements Document (PRD) details the goals, features, technical specifications, and user experience requirements for DreamSaver v1.0. DreamSaver is a web application designed to help users track, record, and gain personalized insights from their dreams using Gemini AI.

1.2. Product Vision
To provide a stylish, secure, and intuitive platform for self-reflection by turning dream journaling into an insightful, visually calming experience powered by advanced AI analysis.

1.3. Target Audience
Young adults aged 16–35 interested in self-reflection, journaling, productivity, and mental wellness. Users are motivated by curiosity, self-analysis, emotional awareness, and creativity derived from their dream lives.

2. GOALS AND SUCCESS METRICS

2.1. Business Goals
	- Successfully launch the MVP with core functionality (recording and basic AI insights).
	- Achieve initial user adoption and secure beta testers.
	- Validate the monetization strategy by tracking conversion from free to Pro tier subscriptions.

2.2. Success Metrics (MVP)
	- User retention rate (D7, M1).
	- Average time taken for AI insight generation (must meet performance targets).
	- Number of dreams logged per active user.
	- Conversion rate to Pro subscription.

3. USER STORIES AND FEATURES

3.1. User Authentication and Onboarding (P0)
	- As a new user, I want to sign up using only email and password so that I can quickly access the application.
	- As a new user, upon successful sign-up, I want to be immediately prompted to record my first dream to begin using the core feature.
	- As a user, I want my email and password to be securely managed.

3.2. Dream Recording (P0)
	- As a user, I want a simple text box interface on the landing page (for first-time users) or within the dashboard to input my dream narrative.
	- As a user, I want the ability to add optional metadata tags (mood, nightmare, lucid, etc.) when recording a dream.
	- As a user, I want the system to automatically record the current date and time upon submission.

3.3. Dream Storage and Management (P0)
	- As a user, I want a centralized Dashboard view listing all my previously recorded dreams.
	- As a user, I want each dream listing on the dashboard to show the date, a short preview (first line), and any applied mood tag.
	- As a user, I want to be able to click on any dream entry to view its full details.

3.4. AI Insight Generation and Display (P0)
	- As a user, after submitting a dream (and if insights are available), I want to see a dedicated page for that dream.
	- This dedicated page must display the original dream text.
	- This page must display the AI-generated insight/significance.
	- The AI insight must include: Meaning/interpretation, Emotional sentiment, Key symbols detected, and a Short reflection/advice.

3.5. Monetization and Usage Tracking (P0)
	- As a free-tier user, I want to see a visible counter on my dashboard showing how many of my 5 free insights I have used.
	- As a user, I want a clear call-to-action (CTA) button to upgrade to the Pro tier.
	- As a Pro-tier user, I want the insight usage counter to reflect unlimited access.
	- The Pro tier must be priced at $8/month via Stripe.

4. TECHNICAL SPECIFICATIONS

4.1. Technology Stack (Mandatory)
	- Frontend/Framework: Next.js (App Router), React.
	- Styling: Tailwind CSS, shadcn/ui.
	- Backend/API: Next.js API Routes.
	- Database & Auth: Supabase or Firebase (Decision pending architecture finalization, but must support user auth and structured data).
	- Payments: Stripe.
	- AI Service: Gemini API.

4.2. Performance and Latency Requirements
	- AI Insight Response Time: Ideal: 3–6 seconds; Maximum acceptable: 8 seconds.
	- During generation, a clear, stylized loading animation must be displayed to the user.

4.3. Data Handling and Privacy
	- All dream data must be stored securely, associated only with the authenticated user.
	- Future requirement: Search and filter functionality across dream metadata.

5. AI INTEGRATION (GEMINI) REQUIREMENTS

5.1. Input Pre-processing
	- Text Trimming: Input text must be trimmed before sending to Gemini.
	- Character Limit: Input length must be limited to approximately 1500–2000 characters (user interface must warn user if input approaches this limit).
	- Profanity Filtering: Optional pre-processing step to remove profanity (MVP: may be skipped or disabled).
	- Metadata Injection: Date, time, and mood tags must be appended to the prompt sent to Gemini.

5.2. Gemini Prompt Design
	- Tone: Calm, supportive, and encouraging.
	- Restriction: Explicitly forbidden from giving medical or clinical advice.
	- Output Length: Analysis must be concise, totaling a maximum of 150–200 words.
	- Output Structure: The response must be structured (e.g., JSON or clearly delimited sections) containing:
		1. Summary/Interpretation
		2. Key Symbols Detected
		3. Reflection/Advice

6. DESIGN AND USER EXPERIENCE (UX/UI)

6.1. Aesthetic Guidelines
	- Mood: Dreamy, calm, introspective, ethereal.
	- Primary Theme: Dark Mode.
	- Color Palette: Focus on purple, indigo, and deep blue gradients.
	- Style Elements: Soft glow effects, rounded corners, subtle use of blur/glassmorphism, smooth transitions and animations.
	- Typography: Combination of a modern sans-serif for body text and a subtle serif font for headers or key insights.

6.2. Key Page Requirements
	- Landing Page: Must clearly describe the product, feature the stylized aesthetic, and contain the primary call-to-action: the initial dream submission text box.
- Dashboard: Must display the list of dreams, the Insight usage counter, and the Upgrade CTA.
- Dream Detail Page: Must integrate the original text seamlessly with the structured AI insight output.

7. MONETIZATION AND SUBSCRIPTION TIERS

7.1. Free Tier (Default)
	- Dream Logging: Unlimited.
	- AI Insights: Exactly 5 total insights available for the lifetime of the account. Once 5 are used, no further insights will be generated until an upgrade.

7.2. Pro Tier ($8/Month)
	- Price: $8 USD per month.
	- AI Insights: Unlimited.
	- Implementation: Stripe must manage recurring billing, and the application must accurately reflect the user's subscription status server-side to enable/disable insight generation calls.

8. FUTURE CONSIDERATIONS (POST-MVP)

	- Voice-to-text recording input method.
	- Daily reminder notifications for journaling.
	- Advanced search and filtering capabilities (by date, tag, or keyword).
	- Social login options (e.g., Google Auth).

## Technology Stack
# DreamSaver Technology Stack

## 1. Overview and Architectural Philosophy

DreamSaver employs a modern, full-stack Next.js architecture leveraging the App Router for efficient routing, server components, and API routes. The goal is to deliver a fast, responsive user experience while ensuring data security, ease of scaling, and seamless integration with the Gemini AI service. The stack prioritizes developer experience (DX) using established, opinionated libraries.

## 2. Frontend (Client & Presentation Layer)

| Technology | Purpose | Justification |
| :--- | :--- | :--- |
| **React** (v18+) | Core UI Library | Standard for modern web applications, excellent component model. |
| **Next.js (App Router)** | Framework & Routing | Provides Server Components for fast initial loads, built-in optimizations (image, font), and simplified data fetching/caching strategies essential for a dynamic dashboard. |
| **TypeScript** | Static Typing | Improves code quality, maintainability, and reduces runtime errors, especially critical when dealing with structured data (dreams, AI responses). |
| **Tailwind CSS** | Utility-First Styling | Enables rapid development of the "dreamy," stylized dark mode UI based on the provided guidelines (gradients, soft glows). |
| **shadcn/ui** | Reusable Components | Provides accessible, highly customizable components that align perfectly with the required aesthetic (rounded cards, dark mode compatibility). Accelerates implementation of dashboard elements. |

## 3. Backend and Data Management

| Technology | Purpose | Justification |
| :--- | :--- | :--- |
| **Next.js API Routes** | Serverless Functions | Used for secure handling of sensitive operations like Stripe webhooks, AI prompting, and database interactions, keeping logic off the client. |
| **Supabase** | Database (PostgreSQL) & Authentication | Chosen over Firebase for its open-source nature and excellent PostgreSQL support, which is robust for structured data like dream entries and user metrics. Provides Authentication (MVP: email/password) and Realtime capabilities (future features). |
| **PostgreSQL (via Supabase)** | Primary Data Store | Reliable, transactional database suited for user data, dream logs, and crucial subscription status tracking. |

## 4. Core Features and Integrations

| Technology | Purpose | Justification |
| :--- | :--- | :--- |
| **Gemini API (Google AI)** | AI Insight Generation | Direct integration for processing user dream text. Selected for high performance and suitability for creative/interpretive tasks as required by the prompt style (calm, supportive tone). |
| **Stripe** | Payments and Subscriptions | Industry standard for managing recurring billing ($8/month Pro tier). Handles checkout, invoice management, and necessary subscription status webhooks for insight usage control. |
| **Resend/External Email Service** | Notifications (Future) | To be integrated later for daily reminder notifications, ensuring reliable email delivery. |

## 5. AI Processing Pipeline and Performance Goals

The core challenge is managing the latency between dream submission and insight delivery (Goal: 3–6 seconds).

### 5.1. Dream Pre-processing (Next.js Server Action/Route Handler)

Before calling Gemini, the following steps are executed on the secure backend to ensure prompt quality and cost control:
1.  **Input Sanitization:** Trimming excessive whitespace.
2.  **Content Filtering (Optional):** Basic profanity filtering (if necessary for safety).
3.  **Length Control:** Truncating input text to the optimal range (~1500–2000 chars) to manage token usage and latency.
4.  **Metadata Enrichment:** Attaching the submission date and any provided mood tags to the final prompt payload.

### 5.2. Gemini Prompt Strategy

The prompt template will enforce the strict output requirements:
*   **Tone Setting:** Explicit instruction for a "Calm, supportive, non-clinical" persona.
*   **Output Structure:** Mandating a JSON-like structure or clear section breaks for **Meaning/Interpretation, Key Symbols, and Reflection/Advice** (max 150–200 words total).

### 5.3. Latency Management

*   **Streaming (Future Consideration):** While the MVP focuses on a single response within the acceptable max of 8 seconds, future iterations may implement partial streaming if interpretation time exceeds limits.
*   **UI Feedback:** A prominent, stylized loading animation (using Tailwind/shadcn components) must display immediately upon submission to manage user perception of latency while the request is processed.

## 6. Data Schema Dependencies (Supabase Focus)

| Entity | Key Fields | Usage Context |
| :--- | :--- | :--- |
| **Users** | `id`, `email`, `auth_provider_id` | Standard authentication tracking. |
| **UserProfiles** | `user_id`, `subscription_status`, `ai_insights_remaining` | Critical for monetization logic. `ai_insights_remaining` defaults to 5 (Free Tier). |
| **DreamLogs** | `id`, `user_id`, `content_text`, `date`, `mood_tags`, `insight_generated` (boolean) | Stores the raw journal entry. |
| **Insights** | `dream_id`, `full_gemini_response`, `sentiment_score` | Stores the generated interpretation (only populated if insight is used/paid for). |

## Project Structure
# PROJECT STRUCTURE DOCUMENT: DreamSaver

## 1. Overview

This document details the file and folder structure for the DreamSaver web application, built using Next.js (App Router), React, Tailwind CSS, and integrating Gemini AI, database services (Supabase/Firebase), and Stripe for monetization. The structure is organized to facilitate scalable development, separation of concerns, and adherence to modern full-stack Next.js conventions.

## 2. Root Directory Structure

```
/DreamSaver
├── .next/                     # Next.js build output (ignored by Git)
├── node_modules/              # Project dependencies
├── public/                    # Static assets (images, fonts, favicon)
├── src/                       # Primary application source code
├── .env.local                 # Environment variables (API keys, DB connection strings)
├── .eslintrc.json             # ESLint configuration
├── .gitignore                 # Git ignore file
├── next.config.js             # Next.js configuration
├── package.json               # Project metadata and scripts
├── postcss.config.js          # PostCSS configuration (for Tailwind)
├── README.md                  # Project description and setup instructions
└── tailwind.config.js         # Tailwind CSS configuration
```

## 3. Source Directory (`src/`) Structure

The `src` directory contains all application logic, components, and configuration specific to the application features.

```
/src
├── app/                       # Next.js App Router directory structure
│   ├── (auth)/                # Group route for authentication pages (login, signup)
│   │   ├── layout.tsx
│   │   └── page.tsx           # Sign Up/Onboarding page (captures first dream)
│   │
│   ├── (dashboard)/           # Group route for authenticated user features
│   │   ├── layout.tsx         # Dashboard layout (includes header, sidebar if needed)
│   │   ├── page.tsx           # Main Dashboard view (Dream List, Stats, Upgrade CTA)
│   │   └── dream/[id]/        # Dynamic route for individual dream details
│   │       └── page.tsx       # Dream Detail View (Recording + AI Insight)
│   │
│   ├── api/                   # API routes for server-side logic (DB, Gemini, Stripe)
│   │   ├── dreams/
│   │   │   └── route.ts       # CRUD operations for dreams
│   │   ├── insights/
│   │   │   └── route.ts       # Endpoint to trigger Gemini analysis
│   │   └── stripe/
│   │       └── route.ts       # Webhook and checkout session handling
│   │
│   ├── layout.tsx             # Root layout (HTML/Body wrapper, providers)
│   └── page.tsx               # Landing Page (Product description, First Dream CTA)
│
├── components/                # Reusable UI elements (shadcn/ui overrides/custom)
│   ├── ui/                    # Re-exports of base shadcn/ui components
│   │   └── button.tsx
│   │   └── card.tsx
│   │   └── ...
│   ├── layout/                # Structural components (Header, Footer, Nav)
│   │   └── DreamHeader.tsx
│   ├── landing/               # Components specific to the landing page
│   │   └── HeroSection.tsx
│   │   └── DreamInputForm.tsx
│   ├── dashboard/             # Components specific to the Dashboard
│   │   └── DreamList.tsx
│   │   └── UsageCounter.tsx
│   │   └── UpgradeCard.tsx
│   └── dream/                 # Components specific to the Dream Detail page
│       └── InsightDisplay.tsx
│       └── DreamMetadata.tsx
│
├── lib/                       # Utility functions, external service clients, configuration
│   ├── ai/                    # Gemini integration logic
│   │   ├── geminiClient.ts    # Gemini API service client initialization
│   │   └── promptGenerator.ts # Logic for structuring prompts (metadata + text limit)
│   │
│   ├── auth.ts                # Authentication helper functions (NextAuth setup if used, or Supabase wrappers)
│   ├── db.ts                  # Database client initialization (Supabase/Firebase)
│   ├── stripe.ts              # Stripe client initialization and billing logic wrappers
│   ├── utils.ts               # Generic helper functions (e.g., date formatting)
│   └── types.ts               # TypeScript definitions (Dream, UserProfile, Insight)
│
└── styles/                    # Global CSS files
    ├── globals.css            # Tailwind directives and custom styles (gradients, blur effects)
    └── theme.css              # Optional: specific color palette definitions
```

## 4. Detailed Component & Utility Focus

### `src/app/` Routing Strategy

*   **`(auth)` Group:** Isolates routing and layout for unauthenticated users. The root page handles onboarding (email/pass sign-up + first dream submission).
*   **`(dashboard)` Group:** Encapsulates all authenticated routes, ensuring necessary context providers (Auth State, Subscription Status) are present via `layout.tsx`.
*   **`/dream/[id]`:** Uses dynamic routing to fetch and display specific dream records and their associated insights.

### `src/components/` Structure

Components are organized by their primary usage context (Landing, Dashboard, Dream View) to maintain clear separation, minimizing naming collisions and improving maintainability for the dreamy UI components.

### `src/lib/` Core Logic Separation

| Directory/File | Responsibility | Key Data/Services Handled |
| :--- | :--- | :--- |
| `lib/ai/` | Manages all interaction with the Gemini API. | Prompt generation adhering to style/length constraints, parsing structured JSON output from Gemini. |
| `lib/db.ts` | Abstraction layer for database operations. | Functions for saving dreams, fetching user history, updating usage counters (Supabase/Firebase wrappers). |
| `lib/stripe.ts` | Handles subscription and payment logic. | Creating checkout sessions, verifying subscription status server-side. |
| `lib/types.ts` | Centralized source for TypeScript interfaces. | Defines `DreamRecord`, `UserProfile`, and the expected structure for the AI Insight response. |

### `src/styles/globals.css` Content Focus

This file will contain the primary styling hooks for the required aesthetic:

1.  Importing Tailwind base styles.
2.  Defining custom dark mode variables (if not fully managed by Tailwind configuration).
3.  Injecting custom styles for the dreamy look: soft shadows, background gradients (indigo/purple), and possibly defining a subtle base blur effect for backgrounds or cards (glassmorphism hints).

## 5. MVP Feature Mapping to Structure

| Feature | Location(s) in Structure | Notes |
| :--- | :--- | :--- |
| Landing Page | `src/app/page.tsx`, `src/components/landing/` | Contains the primary call to action and first dream input. |
| User Auth (Email/Pass) | `src/app/(auth)/page.tsx`, `src/lib/auth.ts` | Initial sign-up flow, capturing email/password and the first dream text. |
| Dream Submission (Text + Tags) | `src/components/landing/DreamInputForm.tsx`, `src/app/api/dreams/route.ts` | Input handled client-side, submission processed via API route. |
| Dream Dashboard | `src/app/(dashboard)/page.tsx`, `src/components/dashboard/` | Displays list, usage counter, and upgrade CTA. |
| Dream Detail View | `src/app/(dashboard)/dream/[id]/page.tsx` | Fetches dream record and insight. |
| AI Insight Generation | `src/app/api/insights/route.ts`, `src/lib/ai/` | Server-side endpoint triggers Gemini processing, handles prompt construction and response formatting. |
| Monetization (Free/Pro) | `src/lib/stripe.ts`, `src/components/dashboard/UsageCounter.tsx` | Logic to check user's subscription status and limit insights accordingly. |

## Database Schema Design
# schemaDesign: DreamSaver Database Structure

This document outlines the proposed database schema for the DreamSaver application, designed to support user authentication, dream logging, AI insight generation tracking, and subscription management. We will utilize **Supabase** for its integrated Auth, PostgreSQL database, and real-time capabilities.

## 1. Core Tables

### 1.1. `users` (Supabase Auth Extension Table)

This table maps to Supabase's built-in `auth.users` table and stores primary user information.

| Column Name | Data Type | Description | Constraints/Notes |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Unique user identifier (Foreign Key to `auth.users.id`) | Primary Key |
| `email` | `text` | User's email address | Not Null, Unique |
| `created_at` | `timestamptz` | Timestamp of user creation | Default `now()` |
| `subscription_status` | `text` | Current subscription level | Default 'free'. Values: 'free', 'pro' |
| `insight_count` | `integer` | Current remaining free AI insights | Default 5. Only decremented for 'free' users. |

### 1.2. `dreams`

Stores the raw journal entries submitted by the user.

| Column Name | Data Type | Description | Constraints/Notes |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Unique Dream ID | Primary Key, Default `uuid_generate_v4()` |
| `user_id` | `uuid` | Foreign Key linking to the `users.id` | Not Null, Indexed |
| `input_text` | `text` | The full, raw text content of the dream entry | Not Null |
| `input_date` | `date` | The date the dream occurred (or was logged) | Not Null |
| `created_at` | `timestamptz` | Timestamp when the record was created in the DB | Default `now()` |
| `title_preview` | `varchar(100)` | First line or auto-generated title (for dashboard list) | Generated from `input_text` |
| `mood_tags` | `text[]` | Array of mood tags (e.g., {'nightmare', 'calm'}) | Nullable |
| `is_processed` | `boolean` | Flag indicating if AI insight generation was attempted | Default `false` |

### 1.3. `ai_insights`

Stores the processed output from the Gemini API for each dream.

| Column Name | Data Type | Description | Constraints/Notes |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | Unique Insight ID | Primary Key, Default `uuid_generate_v4()` |
| `dream_id` | `uuid` | Foreign Key linking to the specific `dreams.id` | Not Null, Unique (One insight per dream) |
| `gemini_prompt_used` | `text` | The exact prompt sent to the Gemini API (for debugging/auditing) | Nullable |
| `interpretation` | `text` | The core meaning/interpretation provided by Gemini | Not Null |
| `sentiment` | `varchar(50)` | Detected emotional sentiment | Derived from AI output |
| `key_symbols` | `text[]` | Array of key symbols detected | Stored as text array |
| `reflection_advice` | `text` | Short reflection or actionable advice | Not Null |
| `raw_api_response` | `jsonb` | Full JSON payload received from Gemini API | Nullable (For debugging) |
| `generated_at` | `timestamptz` | Timestamp of insight generation | Default `now()` |

## 2. Relationships and Foreign Keys

1.  **User to Dreams:** One-to-Many (One user can have many dreams).
    *   `dreams.user_id` references `users.id`.
2.  **Dream to AI Insight:** One-to-One (Each dream can have at most one AI insight).
    *   `ai_insights.dream_id` references `dreams.id`.

## 3. Data Flow and Logic Implementation Notes

### A. User Onboarding (MVP)

1.  User signs up via Email/Password (handled by Supabase Auth).
2.  A new row is created in the `users` table, initializing `subscription_status` to 'free' and `insight_count` to 5.
3.  The initial dream submission happens via a form that simultaneously creates a record in `dreams` linked to the new `user_id`.

### B. Dream Logging

1.  A new record is inserted into the `dreams` table.
2.  The `title_preview` is derived by taking the first 100 characters of `input_text`.
3.  Mood tags are stored as a PostgreSQL array (`text[]`).

### C. AI Insight Generation and Usage Tracking

This flow requires server-side logic (Next.js API Routes):

1.  **Pre-check:** When a user requests an insight for a dream:
    *   Check `users.subscription_status`.
    *   If 'free': Check if `users.insight_count > 0`. If not, prompt upgrade.
2.  **Generation:** If checks pass, the Gemini API is called with pre-processed data.
3.  **Storage:** The structured response is saved into a new record in `ai_insights`, linked to the `dream_id`.
4.  **Usage Update:**
    *   If the user is 'free', decrement `users.insight_count` by 1 in a transactional update.
    *   Set `dreams.is_processed = true`.

### D. Monetization and Subscriptions

1.  **Stripe Integration:** Stripe will manage the `$8/month` 'Pro' subscription. Stripe Webhooks will notify Supabase (via Edge Functions or server actions) upon subscription success/failure.
2.  **Status Update:** Upon successful payment confirmation (Webhook), the `users.subscription_status` is updated to 'pro'.
3.  **Insight Check:** When checking usage, the logic prioritizes `subscription_status`. If 'pro', the `insight_count` check is bypassed entirely.

## 4. Indexing Strategy

To ensure fast loading for the dashboard and individual dream views:

*   Index `dreams.user_id` (Crucial for fetching a user's history).
*   Index `dreams.created_at` (Useful for sorting dashboards chronologically).
*   Index `ai_insights.dream_id` (Ensures fast lookup when viewing a specific dream detail page).

## User Flow
USERFLOW DOCUMENTATION: DreamSaver (MVP)

1. OVERVIEW

This document outlines the core user journeys and interaction patterns for the DreamSaver MVP, focusing on seamless onboarding, dream logging, insight generation, and subscription management. The design emphasizes a dreamy, calming aesthetic using dark mode primary colors (indigo/purple gradients).

2. USER JOURNEYS

2.1. User Onboarding & First Dream Submission (The \"Dream Seeding\" Flow)

Actors: New User (Unauthenticated)

Goal: Sign up and immediately log the first dream to experience the core value proposition.

| Step | Screen/State | Action/Interaction | System Response/Notes |
| :--- | :--- | :--- | :--- |
| 1 | Landing Page (LPG) | User arrives at the homepage. Sees value proposition and dreamy design. | Display headline, product description, and the central sign-up/dream input form. |
| 2 | LPG - Input Form | User enters Email, Password, and the text of their first dream into the dedicated input area. | Input fields validated for basic format (email syntax, password strength). |
| 3 | LPG - Optional Tags | User optionally selects mood tags (e.g., Lucid, Nightmare, Neutral). | Tags are attached to the initial dream record. |
| 4 | LPG - Submit | User clicks the primary CTA (e.g., \"Log My First Dream & Join\"). | System initiates registration (Auth + DB). Success initiates the free insight counter setup. |
| 5 | Loading/Transition | Brief loading screen with a subtle, dreamy animation. | System processes the initial dream creation and sets the user session. |
| 6 | Dashboard (DB) | User lands directly on the main Dashboard. | First dream (unprocessed, no insight yet) appears in the list. Insight counter shows 0/5 used. |

2.2. Logging Subsequent Dreams (Authenticated User)

Actors: Returning User (Authenticated)

Goal: Log a new dream entry.

| Step | Screen/State | Action/Interaction | System Response/Notes |
| :--- | :--- | :--- | :--- |
| 1 | Dashboard | User clicks the \"Add Dream\" CTA (prominently displayed). | Transition to the Dream Input Modal/Page. |
| 2 | Dream Input View | User enters Dream Text (up to ~2000 chars). | System automatically captures Date/Time. User selects optional tags. |
| 3 | Dream Input View | User clicks \"Save Dream.\" | Dream is saved to the database associated with the user. |
| 4 | Dashboard | User returns to the Dashboard. | New dream appears at the top of the list with a status indicator: \"Awaiting Insight\" or \"Insight Generated\" (if insight was requested simultaneously). |

2.3. Generating an AI Insight

Actors: Authenticated User with remaining free insights OR Pro Subscriber.

Goal: Receive AI interpretation for a saved dream.

| Step | Screen/State | Action/Interaction | System Response/Notes |
| :--- | :--- | :--- | :--- |
| 1 | Dashboard OR Dream Detail View | User clicks the \"Generate Insight\" button next to an unprocessed dream. | System checks Insight Usage. |
| 2 | Usage Check | IF Free Tier AND Usage < 5: Proceed. IF Free Tier AND Usage = 5: Display \"Upgrade Prompt.\" IF Pro: Proceed. | If usage check fails, prompt subscription. |
| 3 | Processing State | System increments the usage counter (if applicable) and sends the pre-processed dream text + metadata to Gemini API. | Display loading state (dreamy animation) with latency management (Target: 3-6s). |
| 4 | Insight Generation (Gemini) | Gemini returns the structured response (Summary, Symbols, Reflection). | Server-side processing cleans up text and stores the final insight linked to the dream ID. |
| 5 | Dream Detail View Update | System navigates the user to the Dream Detail View, displaying the new insight panel. | Insight rendered using calming typography and soft dividers. |

2.4. Viewing Dream Details and Insight

Actors: Authenticated User

Goal: Review the complete dream text, metadata, and AI analysis.

| Step | Screen/State | Action/Interaction | System Response/Notes |
| :--- | :--- | :--- | :--- |
| 1 | Dashboard | User clicks on a dream listing (Title/First Line Preview). | Navigation to the specific Dream Detail Page. |
| 2 | Dream Detail View | User views: Full Dream Text, Date, Tags. | Layout optimized for readability (dark mode). |
| 3 | Dream Detail View - Insight Section | User views the AI Insight Panel. | Panel displays structured output: Meaning/Interpretation, Key Symbols Detected, Short Reflection/Advice. Tone must be supportive and non-clinical (Max 150-200 words total). |
| 4 | Dream Detail View - Actions | User sees \"Re-generate Insight\" (if subscription allows) or \"Upgrade for Unlimited Insights.\" | This CTA is dynamic based on user status. |

2.5. Subscription Management (Monetization)

Actors: Authenticated User (Free Tier)

Goal: Upgrade to Pro for unlimited insights.

| Step | Screen/State | Action/Interaction | System Response/Notes |
| :--- | :--- | :--- | :--- |
| 1 | Dashboard OR Insight Generation Attempt | User sees the prompt/banner related to hitting the 5-insight limit. | CTA: \"Go Pro - Unlimited Insights $8/month\". |
| 2 | Upgrade Page | User clicks the upgrade CTA, leading to the secure checkout flow. | Page clearly reiterates Pro benefits (Unlimited insights). |
| 3 | Stripe Checkout | User enters payment details via embedded Stripe elements. | System initiates the Stripe Subscription setup for $8/month recurring. |
| 4 | Payment Confirmation | Stripe redirects the user back to the App (Success/Failure). | Upon success, the user profile DB flag changes to `subscription_status: 'pro'`. Insight counter resets or is ignored. |
| 5 | Dashboard | User returns to the Dashboard. | Insight usage counter is replaced with a \"Pro Member\" badge, or insight generation flow proceeds without checking limits. |

3. WIREFRAME DESCRIPTIONS (Conceptual - MVP Focus)

3.1. Landing Page (LPG)

*   **Header:** Minimal navigation (Login/Sign Up).
*   **Hero Section:** Large, soft, evocative headline. Subtext detailing dream tracking and Gemini insights. Primary visual element: subtle indigo/purple gradient, perhaps stylized celestial imagery.
*   **Core Input Block (Central Focus):** A rounded, slightly blurred card housing: Email, Password, Large Text Area for Dream Input, Optional Tag Selector, and the \"Log My First Dream\" CTA. This block must feel inviting and secure.

3.2. Dashboard (DB)

*   **Header:** App Logo/Name, Profile Icon.
*   **Stats Bar (Top):** Shows key metrics: Total Dreams Logged, Insights Used (e.g., \"3/5 Insights Remaining\"). Prominent \"Upgrade to Pro\" button if on the free tier.
*   **Main Content Area:** A chronological list/feed of dreams. Each item is a soft, rounded card displaying: Date, First Line Preview (Title), Mood Tag(s), and Insight Status (Icon/Text).
*   **Primary CTA:** Large, persistent \"+ Add Dream\" button, likely floating or fixed in the corner.

3.3. Dream Detail View

*   **Layout:** Split vertically or tabbed interface.
*   **Left/Top Panel (The Dream):** Full, readable text of the recorded dream. Display of captured metadata (Date, Tags).
*   **Right/Bottom Panel (The Insight):** Clearly separated section for the AI analysis. If no insight exists, this area displays the \"Generate Insight\" CTA, respecting the usage limits. If insight exists, it displays the structured Gemini output with supportive styling.

4. INTERACTION PATTERNS & PERFORMANCE

*   **Text Trimming & Pre-processing:** All text submitted for insight generation is trimmed server-side to 1500-2000 characters *before* being passed to the Gemini API to manage token usage and latency.
*   **Loading States:** Critical attention paid to the 3-8 second latency window for AI responses. A non-blocking, visually soothing loading indicator (e.g., pulsing glow effect) must be displayed over the Insight area during processing.
*   **Auth Experience:** Seamless transition from sign-up to the dashboard must minimize friction, encouraging immediate engagement with the core feature (dream logging).
*   **Error Handling (Gemini):** If the API call fails or times out (exceeding 8s), a user-friendly message should appear stating, \"The dream analysis is currently unavailable. Please try again later,\" and retain the \"Generate Insight\" CTA.

## Styling Guidelines
DREAM SAVER - STYLING GUIDELINES DOCUMENT (V1.0)

1.0 INTRODUCTION

This document outlines the styling guidelines, design system components, color palette, typography, and UI/UX principles for DreamSaver. Our goal is to create an application interface that embodies a "dreamy, calm, and introspective" aesthetic, supporting our target audience (young adults interested in self-reflection and mental wellness) while leveraging a modern, dark-mode-first approach using Tailwind CSS and shadcn/ui components.

2.0 BRAND AESTHETICS AND MOOD

The overall mood must be: Ethereal, Soft, Night-Sky, Minimal, Calming, and Introspective.

The design should subtly suggest the subconscious or night sky without becoming overly cluttered or distracting from the core function of journaling and insight retrieval.

3.0 COLOR PALETTE

DreamSaver will utilize a dark mode primary theme. Colors should be derived from deep blues, indigos, and purples, accented by soft whites and gentle glows.

3.1 Primary Colors (Dark Mode Foundation)

| Name | Hex Code | Usage | Notes |
| :--- | :--- | :--- | :--- |
| Background Deep Night | #0A051A | Primary application background | Very dark, nearly black, with a hint of indigo. |
| Surface Mid-Indigo | #1B1431 | Card backgrounds, panels, modal surfaces | Provides subtle contrast against the background. |
| Primary Accent Violet | #8A2BE2 | Primary CTA buttons, active states, highlight features | The signature "dreamy" purple. |
| Secondary Accent Sky Blue | #483D8B | Subtle gradients, secondary navigation elements | A deep, muted blue for balance. |

3.2 Accent and Utility Colors

| Name | Hex Code | Usage | Notes |
| :--- | :--- | :--- | :--- |
| Text Primary White | #F0F0FF | Main body text, important headings | High contrast for readability on dark backgrounds. |
| Text Secondary Light Gray | #B0B0C0 | Meta text, secondary labels, dividers | Soft contrast. |
| Success / Insight Available | #3CB371 | Insight unlocked indicators | Gentle green glow. |
| Warning / Insight Limit | #FFD700 | Insight usage counter warnings (approaching limit) | Soft gold/yellow. |

3.3 Gradients

Use subtle, radial or linear gradients built primarily from Primary Accent Violet and Secondary Accent Sky Blue to create the "soft glow" effect on key elements (e.g., the landing page CTA, or selected dashboard items). Avoid high-contrast, sharp gradients.

4.0 TYPOGRAPHY

We require a combination of a classic, readable serif font for narrative elements (the dreams themselves) and a clean, modern sans-serif font for navigation and UI elements, following the "Serif + Modern Font Combo" directive.

4.1 Font Stack (Tailwind Configuration)

*   **Headings & UI (Sans-Serif):** Use a clean, modern typeface like Inter or Roboto (if custom fonts are restricted, use Tailwind's default `sans` stack, ensuring a modern feel).
*   **Body Text & Dream Entries (Serif):** Use a subtle, slightly ethereal serif font like Lora or Playfair Display.

4.2 Sizing (Relative to Default Browser Settings)

| Element | Size (Tailwind Class Equivalent) | Weight | Usage Context |
| :--- | :--- | :--- | :--- |
| H1 (Page Title) | text-4xl / 5xl | Semi-bold | Landing Page, Main Dashboard Title |
| H2 (Section Header) | text-2xl / 3xl | Medium | Dashboard sections, Detail Page titles |
| Body Text (Dreams) | text-base / lg | Normal | Dream input area, detailed insights |
| UI Labels / Meta | text-sm / xs | Regular | Dates, tags, insight counters |

5.0 UI/UX PRINCIPLES

5.1 Layout and Components

*   **Rounded Corners:** All major components (cards, input fields, buttons) must use generous border-radius (e.g., `rounded-xl` or higher) to enhance the soft, welcoming feel.
*   **Cards:** Use the Surface Mid-Indigo color for cards. Apply a very subtle shadow or 1px border using a slightly darker shade of the background color to give definition without harsh lines.
*   **Glassmorphism/Blur:** Where appropriate (e.g., modal overlays, or potentially the Insight Detail panel), apply a subtle backdrop filter blur (`backdrop-blur-sm`) to achieve a light glassmorphism effect against the dark background. This suggests distance and atmosphere.

5.2 Interactions and Motion

*   **Smooth Transitions:** All state changes (hover, active, focus) must use CSS transitions to be smooth, avoiding abrupt jumps. Tailwind's `transition-all duration-300` is recommended as a base.
*   **Hover Effects:** Hover states should involve a subtle lift (slight shadow change) or a soft glow radiating from the Primary Accent Violet color, rather than aggressive color shifts.
*   **Loading States:** While generating AI insights (3-8 second window), a custom, non-intrusive loading animation must be visible. This could be a pulsing glow or a slow-moving wave of color (Violet/Blue) rather than a standard spinner.

5.3 Imagery and Icons

*   **Imagery:** Minimize heavy photographic imagery. If used on the landing page, imagery should be abstract, ethereal, or night-sky themed, maintaining a low saturation or desaturated look.
*   **Icons:** Use line icons (e.g., from Lucide/Feather, integrated via shadcn/ui) that are clean and minimal. Icons should default to Text Secondary Light Gray and highlight to Primary Accent Violet on interaction.

6.0 PAGE SPECIFIC STYLING NOTES

6.1 Landing Page

*   The hero section must heavily feature the Purple/Indigo gradient as a background texture or subtle overlay.
*   The main input box for the first dream should be prominent, clear, and visually inviting (highly rounded, centered).
*   The "Submit First Dream" CTA must utilize the Primary Accent Violet prominently.

6.2 Dashboard

*   Dream listings should be presented as clean, vertical cards (Surface Mid-Indigo).
*   Each card must clearly display Date, Title Preview, and Mood Tag.
*   Insight status needs high visibility: A small, glowing icon (Green for available, Yellow for limit approaching) next to the dream entry.
*   The Insight Usage Counter and Upgrade CTA must be immediately visible but styled subtly, perhaps using softer, less aggressive visual cues than primary action buttons.

6.3 Dream Detail / Insight Page

*   This page requires the clearest separation between the user's recorded text and the AI-generated insight.
*   User Input Text: Rendered using the Serif Body Font on the standard Surface Mid-Indigo background.
*   AI Insight Box: Consider using a slightly different background tone (perhaps a subtle light blue tint overlay) or a prominent border/shadow using the Primary Accent Violet to visually frame the AI's output, emphasizing its special nature.
*   The structured output (Summary, Symbols, Advice) must be clearly delineated using bolded headings and sufficient vertical spacing.
