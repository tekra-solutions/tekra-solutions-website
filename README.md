# Tekra Solution Website

A professional, mobile-friendly static website for Tekra Solutions — an IT services company.

## Features
- **Responsive Design:** Looks great on mobile, tablet, and desktop.
- **Professional UI:** Clean layout with a modern color scheme suitable for IT services.
- **Fast Loading:** Minimal external dependencies (Google Fonts and FontAwesome CDN).
- **Accessibility:** Focus-visible outlines, semantic HTML, ARIA labels.
- **SEO Ready:** Open Graph meta tags, meta descriptions, and semantic structure.
- **8 Service Pages:** Dedicated pages for each service offering.
- **Contact Form:** Integrated with Formspree for easy form submissions.
- **Scroll-to-Top Button:** Appears on scroll for easy navigation.
- **404 Page:** Custom error page for missing routes.

## Project Structure

```
TekraSolution/
├── index.html                  # Main landing page
├── 404.html                    # Custom 404 error page
├── styles.css                  # All styles (responsive included)
├── script.js                   # Navigation, scroll, interactions
├── README.md                   # This file
├── images/                     # All image assets
│   ├── logo.png
│   ├── HomePage.jpg
│   ├── about-us.png
│   └── ... (service images)
└── services/                   # Individual service pages
    ├── cyber-security.html
    ├── geographic-information-systems.html
    ├── business-intelligence-systems.html
    ├── application-development.html
    ├── data-warehousing.html
    ├── administrative-support.html
    ├── program-project-management.html
    └── health-analytics.html
```

## How to Build & Run Locally

This is a **static website** (plain HTML/CSS/JS) — no build tools or compilers are needed. You have several options to run it:

### Option 1: Open Directly in Browser (Simplest)
```bash
# Just double-click index.html, or from terminal:
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

### Option 2: VS Code Live Server (Recommended for Development)
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code.
2. Open the project folder in VS Code.
3. Right-click `index.html` → **"Open with Live Server"**.
4. Your browser opens at `http://127.0.0.1:5500` with auto-reload on save.

### Option 3: Python HTTP Server
```bash
# Python 3
cd /path/to/TekraSolution
python3 -m http.server 8080

# Then open http://localhost:8080 in your browser
```

### Option 4: Node.js HTTP Server
```bash
# Install serve globally (one time)
npm install -g serve

# Run the server
cd /path/to/TekraSolution
serve .

# Then open http://localhost:3000 in your browser
```

## How to Edit
1. **Content:** Open `index.html` or files in `services/` to change text, images, and links.
2. **Styles:** Open `styles.css` to change colors, fonts, and layout.
3. **Behavior:** Open `script.js` to modify navigation, scrolling, or add features.
4. **Images:** Replace files in `images/` folder — keep the same filenames or update references.

## How to Enable SSL (HTTPS)

To get the "lock" icon and `https://` on your domain `tekrasolution.com`, you need an SSL certificate. This is handled by your hosting provider, not directly in the HTML code.

