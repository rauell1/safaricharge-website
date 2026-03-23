'use client';

import { useState, useSyncExternalStore } from 'react';
import { useAuthStore, useUser, useIsAdmin, useCanAccessBattery, useCanAccessFleet, useCanAccessAnalytics, useCanAccessUserManagement, useCanAccessEmployeeApproval } from '@/stores/auth-store';
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
import { mockStations } from '@/data/mock-data';
import { ChargingStation } from '@/types';
import { Zap } from 'lucide-react';

// Simple subscription for hydration check
const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

// Loading spinner component
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafcfc]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-[#8EB69B] border-t-[#235347] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="h-8 w-8 text-[#235347]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
            </svg>
          </div>
        </div>
        <p className="text-[#235347] font-medium">Loading SafariCharge...</p>
      </div>
    </div>
  );
}

export default function Home() {
  const isClient = useIsClient();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useUser();
  const isAdmin = useIsAdmin();
  const canAccessBattery = useCanAccessBattery();
  const canAccessFleet = useCanAccessFleet();
  const canAccessAnalytics = useCanAccessAnalytics();
  const canAccessUserManagement = useCanAccessUserManagement();
  const canAccessEmployeeApproval = useCanAccessEmployeeApproval();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return <LoadingSpinner />;
  }

  // Show login page if requested
  if (showLogin && !isAuthenticated) {
    return <Login onBack={() => setShowLogin(false)} />;
  }

  // Show landing page if not authenticated
  if (!isAuthenticated) {
    return (
      <Landing 
        onGetStarted={() => setShowLogin(true)} 
        onNavigate={(tab) => {
          // Non-authenticated users trying to access protected content
          if (tab === 'map' || tab === 'battery') {
            setShowLogin(true);
          }
        }}
      />
    );
  }

  const handleStationSelect = (station: ChargingStation) => {
    setSelectedStation(station);
  };

  const handleHome = () => {
    setActiveTab('dashboard');
  };

  // Check access permissions for protected tabs
  const checkAccess = (tab: string): boolean => {
    switch (tab) {
      case 'map':
        return true; // All authenticated users can access map
      case 'battery':
        return canAccessBattery; // ADMIN, EMPLOYEE, or PREMIUM users
      case 'fleet':
        return canAccessFleet; // ADMIN, EMPLOYEE, or FLEET_MANAGER
      case 'analytics':
        return canAccessAnalytics; // ADMIN and EMPLOYEE only
      case 'users':
        return canAccessUserManagement; // ADMIN only
      case 'employees':
        return canAccessEmployeeApproval; // ADMIN only
      default:
        return true;
    }
  };

  // Redirect if trying to access restricted tab
  if (!checkAccess(activeTab)) {
    setActiveTab('dashboard');
  }

  return (
    <CurrencyProvider>
    <div className="min-h-screen flex flex-col bg-[#fafcfc]">
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onHome={handleHome}
      />
      
      <main className="flex-1 w-full max-w-[1600px] mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <Dashboard 
            onNavigate={setActiveTab} 
            user={user}
          />
        )}

        {/* Charging Map */}
        {activeTab === 'map' && (
          <StationMap 
            stations={mockStations} 
            onStationSelect={handleStationSelect} 
          />
        )}

        {/* Charging History */}
        {activeTab === 'history' && (
          <ChargingHistory />
        )}

        {/* Battery Toolkit - Only for paid users */}
        {activeTab === 'battery' && canAccessBattery && (
          <BatteryRepurposing />
        )}

        {/* Fleet Dashboard - For Fleet Managers, Employees and Admins */}
        {activeTab === 'fleet' && canAccessFleet && (
          <FleetManagement user={user} />
        )}

        {/* AI Analytics - Admin and Employee only */}
        {activeTab === 'analytics' && canAccessAnalytics && (
          <AIAnalyticsDashboard />
        )}

        {/* User Management - Admin only */}
        {activeTab === 'users' && isAdmin && (
          <AdminUserManagement />
        )}

        {/* Employee Approval - Admin only */}
        {activeTab === 'employees' && isAdmin && (
          <EmployeeApprovalDashboard />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white text-gray-600 mt-auto">
        <div className="w-full max-w-[1600px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-gray-900 text-sm font-semibold uppercase mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('map')} className="hover:text-[#235347] transition-colors text-sm">Charging Map</button></li>
                <li><button onClick={() => canAccessBattery && setActiveTab('battery')} className="hover:text-[#235347] transition-colors text-sm">Battery Toolkit</button></li>
                <li><button onClick={() => canAccessFleet && setActiveTab('fleet')} className="hover:text-[#235347] transition-colors text-sm">Fleet Management</button></li>
                <li><button onClick={() => canAccessAnalytics && setActiveTab('analytics')} className="hover:text-[#235347] transition-colors text-sm">Data Intelligence</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 text-sm font-semibold uppercase mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#235347] transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="hover:text-[#235347] transition-colors text-sm">Our Mission</a></li>
                <li><a href="#" className="hover:text-[#235347] transition-colors text-sm">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 text-sm font-semibold uppercase mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#235347] transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="hover:text-[#235347] transition-colors text-sm">Partner Program</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 text-sm font-semibold uppercase mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span>📧</span> info@safaricharge.co.ke
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span> +254 700 000 000
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#235347] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">SafariCharge</span>
            </div>
            <p className="text-sm text-gray-500">© 2025 SafariCharge. All rights reserved. Powering Africa's Electric Future.</p>
          </div>
        </div>
      </footer>
    </div>
    </CurrencyProvider>
  );
}
