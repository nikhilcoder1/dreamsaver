# DreamSaver - Deployment Checklist

## Pre-Deployment Checklist

### 1. Code Quality ✅
- [ ] All TypeScript errors resolved
- [ ] ESLint passes without errors
- [ ] Build completes successfully (`npm run build`)
- [ ] No console.log statements in production code
- [ ] Error handling in all API routes
- [ ] Loading states for all async operations

### 2. Environment Variables ✅
- [ ] All required variables in `.env.local`
- [ ] `.env.local` is in `.gitignore`
- [ ] Environment variable names match deployment platform
- [ ] No hardcoded secrets in code

Required Variables:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
GEMINI_API_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_ID
NEXT_PUBLIC_APP_URL
```

### 3. Database Setup ✅
- [ ] Supabase project created
- [ ] Schema applied (`schema.sql`)
- [ ] RLS policies enabled
- [ ] Test data cleaned up
- [ ] Indexes created
- [ ] Foreign keys in place

### 4. API Keys Validated ✅
- [ ] Supabase keys work in production
- [ ] Gemini API key has sufficient quota
- [ ] Stripe keys are for correct mode (test/live)
- [ ] Stripe webhook secret matches endpoint

### 5. Stripe Configuration ✅
- [ ] Product created ($8/month)
- [ ] Price ID added to environment variables
- [ ] Webhook endpoint configured
- [ ] Webhook events selected:
  - [ ] checkout.session.completed
  - [ ] customer.subscription.updated
  - [ ] customer.subscription.deleted
- [ ] Test mode transactions working
- [ ] Ready to switch to live mode

### 6. Testing ✅
- [ ] User signup flow works
- [ ] User login flow works
- [ ] Dream creation works
- [ ] Dream listing displays correctly
- [ ] AI insight generation works
- [ ] Stripe checkout completes
- [ ] Webhook updates user status
- [ ] Free tier limits enforced
- [ ] Pro tier grants unlimited access
- [ ] Mobile responsive design works

## Deployment Steps

### Vercel Deployment (Recommended)

#### Step 1: Prepare Repository
```bash
# Ensure everything is committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Framework Preset: Next.js (auto-detected)

#### Step 3: Configure Environment Variables
Add all variables from `.env.local`:

| Variable | Value | Note |
|----------|-------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your URL | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your key | Public |
| `SUPABASE_SERVICE_ROLE_KEY` | Your key | Secret |
| `GEMINI_API_KEY` | Your key | Secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your key | Public |
| `STRIPE_SECRET_KEY` | Your key | Secret |
| `STRIPE_WEBHOOK_SECRET` | TBD | Add after webhook setup |
| `STRIPE_PRICE_ID` | Your price ID | Secret |
| `NEXT_PUBLIC_APP_URL` | Your Vercel URL | Public |

#### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Note your deployment URL (e.g., dreamsaver.vercel.app)

#### Step 5: Configure Stripe Webhook
1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://yourdomain.vercel.app/api/stripe/webhook`
4. Select events:
   - checkout.session.completed
   - customer.subscription.updated
   - customer.subscription.deleted
5. Click "Add endpoint"
6. Copy the "Signing secret"
7. Add to Vercel environment variables:
   - Name: `STRIPE_WEBHOOK_SECRET`
   - Value: `whsec_...`
8. Redeploy app to use new webhook secret

#### Step 6: Update App URL
1. Update `NEXT_PUBLIC_APP_URL` in Vercel
2. Set to your actual domain (e.g., `https://dreamsaver.vercel.app`)
3. Redeploy

### Alternative: Other Platforms

#### Railway
1. Connect GitHub repo
2. Add environment variables
3. Deploy

#### Netlify
1. Import from GitHub
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

## Post-Deployment Checklist

### 1. Verify Deployment ✅
- [ ] Site loads at production URL
- [ ] All pages accessible
- [ ] No console errors
- [ ] API routes responding
- [ ] Static assets loading

### 2. Test Core Flows ✅
- [ ] Signup with new email
- [ ] Login with test account
- [ ] Create a dream
- [ ] Generate an insight
- [ ] View dashboard
- [ ] Test Stripe checkout (use test card)
- [ ] Verify Pro upgrade works
- [ ] Check webhook updates database

### 3. Monitor First Day ✅
- [ ] Check Vercel logs for errors
- [ ] Monitor Supabase usage
- [ ] Watch Stripe dashboard for transactions
- [ ] Check Gemini API usage
- [ ] Test from different devices/browsers

### 4. Performance Check ✅
- [ ] Lighthouse score > 90
- [ ] Time to First Byte < 1s
- [ ] First Contentful Paint < 2s
- [ ] AI insight generation < 8s

### 5. Security Audit ✅
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] API keys not exposed in client
- [ ] RLS policies active in Supabase
- [ ] Webhook signature verification working

## Going Live Checklist

### Switch from Test to Live Mode

#### Stripe
1. [ ] Switch to live mode in Stripe Dashboard
2. [ ] Create live product ($8/month)
3. [ ] Get new live API keys
4. [ ] Update environment variables:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_live_...)
   - `STRIPE_SECRET_KEY` (sk_live_...)
   - `STRIPE_PRICE_ID` (price_... for live product)
5. [ ] Create new webhook endpoint for live mode
6. [ ] Update `STRIPE_WEBHOOK_SECRET`
7. [ ] Redeploy

#### Final Tests
1. [ ] Test with real credit card (then refund)
2. [ ] Verify subscription creates correctly
3. [ ] Check webhook events arrive
4. [ ] Test cancellation flow
5. [ ] Verify email receipts from Stripe

## Monitoring Setup

### Essential Monitoring
- [ ] Vercel Analytics enabled
- [ ] Error tracking (Sentry optional)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Database backups automated

### Key Metrics to Track
- User signups per day
- Dreams created per day
- Insights generated per day
- Free to Pro conversion rate
- Average revenue per user
- Churn rate

## Rollback Plan

If issues occur:
1. Check Vercel logs for errors
2. Check Supabase logs
3. Verify environment variables
4. Roll back to previous deployment in Vercel
5. Fix issues locally
6. Test thoroughly
7. Redeploy

## Backup Plan

### Database Backups
Supabase automatically backs up your database.

To manually backup:
1. Go to Supabase Dashboard
2. Database > Backups
3. Download backup

### Code Backups
- GitHub repository (always up to date)
- Vercel deployment history
- Local development copy

## Post-Launch Tasks

### Week 1
- [ ] Monitor error rates
- [ ] Check user feedback
- [ ] Verify payment flows
- [ ] Test on multiple browsers/devices
- [ ] Fix any critical bugs

### Month 1
- [ ] Analyze user behavior
- [ ] Optimize slow queries
- [ ] Review AI insight quality
- [ ] Consider feature improvements
- [ ] Set up analytics dashboard

## Support Resources

- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)
- **Stripe**: [stripe.com/docs](https://stripe.com/docs)

## Emergency Contacts

- Vercel Status: [vercel-status.com](https://www.vercel-status.com)
- Supabase Status: [status.supabase.com](https://status.supabase.com)
- Stripe Status: [status.stripe.com](https://status.stripe.com)

---

## Quick Deploy Command Summary

```bash
# 1. Final check
npm run build
npm run lint

# 2. Commit
git add .
git commit -m "Production ready"
git push origin main

# 3. Deploy on Vercel
# (Use Vercel dashboard)

# 4. Configure webhook
# (Use Stripe dashboard)

# 5. Test
# Visit your production URL and test all flows
```

🚀 **Ready to Launch!**