### Option 1: Using your current Hosting Provider (e.g., GoDaddy, Bluehost, Namecheap)
1. Log in to your hosting control panel (cPanel, Plesk, etc.).
2. Look for "SSL/TLS" or "Security" section.
3. Most providers offer a **Free AutoSSL** or **Let's Encrypt** certificate. Enable it for your domain.
4. Once enabled, you may need to force HTTPS. You can often do this in the hosting settings or by creating a `.htaccess` file in your root directory with the following code:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Option 2: Using Cloudflare (Free & Easy)
1. Create a free account at [Cloudflare.com](https://www.cloudflare.com/).
2. Add your site `tekrasolution.com`.
3. Change your domain's nameservers to the ones Cloudflare provides (you do this at your domain registrar).
4. Once active, go to the **SSL/TLS** tab in Cloudflare and set it to "Full" or "Flexible".
5. Cloudflare automatically provides HTTPS for your site.

### Option 3: Modern Static Hosting (Netlify, Vercel, GitHub Pages)
If you host this static site on platforms like Netlify or Vercel:
1. Upload these files.
2. Connect your custom domain.
3. They automatically provision a free SSL certificate for you.

## Mobile Friendliness
This site uses a "mobile-first" approach with CSS media queries.
- The navigation bar collapses into a "hamburger" menu on small screens.
- Grid layouts stack vertically on mobile devices.
- Font sizes adjust for readability.

## Deploying to Azure (Without GitHub)

Since you prefer not to use GitHub, here are the two best ways to host your site on Azure with SSL.

### Option 1: Azure Static Web Apps via VS Code (Recommended)
This is the easiest way to get Free SSL and hosting without using Git commands.

**Prerequisites:**
- [Azure Account](https://azure.microsoft.com/free/)
- [Azure Static Web Apps Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps) for VS Code.

**Steps:**
1.  **Install Extension:** Install the "Azure Static Web Apps" extension in VS Code.
2.  **Create App:**
    - Click the Azure icon in the VS Code sidebar.
    - Under "Static Web Apps", right-click your subscription and select **"Create Static Web App... (Advanced)"**.
    - **Name:** `tekrasolution-web`.
    - **Resource Group:** Create new (e.g., `rg-tekrasolution`).
    - **SKU:** Select **Free**.
    - **Region:** Select one near you.
    - **Build Preset:** Select **Custom**.
    - **App Location:** `/`
    - **Api Location:** Leave empty.
    - **Output Location:** Leave empty.
3.  **Deploy:**
    - Once created, right-click the new Static Web App in the sidebar and select **"Browse Site"** to see it live.
    - To update files later, right-click and select **"Upload to Azure Storage..."** (if using Storage) OR for Static Web Apps, use the **SWA CLI** or simply drag-and-drop if using the Portal (Preview features).
    *Note: The VS Code extension usually requires a git repo. If you strictly have NO git, use Option 2 below.*

### Option 2: Azure Storage + Azure CDN (Best for Manual Upload)
This method allows you to simply upload files via the browser or a tool like Azure Storage Explorer.

**Part 1: Host the Files**
1.  **Create Storage Account:**
    - Log in to [Azure Portal](https://portal.azure.com).
    - Create a resource > **Storage account**.
    - Name: `sttekrasolution` (must be unique).
    - Region: Near you.
    - Click **Review + create**.
2.  **Enable Static Website:**
    - Go to your new Storage Account.
    - In the left menu, find **Static website** (under Data management).
    - Click **Enabled**.
    - **Index document name:** `index.html`.
    - **Error document path:** `index.html`.
    - Click **Save**.
    - Copy the **Primary endpoint** URL (e.g., `https://sttekrasolution.z13.web.core.windows.net/`).
3.  **Upload Files:**
    - In the left menu, click **Containers**.
    - Click the **$web** container.
    - Click **Upload** and select your `index.html`, `styles.css`, and `script.js`.
    - Your site is now online at the Primary endpoint URL!

**Part 2: Add SSL (HTTPS) & Custom Domain**
To get `https://tekrasolution.com` instead of the long Azure URL:

1.  **Create CDN Profile:**
    - In the Azure Portal, search for **"Front Door and CDN profiles"**.
    - Create new > **Azure CDN Standard from Microsoft**.
    - **Endpoint name:** `tekrasolution`.
    - **Origin hostname:** Select your storage account static website URL from the dropdown.
2.  **Add Custom Domain:**
    - Go to your new CDN Endpoint.
    - Click **+ Custom domain**.
    - Enter `tekrasolution.com`.
    - You will need to add a **CNAME record** in your domain registrar (GoDaddy, Namecheap, etc.) pointing `tekrasolution.com` to your CDN endpoint (e.g., `tekrasolution.azureedge.net`).
3.  **Enable HTTPS:**
    - Click on your custom domain in the list.
    - Switch **Custom domain HTTPS** to **On**.
    - Select **CDN managed certificate**.
    - Click **Save**. Azure will automatically verify and secure your site (this can take a few hours).
