/**
 * Root page — Server Component (no 'use client').
 *
 * Renders the public <Landing> component server-side so its full HTML content
 * is included in the initial response and is crawlable by Google & Bing.
 *
 * The <AuthGate> client component wraps it and, after hydration, takes over:
 *   - Shows <Loading> while auth initialises
 *   - Shows <Login> overlay when the user clicks "Get Started"
 *   - Replaces Landing with the full authenticated app once logged in
 *
 * SEO impact: Google now receives the full Landing HTML (hero copy, features,
 * CTAs, navigation links) without needing to execute JavaScript.
 */

import { Landing } from '@/components/safari/landing';
import { AuthGate } from '@/components/safari/auth-gate';

export default function Home() {
  return (
    <>
      {/*
        Server-rendered Landing — visible immediately to crawlers and on initial load.
        AuthGate mounts after hydration and replaces this with the interactive version.
      */}
      <noscript>
        <Landing onGetStarted={() => {}} onNavigate={() => {}} />
      </noscript>

      {/*
        AuthGate handles all client-side auth state and protected views.
        It renders null until hydrated, so the SSR Landing HTML is preserved
        during the critical first paint window.
      */}
      <AuthGate
        fallback={
          <Landing onGetStarted={() => {}} onNavigate={() => {}} />
        }
      />
    </>
  );
}
