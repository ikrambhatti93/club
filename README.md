# Strip Clubs Barcelona — Custom Laravel CMS & VIP Reservation System

A production-grade, responsive, SEO-optimized web application and custom CMS for Barcelona lawful adult-entertainment venues, VIP table bookings, stag party hospitality packages, and private nightlife concierge services.

Built strictly according to European hospitality standards, legal venue licensing compliance, and payment provider safety standards (zero storage of sensitive payment card data).

---

## 1. Technology Stack

* **Backend:** PHP 8.2+, Laravel 11.x, Eloquent ORM, MySQL/MariaDB
* **Architecture:** Clean MVC, Form Request Validation, Policies, Database Transactions, Adapter Pattern
* **Frontend:** Tailwind CSS v4, Blade / React SPA interactive components, Alpine.js compatible
* **Deployment Target:** Hostinger Shared / Cloud / VPS Hosting (zero Node.js dependency in production)
* **SEO & Compliance:** Structured Schema.org (`LocalBusiness`, `FAQPage`, `BreadcrumbList`), 18+ Age Gate verification, OpenGraph & Twitter cards.

---

## 2. Hostinger Step-by-Step Deployment Guide

Deploying from **GitHub** to **Hostinger Web / Cloud Hosting**:

### Step 1: Create MySQL Database in Hostinger
1. Log into your **Hostinger hPanel**.
2. Navigate to **Databases** → **Management**.
3. Create a new MySQL Database (e.g. `u123456789_bcnvip`) and user with a secure password.
4. Note the database name, username, and password.

### Step 2: Push Repository to GitHub & Configure SSH in Hostinger
1. Push your repository to your private or organization GitHub repository on branch `main`.
2. In Hostinger hPanel, go to **Advanced** → **Git**.
3. Add repository URL and set branch to `main`.
4. Alternatively, connect via SSH using PuTTY or Terminal:
   ```bash
   ssh u123456789@your-hostinger-ip -p 65002
   ```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env` in your project root:
```bash
cp .env.example .env
```
Edit `.env` using `nano .env` or Hostinger File Manager:
```env
APP_NAME="Strip Clubs Barcelona"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://stripclubsbcn.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=u123456789_bcnvip
DB_USERNAME=u123456789_admin
DB_PASSWORD="your_secure_password"

MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=465
MAIL_USERNAME=reservations@stripclubsbcn.com
MAIL_PASSWORD="your_email_password"
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS="reservations@stripclubsbcn.com"
```

### Step 4: Install PHP Dependencies
```bash
composer install --no-dev --optimize-autoloader
```

### Step 5: Generate Application Key
```bash
php artisan key:generate
```

### Step 6: Configure Document Root
In Hostinger hPanel:
1. Go to **Domains** or **Websites** → **Website Configuration**.
2. Set the public root directory to `public_html/public` (or create a symbolic link if using main root).
3. The `.htaccess` in `/public` routes all traffic safely through `index.php`.

### Step 7: Run Migrations and Seeders
```bash
php artisan migrate --force
php artisan db:seed --force
```

### Step 8: Create Storage Symlink
```bash
php artisan storage:link
```

### Step 9: Build Frontend Assets
During deployment or in CI/CD:
```bash
npm install
npm run build
```
*(The compiled assets in `public/build/` are served statically by Apache/LiteSpeed on Hostinger without needing Node.js in production).*

### Step 10: Configure Scheduled Cron Jobs
In Hostinger hPanel under **Advanced** → **Cron Jobs**:
* Command:
  ```bash
  * * * * * cd /home/u123456789/public_html && php artisan schedule:run >> /dev/null 2>&1
  ```

### Step 11: Configure SSL (HTTPS)
1. Go to **Security** → **SSL** in Hostinger hPanel.
2. Activate free Let's Encrypt Lifetime SSL for your domain and ensure "Force HTTPS" is toggled ON.

### Step 12: Production Performance Caching
Run these optimizations on your live server:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## 3. Database Schema Overview

* **Clubs & Venues:** `clubs`, `club_categories`, `club_features`, `club_images`
* **VIP Packages:** `packages`, `package_categories`, `package_options`
* **Reservations & Customers:** `customers`, `reservations`, `reservation_items`, `reservation_notes`
* **Payment Abstraction:** `payment_gateways`, `payments`, `coupons`
* **CMS & Content:** `pages`, `page_sections`, `banners`, `media`, `menus`, `menu_items`
* **Nightlife Content:** `blog_posts`, `testimonials`, `faqs`, `contact_messages`
* **Settings & Audit:** `settings`, `seo_metadata`, `activity_logs`, `translations`

---

## 4. Payment Provider Abstraction

Sensitive payment data (PAN/CVV) is **never** accepted or stored on application servers.
The system implements `PaymentGatewayInterface`:
* `createPayment(Reservation $reservation, array $options)`
* `verifyPayment(string $providerPaymentId)`
* `refundPayment(Payment $payment, float $amount)`
* `handleWebhook(array $payload, string $signatureHeader)`

Adapters are provided for **Stripe**, **Redsys (Spanish Merchant Terminal)**, **Bank Wire**, and **On-Arrival VIP Concierge Settlement**.

---

## 5. Security & Legal Notice

This application strictly facilitates lawful VIP table bookings, limousine transport, event planning, and hospitality venue arrangements for licensed adult entertainment establishments in Barcelona, Spain. It strictly prohibits illegal transactions, prostitution, or sexual solicitation in compliance with Spanish laws and international payment network rules.
