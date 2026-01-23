# Rendering Discrepancy Troubleshooting Checklist

## Quick Diagnostics

### Problem: Content appears in published URL but not in preview

**Step 1: Identify the discrepancy**
- [ ] Missing content in one environment but not the other
- [ ] Styling differences (unstyled content)
- [ ] Images not loading
- [ ] Navigation broken
- [ ] JavaScript errors in console

**Step 2: Check environment variables**
```bash
# Development
npm run dev
# Check if NODE_ENV=development
echo $NODE_ENV

# Production build
NODE_ENV=production npm run build
# Verify basePath was applied
grep -r "rohit-portfolio" out/ | head -5
```

**Step 3: Compare build outputs**
```bash
# What URLs does the build generate?
find out -name "*.html" | head -10

# Expected output:
# out/index.html
# out/rohit-portfolio/index.html (if basePath applied)
```

---

## Common Issues & Solutions

### Issue 1: CSS/Styling Missing in Production

**Symptoms:**
- Page loads but looks unstyled
- No colors, fonts, or layout
- Looks different from dev preview

**Debugging:**
```bash
# Check if CSS files are in build
find out -name "*.css" | wc -l

# Check basePath in HTML
grep -o 'href="[^"]*\.css"' out/index.html | head -3

# Expected with basePath:
# href="/rohit-portfolio/_next/static/css/...css"

# Without basePath:
# href="/_next/static/css/...css"
```

**Solution:**
1. Verify `next.config.js` sets `assetPrefix` correctly:
```javascript
assetPrefix: basePath ? `${basePath}/` : "",
```

2. Check `.github/workflows/deploy.yml` sets `NODE_ENV=production`

3. Rebuild:
```bash
rm -rf .next out
NODE_ENV=production npm run build
```

---

### Issue 2: 404 Errors for Assets (Images, Fonts)

**Symptoms:**
- Broken image icons in dev tools
- Network tab shows 404 for /static files
- "Cannot find file" errors

**Check Browser DevTools:**
1. Open DevTools (F12)
2. Go to **Network** tab
3. Reload page
4. Filter by "img" and "css"
5. Look for red 404 entries
6. Click asset and check URL

**Expected URLs:**
- With basePath: `/rohit-portfolio/_next/static/...`
- Without basePath: `/_next/static/...`

**Solution:**
```javascript
// next.config.js
const basePath = isProduction ? "/rohit-portfolio" : ""
module.exports = {
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  images: {
    unoptimized: true, // Required for static export
  },
}
```

---

### Issue 3: Internal Links Don't Work

**Symptoms:**
- Clicking "View Projects" doesn't scroll/navigate
- Browser shows 404 for internal links
- Navigation bar doesn't work

**Check:**
```javascript
// Your current approach (client-side scroll) - CORRECT
<button onClick={() => {
  document.querySelector("#projects").scrollIntoView()
}}>
  View Projects
</button>

// Manual links (WRONG - no basePath):
<a href="/projects">Projects</a>

// Correct Next.js approach:
import Link from 'next/link'
<Link href="/projects">Projects</Link>
```

**Your Setup:** You're using anchor links (`#id`) with client-side scrolling, which is **correct** and doesn't require basePath handling.

---

### Issue 4: Images Not Displaying

**Symptoms:**
- Broken image placeholders
- No visual gallery content
- Image alt text showing instead

**Check Image Paths:**
```html
<!-- In public folder (correct) -->
<img src="/gallery-image.jpg" alt="..." />

<!-- With basePath, this becomes: -->
<!-- /rohit-portfolio/gallery-image.jpg -->

<!-- Next.js handles this automatically -->
<Image src="/gallery-image.jpg" alt="..." />
```

**Solution:**
```jsx
// Option 1: Use Next.js Image component (recommended)
import Image from 'next/image'
<Image src="/image.jpg" alt="Description" width={400} height={300} />

// Option 2: Use regular img with basePath
import { useRouter } from 'next/navigation'
export function MyComponent() {
  const router = useRouter()
  const basePath = router.basePath
  return <img src={`${basePath}/image.jpg`} alt="..." />
}

// Option 3: In public folder (works automatically)
<img src="/image.jpg" alt="..." />
```

---

### Issue 5: Build Succeeds Locally but Fails on GitHub Actions

**Symptoms:**
- Local build works: `NODE_ENV=production npm run build`
- GitHub Actions workflow fails
- Error: "Cannot find module" or "Type errors"

**Check Workflow:**
```yaml
# .github/workflows/deploy.yml
- name: Install dependencies
  run: npm ci

- name: Build
  run: npm run build
  env:
    NODE_ENV: production  # MUST be set!
```

**Debug Script:**
```bash
# Reproduce exact GitHub Actions environment locally
npm ci  # Use package-lock.json, not npm install
NODE_ENV=production npm run build
```

