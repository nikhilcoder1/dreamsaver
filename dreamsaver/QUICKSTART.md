# 🚀 Quick Start Guide

Get DreamSaver running in 15 minutes!

## Prerequisites

- Node.js 18+ installed
- A code editor (VS Code recommended)
- Terminal/command line access

## 5-Minute Setup

### 1. Install Dependencies (2 min)

```bash
cd dreamsaver
npm install
```

### 2. Create Accounts (5 min)

You need 3 free accounts:

1. **Supabase** (Database)
   - Go to [supabase.com](https://supabase.com)
   - Click "Start your project"
   - Create a new organization and project

2. **Google AI Studio** (Gemini)
   - Go to [makersuite.google.com](https://makersuite.google.com/app/apikey)
   - Click "Create API Key"

3. **Stripe** (Payments)
   - Go to [stripe.com](https://stripe.com)
   - Sign up for a free account

### 3. Setup Database (3 min)

1. In Supabase dashboard, go to **SQL Editor**
2. Create a new query
3. Copy & paste entire contents of `supabase/schema.sql`
4. Click **Run**
5. You should see "Success. No rows returned"

### 4. Get Your API Keys (3 min)

#### Supabase Keys
1. Settings → API
2. Copy these 3 values:
   - Project URL
   - anon public key
   - service_role key (click "Reveal")

#### Gemini Key
1. Should already have from Google AI Studio
2. If not, go to API Keys tab

#### Stripe Keys
1. Developers → API keys
2. Copy:
   - Publishable key (pk_test...)
   - Secret key (sk_test...)
3. Products → Add Product
   - Name: "DreamSaver Pro"
   - Price: $8.00 monthly recurring
4. Copy the **Price ID** (starts with `price_`)

### 5. Configure Environment (2 min)

1. Open `.env.local` in your code editor
2. Fill in all the values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
GEMINI_API_KEY=AIzaSy...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: Leave `STRIPE_WEBHOOK_SECRET` empty for now - we'll set it up later.

### 6. Start the App! (1 min)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## First Test (5 min)

### Test 1: Sign Up
1. Enter email and password
2. Write a dream (anything!)
3. Select a mood
4. Click "Begin Your Journey"
5. ✅ You should see the dashboard

### Test 2: Create a Dream
1. Click "Add Dream"
2. Write another dream
3. Save it
4. ✅ You should see it in your list

### Test 3: Generate Insight
1. Click on a dream
2. Click "Generate Insight"
3. Wait 3-8 seconds
4. ✅ You should see AI analysis!

### Test 4: Upgrade Flow (Optional)
**Note**: This requires webhook setup. Skip for now and come back later.

## Webhook Setup (Optional - for testing payments)

To test Stripe payments locally:

### 1. Install Stripe CLI

**Mac**:
```bash
brew install stripe/stripe-cli/stripe
```

**Windows** (with Scoop):
```bash
scoop install stripe
```

**Linux**:
```bash
# See https://stripe.com/docs/stripe-cli
```

### 2. Login and Forward Webhooks

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This will give you a webhook secret (whsec_...).

### 3. Update .env.local

Add the webhook secret:
```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 4. Restart the app

```bash
# Stop the app (Ctrl+C)
npm run dev
```

### 5. Test Payment

1. Click "Upgrade to Pro"
2. Click upgrade button
3. Use test card: `4242 4242 4242 4242`
4. Use any future date and any CVC
5. Complete checkout
6. ✅ You should be redirected as a Pro user!

## Troubleshooting

### "Can't connect to database"
- Check Supabase URL and keys
- Make sure you ran the schema.sql

### "Gemini API error"
- Verify your API key is correct
- Check you have API quota remaining

### "Stripe webhook error"
- Make sure Stripe CLI is running
- Verify webhook secret matches .env.local

### App won't start
- Make sure Node.js 18+ is installed
- Try deleting node_modules and running `npm install` again
- Check for port 3000 conflicts

## What's Next?

### You're Ready! 🎉

You now have a fully functional DreamSaver app running locally!

### Want to Learn More?

- **Understand the Code**: Read [ARCHITECTURE.md](ARCHITECTURE.md)
- **See All Features**: Check [FEATURES.md](FEATURES.md)
- **Deploy to Production**: Follow [DEPLOYMENT.md](DEPLOYMENT.md)
- **Daily Commands**: See [SCRIPTS.md](SCRIPTS.md)

### Want to Customize?

- **Colors**: Edit `tailwind.config.ts`
- **Fonts**: Edit `app/layout.tsx`
- **Styles**: Edit `app/globals.css`
- **AI Prompt**: Edit `app/api/insights/generate/route.ts`

## Common Next Steps

### 1. Deploy to Vercel
Follow [DEPLOYMENT.md](DEPLOYMENT.md) - takes ~15 minutes

### 2. Customize Design
Edit colors in `tailwind.config.ts` and `app/globals.css`

### 3. Add Features
- See [FEATURES.md](FEATURES.md) for future ideas
- Code is well-documented for easy additions

### 4. Set Up Analytics
- Enable Vercel Analytics
- Add Google Analytics (optional)

## Need Help?

1. Check [SETUP.md](SETUP.md) for detailed instructions
2. Read [DOCS_INDEX.md](DOCS_INDEX.md) for navigation
3. Review error messages carefully
4. Check browser console for client errors
5. Check terminal for server errors

## File You'll Edit Most

```
app/
├── page.tsx              # Landing page
├── dashboard/page.tsx    # Dashboard
├── dreams/[id]/page.tsx  # Dream details
└── globals.css           # Styles

lib/
└── types.ts              # Add new types here

components/ui/            # UI components
```

## Summary

✅ You should now have:
- DreamSaver running at localhost:3000
- Database set up with Supabase
- AI insights working with Gemini
- Stripe payment flow (optional)

**Total Setup Time**: 15-20 minutes

**Ready to code?** Start exploring the codebase!

**Ready to deploy?** See [DEPLOYMENT.md](DEPLOYMENT.md)

🚀 **Happy Building!**
