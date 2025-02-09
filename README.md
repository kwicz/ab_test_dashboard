# A/B Test Dashboard

_A Next.js A/B Test Management Dashboard for creating, updating, and tracking A/B tests. Features test filtering, local storage persistence, and Google Tag Manager (GTM) integration for event tracking. Built with Next.js, Tailwind CSS, and TypeScript._

## Core Features of the Dashboard

1. Create a new test with a name, description, and test variations (A & B).
2. View a list of tests with key details (status, start date, end date).
3. Manage test details (edit, pause, delete tests).
4. Integrate with GTM to dynamically inject scripts.

### Ways the dashboard can be enhanced and utilized

1. Tracking A/B Test Lifecycle Events
   Each time a test is created, updated, or deleted, GTM captures the event.
   This allows marketers, product managers, or analysts to track changes in real-time.

_🔍 Example Use Case:_ A Google Analytics 4 (GA4) event can be fired when an A/B test is created.
A custom tracking script can log test modifications for reporting.

2. Automating A/B Test Implementation
   GTM can inject tracking scripts into your test variations.
   This ensures correct tracking of user interactions with test elements.

_🔍 Example Use Case:_ A test is created → GTM triggers a Tag to inject tracking code into the site.
A test is deleted → GTM automatically removes tracking for that test.

3. Syncing with Marketing & Conversion Tracking
   Push test events to Facebook Pixel, Google Ads, or LinkedIn Ads.
   Allow marketing teams to segment audiences based on test participation.

_🔍 Example Use Case:_ When a test is created, GTM pushes ab_test_created to Google Ads for audience segmentation.

4. Debugging & QA in GTM Preview Mode
   GTM’s Preview Mode shows every test action in real-time.
   You can validate tracking is working correctly before deploying.

_🔍 Example Use Case:_ Open GTM Preview Mode, create a test, and check if dataLayer logs ab_test_created.

5. Custom Dashboard Integrations
   If you have a custom analytics dashboard, GTM can forward events to it.
   This allows you to track test performance without modifying your app’s code.

_🔍 Example Use Case:_ GTM forwards test updates to a Google BigQuery dataset for advanced analysis.

## Created with

- NextJS
- Typescript
- TailwindCSS
- Vercel
- Google Tag Manager

## Running the dashboard

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

[MIT](https://choosealicense.com/licenses/mit/)

Copyright (c) 2025 **_K Wicz_**
