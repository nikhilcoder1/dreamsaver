# DreamSaver

A beautiful, AI-powered dream journaling webapp that helps users track their dreams and gain personalized insights using Gemini AI.

## Features

- 🌙 **Dream Journaling**: Record unlimited dreams with mood tags
- 🤖 **AI Insights**: Get personalized dream analysis powered by Gemini AI
- 📊 **Dashboard**: View all your dreams at a glance
- 💎 **Free & Pro Tiers**: 5 free insights, upgrade for unlimited access
- 🎨 **Dreamy UI**: Beautiful dark-mode interface with purple/indigo theme
- 🔒 **Secure**: Authentication and data storage with Supabase
- 💳 **Stripe Integration**: Seamless subscription management

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes
- **Database & Auth**: Supabase
- **AI**: Google Gemini AI
- **Payments**: Stripe

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account
- A Google AI (Gemini) API key
- A Stripe account

### 1. Clone and Install

```bash
cd dreamsaver
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema from `supabase/schema.sql`
3. Get your Supabase URL and anon key from Settings > API

### 3. Set Up Gemini AI

1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your environment variables

### 4. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create a product with a recurring price of $8/month
3. Get your API keys from Developers > API keys
4. Set up a webhook endpoint pointing to `/api/stripe/webhook`
5. Copy the webhook signing secret

### 5. Configure Environment Variables

Copy `.env.local` and fill in your keys:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
dreamsaver/
├── app/
│   ├── api/
│   │   ├── auth/           # Authentication endpoints
│   │   ├── dreams/         # Dream CRUD operations
│   │   ├── insights/       # AI insight generation
│   │   └── stripe/         # Stripe checkout & webhooks
│   ├── dashboard/          # Main dashboard page
│   ├── dreams/
│   │   ├── new/           # Create new dream
│   │   └── [id]/          # Dream detail & insight view
│   ├── login/             # Login page
│   ├── upgrade/           # Subscription upgrade page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── supabase/          # Supabase client utilities
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Utility functions
├── supabase/
│   └── schema.sql         # Database schema
└── .env.local             # Environment variables
```

## Database Schema

### Tables

- **profiles**: User profiles with subscription status and insights usage
- **dreams**: Dream entries with content, mood tags, and metadata
- **insights**: AI-generated dream analysis linked to dreams

## Features Breakdown

### Free Tier
- Unlimited dream logging
- 5 free AI insights
- Mood tracking
- Full dream archive

### Pro Tier ($8/month)
- Everything in Free
- Unlimited AI insights
- Priority support
- Cancel anytime

## AI Insight Generation

The app uses Gemini AI to analyze dreams and provide:
- **Summary/Interpretation**: 2-3 sentences explaining the dream's meaning
- **Key Symbols**: List of important symbols detected
- **Reflection/Advice**: Supportive guidance based on the dream

Insights are generated within 3-8 seconds with a beautiful loading animation.

## Design System

### Colors
- Background: `#0A051A` (Deep Night)
- Surface: `#1B1431` (Mid-Indigo)
- Primary: `#8A2BE2` (Violet)
- Secondary: `#483D8B` (Sky Blue)

### Typography
- Headers & UI: Inter (sans-serif)
- Dream content: Lora (serif)

### Key Features
- Rounded corners (xl borders)
- Glassmorphism effects
- Smooth transitions (300ms)
- Purple/indigo gradients
- Glow effects on hover

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Make sure to update:
- `NEXT_PUBLIC_APP_URL` to your production URL
- Stripe webhook endpoint to your production URL
- All other production API keys

## Development Tips

### Testing Stripe Webhooks Locally

Use Stripe CLI to forward webhooks:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Testing Gemini AI

The app includes character limits (2000 chars) and trimming before sending to Gemini to manage costs and latency.

## Security

- Row Level Security (RLS) enabled on all tables
- Server-side API key management
- Stripe webhook signature verification
- Secure session management with Supabase Auth

## Support

For issues or questions:
1. Check the Supabase logs for database errors
2. Check browser console for client-side errors
3. Check Vercel logs for API errors
4. Verify all environment variables are set correctly

## License

MIT License - feel free to use this project as a starting point for your own applications.

## Acknowledgments

- Built with Next.js 15 and React 19
- UI components from shadcn/ui
- AI powered by Google Gemini
- Icons from Lucide React
