# DreamSaver - Complete Setup Guide

This guide will walk you through setting up DreamSaver from scratch.

## Step 1: Install Dependencies

```bash
cd dreamsaver
npm install
```

## Step 2: Supabase Setup

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be created

### 2.2 Run the Database Schema

1. In your Supabase project, go to the SQL Editor
2. Copy the entire contents of `supabase/schema.sql`
3. Paste it into the SQL Editor
4. Click "Run" to execute the schema

This will create:
- `profiles` table for user data
- `dreams` table for dream entries
- `insights` table for AI-generated insights
- Row Level Security policies
- Automatic triggers for timestamps

### 2.3 Get Your Supabase Keys

1. Go to Settings > API
2. Copy these values:
   - **Project URL** (starts with https://...)
   - **anon public** key
   - **service_role** key (click "Reveal" to see it)

## Step 3: Gemini AI Setup

### 3.1 Get a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Select your Google Cloud project (or create one)
4. Copy the API key

## Step 4: Stripe Setup

### 4.1 Create a Stripe Account

1. Go to [stripe.com](https://stripe.com) and sign up
2. Activate your account

### 4.2 Create a Product and Price

1. In Stripe Dashboard, go to Products > Add Product
2. Name: "DreamSaver Pro"
3. Pricing: Recurring, $8.00 USD, Monthly
4. Click "Save"
5. Copy the **Price ID** (starts with `price_...`)

### 4.3 Get Your API Keys

1. Go to Developers > API keys
2. Copy:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`)

### 4.4 Set Up Webhook (for local development)

For local development, you'll use Stripe CLI:

```bash
# Install Stripe CLI
# On macOS:
brew install stripe/stripe-cli/stripe

# On Windows (with Scoop):
scoop install stripe

# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This will give you a webhook signing secret (starts with `whsec_...`).

**For production**: Set up a webhook endpoint in Stripe Dashboard pointing to `https://yourdomain.com/api/stripe/webhook` with these events:
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

## Step 5: Configure Environment Variables

1. Open `.env.local` in the project root
2. Fill in all the values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRICE_ID=price_your_price_id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 6: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 7: Test the Application

### Test User Signup
1. Go to the landing page
2. Enter email and password
3. Write a dream description
4. Click "Begin Your Journey"
5. You should be redirected to the dashboard

### Test Dream Creation
1. Click "Add Dream" on the dashboard
2. Fill in the dream details
3. Click "Save Dream"
4. You should see it in your dream list

### Test AI Insight Generation
1. Click on a dream to view details
2. Click "Generate Insight"
3. Wait 3-8 seconds for the AI analysis
4. You should see the interpretation, symbols, and reflection

### Test Stripe Payment (Test Mode)
1. Click "Upgrade to Pro" on the dashboard
2. Click the upgrade button
3. Use Stripe test card: `4242 4242 4242 4242`
4. Use any future expiry date and any CVC
5. Complete the checkout
6. You should be redirected back to the dashboard as a Pro user

## Troubleshooting

### "Failed to fetch" errors
- Check that all environment variables are set correctly
- Make sure Supabase URL and keys are valid
- Verify Gemini API key is active

### Database errors
- Ensure you ran the complete schema.sql file
- Check Supabase logs in the Dashboard
- Verify Row Level Security policies are in place

### Stripe webhooks not working locally
- Make sure Stripe CLI is running: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- Check the webhook secret matches your .env.local

### AI insights not generating
- Verify your Gemini API key is valid
- Check if you have API quota remaining
- Look at the browser console and server logs for errors

## Production Deployment

### Vercel Deployment

1. Push your code to GitHub (make sure .env.local is in .gitignore!)
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add all environment variables from .env.local
5. Update `NEXT_PUBLIC_APP_URL` to your production URL
6. Deploy!

### After Deployment

1. Set up production Stripe webhook:
   - Go to Stripe Dashboard > Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Select events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
   - Copy the signing secret and update your environment variables

2. Test the production app:
   - Sign up with a new account
   - Create a dream
   - Generate an insight
   - Test the upgrade flow

## Next Steps

- Customize the design colors in `tailwind.config.ts`
- Adjust the AI prompt in `/app/api/insights/generate/route.ts`
- Add more mood tags in `lib/types.ts`
- Set up analytics
- Add more features!

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check Supabase logs
3. Check Vercel/server logs
4. Verify all API keys are correct
5. Make sure database schema was applied correctly
