# Contact Form Email Setup - Web3Forms

## Steps to Get Your Access Key

1. **Visit Web3Forms**
   - Go to [https://web3forms.com](https://web3forms.com)

2. **Create Free Account**
   - Click "Get Started" or "Create Access Key"
   - Enter your email: `sankarirohitsurya@gmail.com`
   - Verify your email address

3. **Get Your Access Key**
   - Once verified, you'll receive an **Access Key**
   - Copy this key

4. **Add Key to Contact Form**
   - Open `d:\portfolio\components\contact.tsx`
   - Find line with: `formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY")`
   - Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual key

## Example

```typescript
formData.append("access_key", "abc123-your-actual-key-here-xyz789")
```

## Features Now Working

✅ Form submissions send email directly to your inbox
✅ Success/error messages displayed to users
✅ Form resets after successful submission
✅ Loading state while sending
✅ Spam protection with honeypot field
✅ Works on static sites (no backend needed)

## Alternative: Using Environment Variable (Recommended for Production)

1. Create `.env.local` file in root:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here
   ```

2. Update contact.tsx to use:
   ```typescript
   formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "")
   ```

3. Add `.env.local` to `.gitignore` (should already be there)

This keeps your key secure and not committed to GitHub.
