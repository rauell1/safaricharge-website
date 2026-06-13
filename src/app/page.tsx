/**
 * Root page — Server Component (no 'use client').
 *
 * Renders <AuthGate> which is a Client Component that owns all auth state
 * and renders <Landing> internally when unauthenticated.
 *
 * SEO: AuthGate returns null before hydration, so Next.js SSGs the page
 * with the Landing HTML from AuthGate's own render path (client-side),
 * but more importantly Google receives the full HTML via JavaScript execution.
 */

import { AuthGate } from '@/components/safari/auth-gate';

export default function Home() {
  return <AuthGate />;
}
