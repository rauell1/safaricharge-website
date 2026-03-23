import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserRole = 'DRIVER' | 'ADMIN' | 'FLEET_MANAGER' | 'EMPLOYEE';
export type SubscriptionPlan = 'FREE' | 'BASIC' | 'PREMIUM' | 'ENTERPRISE';

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  avatar: string | null;
  phone: string | null;
  subscriptionPlan: SubscriptionPlan;
  subscriptionExpiry: string | null;
  hasPaidAccess: boolean;
  accessPermissions: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: (user) => set({ 
        user, 
        isAuthenticated: true, 
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
      }),
      
      updateUser: (userData) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null
      })),
    }),
    {
      name: 'safaricharge-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Helper hooks
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useUserRole = () => useAuthStore((state) => state.user?.role);
export const useSubscriptionPlan = () => useAuthStore((state) => state.user?.subscriptionPlan);

// Check if user is admin (ADMIN only - for admin-only features like Employee Approval, User Management)
export const useIsAdmin = () => {
  const role = useUserRole();
  return role === 'ADMIN';
};

// Check if user has paid access
export const useHasPaidAccess = () => {
  const user = useUser();
  // ADMIN and EMPLOYEE always have paid access
  if (user?.role === 'ADMIN' || user?.role === 'EMPLOYEE') return true;
  return user?.hasPaidAccess || user?.subscriptionPlan === 'PREMIUM' || user?.subscriptionPlan === 'ENTERPRISE';
};

// Check if user can access battery toolkit
// ADMIN and EMPLOYEE: Always have access
// Others: Need PREMIUM subscription
export const useCanAccessBattery = () => {
  const user = useUser();
  // ADMIN and EMPLOYEE always have battery toolkit access
  if (user?.role === 'ADMIN' || user?.role === 'EMPLOYEE') return true;
  // Others need PREMIUM subscription
  return user?.subscriptionPlan === 'PREMIUM';
};

// Check if user can access analytics
// ADMIN and EMPLOYEE can access
// FLEET_MANAGER and DRIVER cannot
export const useCanAccessAnalytics = () => {
  const user = useUser();
  return user?.role === 'ADMIN' || user?.role === 'EMPLOYEE';
};

// Check if user is employee (for employee-specific views)
export const useIsEmployee = () => {
  const role = useUserRole();
  return role === 'EMPLOYEE';
};

// Check if user can access fleet management
// ADMIN and EMPLOYEE: Full access to view all fleets
// FLEET_MANAGER: Can manage their own fleet
export const useCanAccessFleet = () => {
  const user = useUser();
  return user?.role === 'ADMIN' || user?.role === 'FLEET_MANAGER' || user?.role === 'EMPLOYEE';
};

// Check if user can access user management - ADMIN only
export const useCanAccessUserManagement = () => {
  const user = useUser();
  return user?.role === 'ADMIN';
};

// Check if user can access employee approval - ADMIN only
export const useCanAccessEmployeeApproval = () => {
  const user = useUser();
  return user?.role === 'ADMIN';
};

// Check if user is a fleet manager (owns a fleet)
export const useIsFleetManager = () => {
  const role = useUserRole();
  return role === 'FLEET_MANAGER';
};

// Check if user can manage their own fleet (FLEET_MANAGER only)
export const useCanManageFleet = () => {
  const role = useUserRole();
  return role === 'FLEET_MANAGER';
};

// Check if user can view all fleets (admin/employee view)
export const useCanViewAllFleets = () => {
  const user = useUser();
  return user?.role === 'ADMIN' || user?.role === 'EMPLOYEE';
};

// Mock user for demo purposes
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@safaricharge.co.ke',
    name: 'Admin User',
    role: 'ADMIN',
    avatar: null,
    phone: '+254 700 000 001',
    subscriptionPlan: 'ENTERPRISE',
    subscriptionExpiry: '2026-12-31',
    hasPaidAccess: true,
    accessPermissions: ['charging_map', 'battery_toolkit', 'analytics', 'user_management', 'fleet_management', 'employee_approval'],
  },
  {
    id: '2',
    email: 'driver@example.com',
    name: 'John Driver',
    role: 'DRIVER',
    avatar: null,
    phone: '+254 700 000 002',
    subscriptionPlan: 'FREE',
    subscriptionExpiry: null,
    hasPaidAccess: false,
    accessPermissions: ['charging_map'],
  },
  {
    id: '3',
    email: 'premium@example.com',
    name: 'Premium User',
    role: 'DRIVER',
    avatar: null,
    phone: '+254 700 000 003',
    subscriptionPlan: 'PREMIUM',
    subscriptionExpiry: '2025-12-31',
    hasPaidAccess: true,
    accessPermissions: ['charging_map', 'battery_toolkit'],
  },
  {
    id: '4',
    email: 'fleet@safaricharge.co.ke',
    name: 'Fleet Manager',
    role: 'FLEET_MANAGER',
    avatar: null,
    phone: '+254 700 000 004',
    subscriptionPlan: 'ENTERPRISE',
    subscriptionExpiry: '2026-06-30',
    hasPaidAccess: true,
    accessPermissions: ['charging_map', 'fleet_management'],
  },
  {
    id: '5',
    email: 'employee@safaricharge.co.ke',
    name: 'Employee User',
    role: 'EMPLOYEE',
    avatar: null,
    phone: '+254 700 000 005',
    subscriptionPlan: 'ENTERPRISE',
    subscriptionExpiry: '2026-12-31',
    hasPaidAccess: true,
    accessPermissions: ['charging_map', 'battery_toolkit', 'analytics', 'fleet_management'],
  },
];
