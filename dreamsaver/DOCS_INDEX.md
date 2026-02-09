# DreamSaver - Documentation Index

Welcome to DreamSaver! This index will help you find the documentation you need.

## 📚 Quick Links

| Document | Purpose | Best For |
|----------|---------|----------|
| [README.md](README.md) | Project overview & quick start | First-time readers |
| [SETUP.md](SETUP.md) | Detailed setup instructions | Setting up locally |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment guide | Going live |
| [FEATURES.md](FEATURES.md) | Complete feature checklist | Understanding what's built |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System architecture & flows | Understanding the codebase |
| [SCRIPTS.md](SCRIPTS.md) | NPM commands & troubleshooting | Day-to-day development |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | High-level project summary | Overview & context |

## 🎯 Documentation by Role

### For Developers
1. Start with [README.md](README.md) - Overview
2. Follow [SETUP.md](SETUP.md) - Get it running
3. Read [ARCHITECTURE.md](ARCHITECTURE.md) - Understand the system
4. Reference [SCRIPTS.md](SCRIPTS.md) - Daily commands
5. Check [FEATURES.md](FEATURES.md) - See what exists

### For Project Managers
1. Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - High-level view
2. Review [FEATURES.md](FEATURES.md) - What's completed
3. Check [DEPLOYMENT.md](DEPLOYMENT.md) - Launch readiness

### For Designers
1. See [README.md](README.md) - Design system overview
2. Check `app/globals.css` - Custom styles
3. Review `tailwind.config.ts` - Theme configuration
4. Look at components in `components/ui/` - UI elements

## 📖 Documentation by Topic

### Getting Started
- **Setup Guide**: [SETUP.md](SETUP.md)
- **Environment Variables**: [.env.local](.env.local)
- **Database Schema**: [supabase/schema.sql](supabase/schema.sql)
- **Quick Start**: [README.md](README.md#getting-started)

### Architecture & Design
- **System Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Data Flow**: [ARCHITECTURE.md](ARCHITECTURE.md#data-flow)
- **Database Schema**: [ARCHITECTURE.md](ARCHITECTURE.md#database-schema)
- **API Endpoints**: [ARCHITECTURE.md](ARCHITECTURE.md#api-endpoints)

### Features
- **Feature Checklist**: [FEATURES.md](FEATURES.md)
- **User Flows**: [FEATURES.md](FEATURES.md#user-flows)
- **Tech Stack**: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md#tech-stack-summary)

### Development
- **NPM Scripts**: [SCRIPTS.md](SCRIPTS.md)
- **Code Structure**: [ARCHITECTURE.md](ARCHITECTURE.md#component-architecture)
- **Troubleshooting**: [SCRIPTS.md](SCRIPTS.md#troubleshooting)

### Deployment
- **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Pre-Deployment Checklist**: [DEPLOYMENT.md](DEPLOYMENT.md#pre-deployment-checklist)
- **Going Live**: [DEPLOYMENT.md](DEPLOYMENT.md#going-live-checklist)
- **Monitoring**: [DEPLOYMENT.md](DEPLOYMENT.md#monitoring-setup)

## 🔍 Quick Find

### I want to...

**...understand the project**
→ [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

**...set it up locally**
→ [SETUP.md](SETUP.md)

**...understand the code**
→ [ARCHITECTURE.md](ARCHITECTURE.md)

**...see what's implemented**
→ [FEATURES.md](FEATURES.md)

**...deploy to production**
→ [DEPLOYMENT.md](DEPLOYMENT.md)

**...run npm commands**
→ [SCRIPTS.md](SCRIPTS.md)

**...fix an issue**
→ [SCRIPTS.md](SCRIPTS.md#troubleshooting)

**...understand the database**
→ [supabase/schema.sql](supabase/schema.sql) + [ARCHITECTURE.md](ARCHITECTURE.md#database-schema)

**...customize the design**
→ [app/globals.css](app/globals.css) + [tailwind.config.ts](tailwind.config.ts)

**...understand the API**
→ [ARCHITECTURE.md](ARCHITECTURE.md#api-endpoints)

## 📂 File Organization

```
Documentation Files:
├── README.md              # Project overview
├── SETUP.md              # Setup instructions
├── DEPLOYMENT.md         # Deployment guide
├── FEATURES.md           # Feature checklist
├── ARCHITECTURE.md       # System architecture
├── SCRIPTS.md            # NPM commands
├── PROJECT_SUMMARY.md    # High-level summary
└── DOCS_INDEX.md         # This file

Configuration Files:
├── .env.local            # Environment variables
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.ts    # Tailwind config
├── next.config.js        # Next.js config
└── .eslintrc.json        # ESLint config

Database:
└── supabase/
    └── schema.sql        # Database schema

Source Code:
├── app/                  # Pages and API routes
├── components/           # React components
└── lib/                  # Utilities and types
```

## 🎓 Learning Path

### Beginner
1. [README.md](README.md) - Understand what it is
2. [SETUP.md](SETUP.md) - Get it running
3. [FEATURES.md](FEATURES.md) - See what it does
4. [SCRIPTS.md](SCRIPTS.md) - Learn the commands

### Intermediate
1. [ARCHITECTURE.md](ARCHITECTURE.md) - Understand the system
2. Explore `app/` directory - See the pages
3. Explore `components/` - See the UI
4. Review API routes in `app/api/` - Understand backend

### Advanced
1. Review database schema - Understand data model
2. Study API implementations - See integration patterns
3. Review security setup - Understand RLS policies
4. Study deployment config - Production readiness

## 🆘 Common Questions

**Q: Where do I start?**
A: Read [README.md](README.md) then follow [SETUP.md](SETUP.md)

**Q: How do I set up the database?**
A: See [SETUP.md](SETUP.md#step-2-supabase-setup)

**Q: What features are included?**
A: Check [FEATURES.md](FEATURES.md)

**Q: How do I deploy?**
A: Follow [DEPLOYMENT.md](DEPLOYMENT.md)

**Q: Where are the API keys configured?**
A: In [.env.local](.env.local) - see [SETUP.md](SETUP.md#step-5-configure-environment-variables)

**Q: How does the AI integration work?**
A: See [ARCHITECTURE.md](ARCHITECTURE.md#3-ai-insight-generation)

**Q: How do payments work?**
A: See [ARCHITECTURE.md](ARCHITECTURE.md#4-subscription-flow)

**Q: Where's the database schema?**
A: [supabase/schema.sql](supabase/schema.sql)

## 📞 Support

### Documentation Issues
If you find issues with documentation:
1. Check if there's a more recent version
2. Look for related docs in this index
3. Review the actual code as source of truth

### Code Issues
If you encounter bugs:
1. Check [SCRIPTS.md](SCRIPTS.md#troubleshooting)
2. Review error logs (browser console, Vercel logs, Supabase logs)
3. Verify environment variables are correct
4. Check that database schema is applied

### External Resources
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)
- **Stripe**: [stripe.com/docs](https://stripe.com/docs)
- **Tailwind**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## 🔄 Document Updates

This is a living documentation. Key sections to update:
- Add new features to [FEATURES.md](FEATURES.md)
- Update architecture diagrams in [ARCHITECTURE.md](ARCHITECTURE.md)
- Add new setup steps to [SETUP.md](SETUP.md)
- Update deployment steps in [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Last Updated**: February 2026
**Version**: 1.0
**Status**: Production Ready MVP

Need something else? Check the full file structure in the project root!
