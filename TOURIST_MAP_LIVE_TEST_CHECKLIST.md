# TOURIST_MAP_LIVE_TEST_CHECKLIST

## Pre-Deploy
- [ ] Set all required env vars in hosting dashboard
- [ ] Confirm Firebase authorized domains include production domain
- [ ] Run `npm run build`

## Deploy
- [ ] Deploy to Vercel (or own domain host)
- [ ] Verify deployment build logs show no runtime errors

## Smoke Test (Desktop)
- [ ] Open `/`
- [ ] Click **Trip Planner** CTA
- [ ] Click **Discover Places** CTA
- [ ] Open `/places` and search `Kandy`
- [ ] Switch Grid/Map modes
- [ ] Click place card and verify details panel
- [ ] Open `/provinces` and verify all 9 provinces render with images
- [ ] Open `/trip-planner` and generate a plan
- [ ] Open `/login` and verify Google sign-in popup works

## Smoke Test (Mobile)
- [ ] Open site in mobile viewport/device
- [ ] Verify menu opens/closes correctly
- [ ] Verify cards and map sections do not overflow
- [ ] Verify hero and CTA alignment

## Reliability
- [ ] Hard refresh pages to confirm no hydration errors
- [ ] Check browser console for red errors
- [ ] Check network tab for failed API/image requests

## Security & Config
- [ ] Confirm no private secrets are visible in source/devtools
- [ ] Confirm only `NEXT_PUBLIC_*` keys are exposed client-side
- [ ] Verify Firebase auth domain restrictions

## Final Sign-off
- [ ] Demo ready
- [ ] Competition ready
- [ ] Public beta ready (only after SEO + optimization + rate-limit tasks)
