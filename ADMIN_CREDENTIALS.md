# 🔐 Admin Access Credentials

## Your Personal Admin Account

**Email:** `mranshyadav74@gmail.com`  
**Password:** `SecureAdmin@2024!Mx`

---

## 🚀 How to Access Your CMS

1. **Open your portfolio website** in your browser

2. **Click the "Login" button** in the top-right corner of the header

3. **Enter your credentials:**
   - Email: `mranshyadav74@gmail.com`
   - Password: `SecureAdmin@2024!Mx`

4. **Click "Sign In"**

5. **Access the CMS Admin Panel:**
   - Click your profile icon in the top-right corner
   - Select "Admin Panel" from the dropdown
   - Or navigate directly to `/admin`

---

## 👤 Your Admin Privileges

As the admin, you have **full access** to all CMS features:

✅ **Content Management**
- Create, edit, and delete all content
- Publish, archive, or draft content
- Bulk operations (select multiple items)

✅ **Media Library**
- Upload new media files
- Delete media files
- Organize and manage all assets

✅ **Rich Text Editor**
- Full formatting toolbar
- Insert images, links, lists
- Code blocks and quotes
- Live preview (desktop & mobile)

✅ **Categories & Tags**
- Create and manage categories
- Create and manage tags
- Delete categories/tags

✅ **SEO Settings**
- Set meta titles
- Set meta descriptions
- Configure SEO for each post

✅ **Version Control**
- Track content history
- View all versions
- Restore previous versions

✅ **Dashboard Access**
- View statistics
- See recent content
- Monitor drafts and published items

---

## 🔒 Security Notes

⚠️ **IMPORTANT:** This is your personal admin account.

**Current Setup:**
- Single admin account (you)
- Credentials stored in code for demo purposes
- Using localStorage for session management

**For Production (Recommended Next Steps):**

1. **Backend Authentication:**
   - Implement real backend API
   - Hash passwords with bcrypt/argon2
   - Use JWT tokens or secure sessions

2. **Environment Variables:**
   - Move credentials to `.env` file
   - Never commit credentials to Git
   - Use environment-specific configs

3. **Additional Security:**
   - Enable 2FA (Two-Factor Authentication)
   - Add password reset functionality
   - Implement email verification
   - Add rate limiting for login attempts
   - Use HTTPS only in production

4. **Database:**
   - Store user data in a database (PostgreSQL, MongoDB, etc.)
   - Implement proper user roles and permissions
   - Add audit logs for admin actions

---

## 📝 Guest Accounts

Other users can sign up through the login modal:
- Click "Sign Up" on the login screen
- Fill in their details
- Default role: **Viewer** (read-only access)
- They can view content but cannot edit/delete

---

## 🆘 Troubleshooting

**If you can't log in:**
1. Double-check your email and password (case-sensitive)
2. Clear your browser's localStorage: `localStorage.clear()`
3. Refresh the page and try again
4. Check the browser console for error messages

**If you're locked out:**
- You can manually edit `/src/app/contexts/AuthContext.tsx`
- Update the `ADMIN_CREDENTIALS` object with a new password

**To change your password:**
1. Open `/src/app/contexts/AuthContext.tsx`
2. Find the `ADMIN_CREDENTIALS` object
3. Update the `password` field
4. Save the file

---

## 📞 Support

- Check browser console for errors
- Verify localStorage is enabled
- Ensure JavaScript is enabled
- Try incognito/private browsing mode

---

**Created:** January 2026  
**Account Owner:** Anshy Yadav  
**Access Level:** Full Admin  
**CMS Version:** 1.0.0
