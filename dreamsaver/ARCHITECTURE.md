# DreamSaver - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                             │
├─────────────────────────────────────────────────────────────────┤
│  Landing Page  │  Dashboard  │  Dream Pages  │  Auth Pages      │
└────────┬────────────────────┬─────────────────────┬─────────────┘
         │                    │                     │
         │     Next.js 15 Frontend (React 19)      │
         │     - TypeScript                         │
         │     - Tailwind CSS                       │
         │     - shadcn/ui                          │
         │                                           │
         └───────────────────┬──────────────────────┘
                             │
         ┌───────────────────┴──────────────────────┐
         │                                           │
    ┌────▼─────┐                               ┌────▼─────┐
    │   API    │                               │  Client  │
    │  Routes  │                               │  Actions │
    └────┬─────┘                               └────┬─────┘
         │                                           │
         │                                           │
    ┌────▼──────────────────────────────────────────▼─────┐
    │            Next.js API Layer                         │
    ├──────────────────────────────────────────────────────┤
    │  /api/auth/*     - Authentication                    │
    │  /api/dreams/*   - Dream CRUD                        │
    │  /api/insights/* - AI generation                     │
    │  /api/stripe/*   - Payment processing                │
    └──┬───────────────────┬──────────────────┬───────────┘
       │                   │                  │
       │                   │                  │
┌──────▼──────┐    ┌───────▼────────┐  ┌─────▼──────┐
│  Supabase   │    │   Gemini AI    │  │   Stripe   │
│  (Database  │    │   (Google)     │  │  (Payment) │
│   & Auth)   │    │                │  │            │
└─────────────┘    └────────────────┘  └────────────┘
```

## Data Flow

### 1. User Signup & First Dream
```
User Input (Landing)
    ↓
POST /api/auth/signup
    ↓
Supabase Auth.signUp()
    ↓
Create Profile in DB
    ↓
Insert First Dream
    ↓
Return Success + Session
    ↓
Redirect to Dashboard
```

### 2. Dream Creation
```
User Input (New Dream Form)
    ↓
POST /api/dreams
    ↓
Validate User Session
    ↓
Trim Content (2000 chars)
    ↓
Insert into Dreams Table
    ↓
Return Dream Object
    ↓
Redirect to Dream Detail
```

### 3. AI Insight Generation
```
User Clicks "Generate Insight"
    ↓
POST /api/insights/generate
    ↓
Check User's Insight Limit
    ↓
Fetch Dream from DB
    ↓
Build Gemini Prompt
    ↓
Call Gemini API (3-8 seconds)
    ↓
Parse JSON Response
    ↓
Save Insight to DB
    ↓
Update Dream (has_insight = true)
    ↓
Increment insights_used (if not Pro)
    ↓
Return Insight Object
    ↓
Display to User
```

### 4. Subscription Flow
```
User Clicks "Upgrade to Pro"
    ↓
POST /api/stripe/create-checkout
    ↓
Get/Create Stripe Customer
    ↓
Create Checkout Session
    ↓
Redirect to Stripe Checkout
    ↓
User Completes Payment
    ↓
Stripe Sends Webhook
    ↓
POST /api/stripe/webhook
    ↓
Verify Webhook Signature
    ↓
Update Profile (is_pro = true)
    ↓
Redirect to Dashboard
```

## Database Schema

```
┌─────────────────────────────────────────┐
│              profiles                    │
├─────────────────────────────────────────┤
│ id (UUID, PK)                           │
│ email (TEXT)                            │
│ insights_used (INTEGER)                 │
│ is_pro (BOOLEAN)                        │
│ stripe_customer_id (TEXT)               │
│ stripe_subscription_id (TEXT)           │
│ created_at (TIMESTAMP)                  │
│ updated_at (TIMESTAMP)                  │
└──────────────┬──────────────────────────┘
               │
               │ One-to-Many
               │
┌──────────────▼──────────────────────────┐
│              dreams                      │
├─────────────────────────────────────────┤
│ id (UUID, PK)                           │
│ user_id (UUID, FK)                      │
│ title (TEXT)                            │
│ content (TEXT)                          │
│ mood_tag (TEXT)                         │
│ has_insight (BOOLEAN)                   │
│ created_at (TIMESTAMP)                  │
│ updated_at (TIMESTAMP)                  │
└──────────────┬──────────────────────────┘
               │
               │ One-to-One
               │
┌──────────────▼──────────────────────────┐
│            insights                      │
├─────────────────────────────────────────┤
│ id (UUID, PK)                           │
│ dream_id (UUID, FK, UNIQUE)             │
│ summary (TEXT)                          │
│ key_symbols (TEXT[])                    │
│ reflection (TEXT)                       │
│ created_at (TIMESTAMP)                  │
└─────────────────────────────────────────┘
```

## Security Model

### Row Level Security (RLS)

```sql
-- Users can only access their own data

profiles:
  SELECT: auth.uid() = id
  UPDATE: auth.uid() = id

dreams:
  SELECT: auth.uid() = user_id
  INSERT: auth.uid() = user_id
  UPDATE: auth.uid() = user_id
  DELETE: auth.uid() = user_id

insights:
  SELECT: EXISTS(dream owned by user)
  INSERT: EXISTS(dream owned by user)
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account + first dream
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out

### Dreams
- `GET /api/dreams` - List user's dreams
- `POST /api/dreams` - Create new dream
- `GET /api/dreams/[id]` - Get dream + insight

### Insights
- `POST /api/insights/generate` - Generate AI insight

### Payments
- `POST /api/stripe/create-checkout` - Start subscription
- `POST /api/stripe/webhook` - Handle Stripe events

## Component Architecture

```
app/
├── (pages)
│   ├── page.tsx              # Landing (public)
│   ├── login/page.tsx        # Login (public)
│   ├── dashboard/page.tsx    # Dashboard (protected)
│   ├── dreams/
│   │   ├── new/page.tsx      # New dream (protected)
│   │   └── [id]/page.tsx     # Dream detail (protected)
│   └── upgrade/page.tsx      # Upgrade (protected)
│
└── api/
    ├── auth/
    │   ├── signup/route.ts
    │   ├── login/route.ts
    │   └── logout/route.ts
    ├── dreams/
    │   ├── route.ts
    │   └── [id]/route.ts
    ├── insights/
    │   └── generate/route.ts
    └── stripe/
        ├── create-checkout/route.ts
        └── webhook/route.ts
```

## State Management

### Client State
- Forms: React useState
- Authentication: Supabase session
- Loading states: Component state
- No global state manager needed (server-driven)

### Server State
- Database: Supabase (source of truth)
- Sessions: Supabase Auth cookies
- Cache: Next.js automatic caching

## Deployment Architecture

```
GitHub Repository
    ↓
Vercel (Hosting)
    ↓
Next.js App
    ├── Edge Functions (API Routes)
    ├── Static Pages
    └── Server Components
         ↓
External Services:
    ├── Supabase (DB + Auth)
    ├── Gemini AI (Google)
    └── Stripe (Payments)
```

## Performance Optimizations

1. **Database**
   - Indexes on user_id and created_at
   - RLS for security + performance
   - Automatic connection pooling

2. **API**
   - Trimmed content before AI calls
   - Efficient query patterns
   - Early returns on validation

3. **Frontend**
   - Next.js automatic code splitting
   - Optimized images (if added)
   - Client-side caching via SWR pattern

4. **AI**
   - Character limit (2000)
   - Timeout handling (8s max)
   - Structured JSON output

## Error Handling Flow

```
Error Occurs
    ↓
Caught in try-catch
    ↓
Logged to console
    ↓
User-friendly message displayed
    ↓
Error state cleared on retry
```

## Monitoring Points

Key metrics to monitor:
- API response times
- Gemini AI latency
- Database query performance
- Stripe webhook success rate
- User conversion funnel
- Error rates by endpoint

---

This architecture provides:
✅ Scalability
✅ Security
✅ Performance
✅ Maintainability
✅ Clear separation of concerns
