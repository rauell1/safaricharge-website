'use client';

/**
 * AuthGate — client component
 *
 * Owns ALL auth state, tab routing, and protected views.
 * Renders <Landing> directly when unauthenticated (no props needed from server).
 */

import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import Link from 'next/link';
import { CurrencyProvider } from '@/contexts/currency-context';
import { Header } from '@/components/safari/header';
import { Login } from '@/components/safari/login-form';
import { StationMap } from '@/components/safari/station-map';
import { ChargingHistory } from '@/components/safari/charging-history';
import { AIAnalyticsDashboard } from '@/components/safari/ai-analytics-dashboard';
import { AdminUserManagement } from '@/components/safari/admin-user-management';
import { EmployeeApprovalDashboard } from '@/components/safari/employee-approval-dashboard';
import { BatteryRepurposing } from '@/components/safari/battery-repurposing';
import { Landing } from '@/components/safari/landing';
import { Dashboard } from '@/components/safari/dashboard';
import { FleetManagement } from '@/components/safari/fleet-management';
import { EnergyTab } from '@/components/safari/energy-tab';
import { mockStations } from '@/data/mock-data';
import {
  useAuthStatus,
  useAuthStore,
  useCanAccessAnalytics,
  useCanAccessBattery,
  useCanAccessEmployeeApproval,
  useCanAccessFleet,
  useCanAccessUserManagement,
  useIsAdmin,
  useUser,
} from '@/stores/auth-store';

type AppTab =
  | 'dashboard'
  | 'map'
  | 'history'
  | 'battery'
  | 'fleet'
  | 'analytics'
  | 'users'
  | 'employees'
  | 'energy';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-[var(--chart-4)] border-t-[var(--primary)] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="h-8 w-8 text-[var(--primary)]" />
          </div>
        </div>
        <p className="font-medium text-[var(--primary)]">Loading SafariCharge...</p>
      </div>
    </div>
  );
}

function AppFooter({
  canAccessBattery,
  canAccessFleet,
  canAccessAnalytics,
  onTabChange,
}: {
  canAccessBattery: boolean;
  canAccessFleet: boolean;
  canAccessAnalytics: boolean;
  onTabChange: (tab: AppTab) => void;
}) {
  return (
    <footer className="border-t border-border bg-card text-muted-foreground mt-auto">
      <div className="w-full max-w-[1600px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Platform — tab buttons for authenticated users */}
          <div>
            <h3 className="text-card-foreground text-sm font-semibold uppercase mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onTabChange('map')}
                  className="hover:text-[var(--primary)] transition-colors text-sm"
                >
                  Charging Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('energy')}
                  className="hover:text-[var(--primary)] transition-colors text-sm"
                >
                  Energy & Solar
                </button>
              </li>
              <li>
                <button
                  onClick={() => canAccessBattery && onTabChange('battery')}
                  className="hover:text-[var(--primary)] transition-colors text-sm"
                >
                  Battery Toolkit
                </button>
              </li>
              <li>
                <button
                  onClick={() => canAccessFleet && onTabChange('fleet')}
                  className="hover:text-[var(--primary)] transition-colors text-sm"
                >
                  Fleet Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => canAccessAnalytics && onTabChange('analytics')}
                  className="hover:text-[var(--primary)] transition-colors text-sm"
                >
                  Data Intelligence
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-card-foreground text-sm font-semibold uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-[var(--primary)] transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--primary)] transition-colors text-sm">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--primary)] transition-colors text-sm">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-card-foreground text-sm font-semibold uppercase mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="hover:text-[var(--primary)] transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[var(--primary)] transition-colors text-sm">
                  Partner Program
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[var(--primary)] transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-[var(--primary)] transition-colors text-sm">
                  Find a Station
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-card-foreground text-sm font-semibold uppercase mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@safaricharge.co.ke" className="hover:text-[var(--primary)] transition-colors">
                  info@safaricharge.co.ke
                </a>
              </li>
              <li>
                <a href="tel:+254700000000" className="hover:text-[var(--primary)] transition-colors">
                  +254 700 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-card-foreground">SafariCharge</span>
          </div>
          <nav aria-label="Footer navigation" className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/about" className="hover:text-[var(--primary)] transition-colors">About</Link>
            <Link href="/features" className="hover:text-[var(--primary)] transition-colors">Features</Link>
            <Link href="/map" className="hover:text-[var(--primary)] transition-colors">Map</Link>
            <Link href="/blog" className="hover:text-[var(--primary)] transition-colors">Blog</Link>
          </nav>
          <p className="text-sm text-muted-foreground">© 2026 SafariCharge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/**
 * AuthGate — mounts on the client, checks auth, and renders:
 *   - null while mounting (prevents hydration mismatch)
 *   - <LoadingScreen> while auth initialises
 *   - <Landing> with interactive handlers when unauthenticated
 *   - <Login> overlay when the user clicks "Get Started"
 *   - Full authenticated app shell once logged in
 */