**Common Causes:**
1. Missing `NODE_ENV=production` in workflow
2. Node.js version mismatch
3. Stale `node_modules` - use `npm ci` instead of `npm install`
4. Type checking or linting errors being ignored

---

### Issue 6: Hydration Mismatch Warnings

**Symptoms:**
- Console warning: "Warning: Expected server HTML to contain..."
- Content flickers on page load
- Different content in dev and production

**Root Cause:**
```javascript
// Problem: Client renders different output than server
export function Hero() {
  const [count, setCount] = useState(Math.random())
  return <div>{count}</div> // Random on client != server!
}

// Solution: Check for client-side only rendering
export function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) return null // Don't render until hydrated
  
  return <div>{Math.random()}</div>
}
```

**Your Setup:** Shouldn't have this issue since you're using static data in components.

---

## Testing Production Build Locally

### Quick Test
```bash
# Build exactly like production
NODE_ENV=production npm run build

# Serve locally
npx http-server out -p 8080

# Visit: http://localhost:8080/rohit-portfolio/
```

### Full Verification
```bash
# Run the verification script
bash scripts/verify-build.sh

# Check output:
# ✓ All checks pass
# Total files: 150+
# Size: ~5-10MB
```

### Browser Testing Checklist
- [ ] Page loads without errors
- [ ] All styling applied (check for white/unstyled content)
- [ ] Images display correctly
- [ ] Click navigation buttons and scroll works
- [ ] Gallery loads and filters work
- [ ] Contact section visible
- [ ] No console errors (F12 → Console)
- [ ] No network 404s (F12 → Network)
- [ ] Mobile responsive (resize browser)

---

## Comparing Dev vs Production

### Side-by-Side Test
```bash
# Terminal 1: Development
npm run dev
# Visit: http://localhost:3000

# Terminal 2: Production
cd out && npx http-server -p 8081
# Visit: http://localhost:8081/rohit-portfolio/
```

### Visual Comparison Checklist
| Element | Dev | Production | Match |
|---------|-----|-----------|-------|
| Logo/Header | [ ] | [ ] | [ ] |
| Hero section | [ ] | [ ] | [ ] |
| Colors/Styling | [ ] | [ ] | [ ] |
| Images | [ ] | [ ] | [ ] |
| Navigation | [ ] | [ ] | [ ] |
| Footer | [ ] | [ ] | [ ] |
| Mobile view | [ ] | [ ] | [ ] |

---

## Advanced Debugging

### Check What basePath Is Applied
```bash
# Search build for basePath references
grep -r "basePath" out/ 2>/dev/null | head -5

# Check if it's in HTML
grep -o 'href="[^"]*"' out/index.html | head -10
```

### Inspect Asset Loading
```bash
# Start production server and check assets
npx http-server out -p 8080 &
sleep 2

# Test asset loading with curl
curl -I http://localhost:8080/rohit-portfolio/_next/static/css/*.css 2>/dev/null

# Should return 200, not 404
```

### Check Environment in Production
```javascript
// Add temporary debug in app/layout.tsx
console.log('[v0] NODE_ENV:', process.env.NODE_ENV)
console.log('[v0] basePath:', process.env.NEXT_PUBLIC_BASE_PATH)
console.log('[v0] Current URL:', typeof window !== 'undefined' ? window.location.href : 'SSR')
```

---

## Prevention Checklist

- [ ] Type checking enabled: `typescript.ignoreBuildErrors: false`
- [ ] Linting enabled: `eslint.ignoreDuringBuilds: false`
- [ ] No duplicate config files (only `next.config.js`)
- [ ] `basePath` and `assetPrefix` configured identically
- [ ] `NODE_ENV=production` in build script
- [ ] GitHub Actions sets `NODE_ENV` in workflow
- [ ] Tested local production build before deployment
- [ ] Verified all assets load in browser DevTools
- [ ] Compared dev and production visually
- [ ] Checked for console errors and warnings

---

## Getting Help

### Reproduce Issue Minimally
1. Clean build: `rm -rf .next out node_modules && npm install`
2. Build: `NODE_ENV=production npm run build`
3. Test locally: `npx http-server out -p 8080`
4. Document exact steps and error messages

### Gather Diagnostics
```bash
# Collect build information
echo "=== Build Info ==="
node -v
npm -v
grep '"next"' package.json

echo "=== Config ==="
cat next.config.js

echo "=== Build Output ==="
NODE_ENV=production npm run build 2>&1 | tail -20

echo "=== File Structure ==="
find out -type f | wc -l
ls -la out/ | head -20
```

---

## Reference

- [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Deployment](https://docs.github.com/en/pages/getting-started-with-github-pages)
- [Next.js basePath Configuration](https://nextjs.org/docs/app/api-reference/next-config-js/basePath)
