# Quick Test Guide: Image Management CMS

## 🎯 How to Test in 5 Minutes

### Step 1: Access the CMS
1. Open your browser
2. Navigate to: `http://localhost:5173/admin` (or your dev URL)
3. Login with credentials: 
   - Email: `mranshyadav74@gmail.com`
   - Password: `SecureAdmin@2024!Mx`

### Step 2: Open Website Content Manager
1. On the dashboard, find the **large gradient card** labeled:
   - 🌐 "Website Content Manager"
   - "Edit all website content - text, images, and sections"
2. Click the card

### Step 3: Test Image Fields
You should now see the Website Content Manager with a sidebar showing:
- 🏠 Home Page
- 👤 About Page  
- ⚙️ Process Page
- 💼 Services Page
- 📧 Contact Page
- 💼 Work Page
- 📄 Footer
- ⚙️ Site Settings

#### Test Home Page Images:
1. Click **🏠 Home Page** in the sidebar (should be selected by default)
2. Scroll down to the **"Hero Images"** section
3. You'll see 3 image fields with default Unsplash URLs:
   - **Hero Background Image**
   - **Profile Image**  
   - **Decorative Image**

#### Test Image Preview:
1. Find any image field with a URL
2. Click the **"Preview"** button next to the URL input
3. ✅ **Expected**: Image appears below the input field
4. Click **"Hide"** to collapse the preview
5. ✅ **Expected**: Image preview disappears

#### Test Image URL Editing:
1. Click in any image URL field
2. Change the URL (or paste a new Unsplash URL like):
   ```
   https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1920&h=1080&fit=crop
   ```
3. Click **"Preview"** to verify the new image loads
4. ✅ **Expected**: New image appears in preview

### Step 4: Test Data Persistence
1. Make a change to any image URL
2. The **"Save Changes"** button should turn blue/accent color
3. Click **"Save Changes"**
4. ✅ **Expected**: Toast notification: "Content saved successfully!"
5. Refresh the page (F5 or Cmd+R)
6. ✅ **Expected**: Your changes are still there!

### Step 5: Test Other Sections

#### About Page:
1. Click **👤 About Page** in sidebar
2. Find **"About Page Images"** section
3. Test both:
   - Main Profile Image
   - Hero Background Image

#### Contact Page:
1. Click **📧 Contact Page**
2. Find **"Contact Page Images"** section
3. Test all 3 fields:
   - Hero Background Image
   - Decorative Image
   - Contact Image

#### Work Page:
1. Click **💼 Work Page**
2. Find **"Work Page Images"** section
3. Test both fields

#### Site Settings (Most Important):
1. Click **⚙️ Site Settings**
2. Find **"Brand & Logo Images"** section with 4 fields:
   - Primary Logo
   - Light Mode Logo
   - Dark Mode Logo
   - Mobile Logo
3. Find **"SEO & Social Media Images"** section with 2 fields:
   - Favicon
   - Open Graph Image

### Step 6: Check Browser Console (Optional)
1. Open DevTools (F12 or Right-click → Inspect)
2. Go to **Console** tab
3. Look for: `Website Content Structure: { hasHomeHeroImages: true, ... }`
4. When you edit an image, you should see:
   ```
   Updating content: { path: "home.hero.images.heroBackground", value: "https://..." }
   ```

### Step 7: Verify localStorage (Optional)
1. In DevTools, go to **Application** tab
2. In the left sidebar, expand **Local Storage**
3. Click your domain
4. Find key: `website_content`
5. Click to view the JSON
6. ✅ **Expected**: You can see all your image URLs stored

---

## ✅ Success Criteria

If all these work, the system is **FULLY FUNCTIONAL**:

- [ ] Can access Website Content Manager
- [ ] Can see all 8 sections in sidebar
- [ ] Image fields appear in each section
- [ ] Preview button shows/hides images
- [ ] Can edit image URLs
- [ ] Changes trigger "unsaved" state
- [ ] Save button works
- [ ] Data persists after page refresh
- [ ] No console errors
- [ ] All default images load correctly

---

## 🐛 Common Issues & Solutions

### Issue: "Preview" shows "Image not found"
**Solution**: The URL might be invalid. Try a known-good Unsplash URL.

### Issue: Changes don't persist after refresh
**Solution**: Check if localStorage is enabled in your browser.

### Issue: Can't see image fields
**Solution**: Make sure you clicked the correct section in the sidebar.

### Issue: Console shows errors about undefined
**Solution**: Click "Reset to Defaults" button to restore the default content structure.

---

## 🎨 Test Image URLs

Use these working Unsplash URLs for testing:

```
# Professional headshot
https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop

# Abstract background
https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&h=1080&fit=crop

# Workspace/tech
https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=800&fit=crop

# Minimalist design
https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop

# Hero background
https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1920&h=600&fit=crop
```

---

**Total Test Time**: ~5 minutes  
**Complexity**: Beginner-friendly  
**Status**: Ready to test!