export function AuthGate() {
  const initializeAuth = useAuthStore((state) => state.initialize);
  const authStatus = useAuthStatus();
  const user = useUser();
  const isAdmin = useIsAdmin();
  const canAccessBattery = useCanAccessBattery();
  const canAccessFleet = useCanAccessFleet();
  const canAccessAnalytics = useCanAccessAnalytics();
  const canAccessUserManagement = useCanAccessUserManagement();
  const canAccessEmployeeApproval = useCanAccessEmployeeApproval();
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
  const [showLogin, setShowLogin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    void initializeAuth();
  }, [initializeAuth]);

  // Before client hydration, render nothing to avoid hydration mismatch.
  if (!mounted) return null;

  const isTabAllowed = (tab: AppTab) => {
    if (tab === 'dashboard' || tab === 'map' || tab === 'history' || tab === 'energy') return true;
    if (tab === 'battery') return canAccessBattery;
    if (tab === 'fleet') return canAccessFleet;
    if (tab === 'analytics') return canAccessAnalytics;
    if (tab === 'users') return canAccessUserManagement && isAdmin;
    if (tab === 'employees') return canAccessEmployeeApproval && isAdmin;
    return false;
  };

  const safeActiveTab = isTabAllowed(activeTab) ? activeTab : 'dashboard';

  const handleTabChange = (tab: AppTab) => {
    setActiveTab(isTabAllowed(tab) ? tab : 'dashboard');
  };

  if (authStatus === 'loading') {
    return <LoadingScreen />;
  }

  if (authStatus === 'unauthenticated') {
    if (showLogin) {
      return <Login onBack={() => setShowLogin(false)} />;
    }
    return (
      <Landing
        onGetStarted={() => setShowLogin(true)}
        onNavigate={(tab) => {
          if (tab === 'map' || tab === 'battery') setShowLogin(true);
        }}
      />
    );
  }

  return (
    <CurrencyProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header
          activeTab={safeActiveTab}
          onTabChange={(tab) => handleTabChange(tab as AppTab)}
          onHome={() => handleTabChange('dashboard')}
        />
        <main className="flex-1 w-full max-w-[1600px] mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {safeActiveTab === 'dashboard' && (
            <Dashboard onNavigate={(tab) => handleTabChange(tab as AppTab)} user={user} />
          )}
          {safeActiveTab === 'map' && (
            <StationMap stations={mockStations} onStationSelect={() => undefined} />
          )}
          {safeActiveTab === 'history' && <ChargingHistory />}
          {safeActiveTab === 'battery' && canAccessBattery && <BatteryRepurposing />}
          {safeActiveTab === 'fleet' && canAccessFleet && <FleetManagement user={user} />}
          {safeActiveTab === 'analytics' && canAccessAnalytics && <AIAnalyticsDashboard />}
          {safeActiveTab === 'users' && isAdmin && <AdminUserManagement />}
          {safeActiveTab === 'employees' && isAdmin && <EmployeeApprovalDashboard />}
          {safeActiveTab === 'energy' && <EnergyTab />}
        </main>
        <AppFooter
          canAccessBattery={canAccessBattery}
          canAccessFleet={canAccessFleet}
          canAccessAnalytics={canAccessAnalytics}
          onTabChange={handleTabChange}
        />
      </div>
    </CurrencyProvider>
  );
}
