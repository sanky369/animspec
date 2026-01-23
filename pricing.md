# AnimSpec.ai Pricing Documentation

## Overview

AnimSpec.ai uses a **credits-based pricing model** where users purchase one-time credit packs. Different analysis quality levels consume different amounts of credits based on the underlying AI model costs.

---

## Services & Infrastructure Costs

### Gemini API (Video Understanding)

**Token Rate:** 263 tokens per second of video

| Video Duration | Video Tokens | + Prompt (~1,200) | Total Input Tokens |
|----------------|--------------|-------------------|-------------------|
| 10 seconds | 2,630 | 1,200 | ~3,830 |
| 30 seconds | 7,890 | 1,200 | ~9,090 |
| 60 seconds | 15,780 | 1,200 | ~16,980 |

#### Model Pricing (per 1M tokens)

| Model | Input Cost | Output Cost | Used For |
|-------|------------|-------------|----------|
| Gemini 2.5 Flash | $0.30 | $2.50 | Fast quality |
| Gemini 3 Flash Preview | $0.50 | $3.00 | Balanced quality |
| Gemini 3 Pro Preview | $2.00 | $12.00 | Precise quality |

### Gemini Files API

- **Cost:** FREE (no storage charges)
- **Retention:** 48 hours automatic deletion
- **Limits:** 2GB per file, 20GB per project
- **Use case:** Videos larger than 20MB

### Firebase (Auth + Database + Storage)

| Service | Cost | Notes |
|---------|------|-------|
| Authentication | Free | Up to 50K monthly active users |
| Firestore | $0.18/100K reads, $0.18/100K writes | Pay as you go |
| Storage | $0.026/GB | For frame images |

**Recommendation:** Firebase free tier is sufficient for initial launch.

### Vercel (Hosting)

| Plan | Monthly Cost | Features |
|------|-------------|----------|
| Hobby | $0 | Personal projects, limited |
| Pro | $20 | Commercial use, team features |

---

## Cost per Analysis

Based on a typical 30-second video analysis:

| Quality | Model | Input Tokens | Output Tokens | Input Cost | Output Cost | **Total Cost** |
|---------|-------|--------------|---------------|------------|-------------|----------------|
| Fast | Gemini 2.5 Flash | ~9,090 | 3,072 | $0.003 | $0.008 | **$0.011** |
| Balanced | Gemini 3 Flash | ~9,090 | 8,192 | $0.005 | $0.025 | **$0.030** |
| Precise | Gemini 3 Pro | ~9,090 | 16,384 | $0.018 | $0.197 | **$0.215** |

---

## Credits System

### Credit Consumption

| Quality | Credits Used | Our Cost | User Pays | Gross Margin |
|---------|--------------|----------|-----------|--------------|
| Fast | 1 credit | $0.01 | $0.04 | 75% |
| Balanced | 3 credits | $0.03 | $0.12 | 75% |
| Precise | 20 credits | $0.22 | $0.80 | 73% |

### Free Tier

- **20 credits** on signup
- All quality levels available EXCEPT Precise
- Precise mode locked until user purchases any credit pack

### Credit Packs (One-time Purchase, Never Expire)

| Pack | Credits | Price | Per Credit | Savings | Best For |
|------|---------|-------|------------|---------|----------|
| **Creator** | 200 | $24 | $0.12 | - | Indie developers, side projects |
| **Pro** | 600 | $59 | $0.098 | 18% | Teams & professionals |

---

## Example Usage Scenarios

### Free Tier (20 credits)
- 20 Fast analyses, OR
- 6 Balanced analyses, OR
- 0 Precise analyses (locked)

### Creator Pack (200 credits / $24)
- 200 Fast analyses, OR
- 66 Balanced analyses, OR
- 10 Precise analyses
- **Unlocks Precise mode**

### Pro Pack (600 credits / $59)
- 600 Fast analyses, OR
- 200 Balanced analyses, OR
- 30 Precise analyses
- **Best value per credit**

---

## Monthly Fixed Costs (Infrastructure)

| Service | Cost | Notes |
|---------|------|-------|
| Firebase | ~$0-10 | Pay as you go |
| Vercel Pro | $20 | Hosting + Edge Functions |
| Domain | ~$1 | ~$12/year amortized |
| **Total** | **~$21-30/mo** | |

### Break-even Analysis

- Minimum to cover fixed costs: ~$25/mo
- Break-even: ~2 Creator packs or ~1 Pro pack per month

---

## Revenue Projections

| Scenario | Monthly Users | Avg Purchase | Gross Revenue | Fixed Costs | Variable Costs (25%) | **Net Profit** |
|----------|---------------|--------------|---------------|-------------|---------------------|----------------|
| Early | 50 | $30 | $1,500 | $25 | $375 | **$1,100** |
| Growth | 200 | $35 | $7,000 | $25 | $1,750 | **$5,225** |
| Scale | 500 | $40 | $20,000 | $25 | $5,000 | **$14,975** |

---

## Implementation Notes

### Database Schema (Firebase Firestore)

Collections:
- `profiles` - User profiles with credits balance
- `analyses` - Analysis history (max 50 per user)
- `credit_transactions` - Credit audit trail
- `purchases` - Purchase records

```typescript
// Firestore document types

interface UserProfile {
  id: string; // Same as Firebase Auth UID
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  creditsBalance: number;
  creditsExpiresAt: Date | null;
  hasUsedFreeTrial: boolean;
  isPaidUser: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Analysis {
  id: string;
  userId: string;
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  overview: string;
  code: string;
  frameImageUrl: string | null;
  videoName: string;
  videoDuration: number;
  creditsUsed: number;
  createdAt: Date;
}
```

### Credit Deduction Logic

```typescript
const CREDIT_COSTS = {
  fast: 1,
  balanced: 3,
  precise: 20,
} as const;

async function checkCredits(userId: string, quality: QualityLevel) {
  const profile = await getProfile(userId);
  const cost = CREDIT_COSTS[quality];

  // Check balance
  if (profile.creditsBalance < cost) {
    throw new Error('Insufficient credits');
  }

  // Check if precise mode is allowed
  if (quality === 'precise' && !profile.isPaidUser) {
    throw new Error('Precise mode requires a paid account');
  }
}
```

### Payment Integration

**Lemon Squeezy** - Merchant of record, handles taxes (~5% + $0.50)
- Handles VAT/sales tax globally
- Simpler integration
- One-time payments (no subscriptions)

---

## Pricing Page Copy

### Headline
> **Simple Credit Packs. Pay Once, Use Anytime.**

### Subheadline
> No subscriptions. No expiration. Purchase credits and use them whenever you need.

### Value Props
- Start free with 20 credits
- Credits never expire
- Bulk discounts up to 18% off
- All output formats included
- Unlocks Precise mode (Gemini 3 Pro)

### FAQ

**Q: Do credits expire?**
A: No, credits never expire. Use them whenever you need.

**Q: Can I get a refund?**
A: Unused credits can be refunded within 14 days of purchase.

**Q: What's the difference between quality levels?**
A: Fast is great for quick prototypes. Balanced offers the best value with deeper analysis. Precise uses our most advanced model for complex animations.

**Q: Is there a free tier?**
A: Yes! New users get 20 free credits to try the service. Note: Precise mode is locked until you purchase any credit pack.

**Q: Why is Precise mode locked for free users?**
A: Precise mode uses Gemini 3 Pro, which costs significantly more per analysis (20 credits vs 1-3 for other modes). We unlock it for paying customers to ensure sustainable service.

---

## Future Considerations

### Potential Add-ons
- **API Access:** $49/mo for programmatic access
- **Priority Processing:** 2x credits for faster queue
- **Team Workspace:** $19/user/mo for collaboration features

### Volume Discounts
For customers needing 2,000+ credits, offer custom enterprise pricing with:
- Dedicated support
- SLA guarantees
- Custom integrations
- Volume discounts up to 40%
