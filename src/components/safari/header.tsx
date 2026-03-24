'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore, useUser, useIsAdmin, useCanAccessBattery, useCanAccessFleet, useCanAccessAnalytics } from '@/stores/auth-store';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { 
  Zap, 
  Menu, 
  LogOut, 
  Bell,
  BarChart3,
  Users,
  MapPin,
  Shield,
  Recycle,
  Home,
  Crown,
  Star,
  LayoutDashboard
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onHome?: () => void;
}

export function Header({ activeTab, onTabChange, onHome }: HeaderProps) {
  const user = useUser();
  const isAdmin = useIsAdmin();
  const canAccessBattery = useCanAccessBattery();
  const canAccessFleet = useCanAccessFleet();
  const canAccessAnalytics = useCanAccessAnalytics();
  const logout = useAuthStore((state) => state.logout);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Charging Map', icon: MapPin },
  ];

  // Battery toolkit only for users with PREMIUM (or ADMIN)
  const premiumNavItems = canAccessBattery
    ? [{ id: 'battery', label: 'Battery Toolkit', icon: Recycle }]
    : [];

  // Fleet management for fleet managers and admins
  const fleetNavItems = canAccessFleet
    ? [{ id: 'fleet', label: 'Fleet Management', icon: Users }]
    : [];

  // Analytics nav item - visible to ADMIN and EMPLOYEE
  const analyticsNavItems = canAccessAnalytics
    ? [{ id: 'analytics', label: 'Analytics', icon: BarChart3 }]
    : [];

  // Admin-only items: Employee Approval, User Management
  const adminNavItems = isAdmin ? [
    { id: 'employees', label: 'Employees', icon: Shield },
    { id: 'users', label: 'Users', icon: Users },
  ] : [];

  const handleNavClick = (tab: string) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  const getSubscriptionBadge = () => {
    if (!user) return null;
    switch (user.subscriptionPlan) {
      case 'ENTERPRISE':
        return (
          <Badge className="gap-1.5 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 font-semibold">
            <Crown className="h-3 w-3" />
            Enterprise
          </Badge>
        );
      case 'PREMIUM':
        return (
          <Badge className="gap-1.5 text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 font-semibold">
            <Star className="h-3 w-3" />
            Premium
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs border-[#8EB69B] text-[#235347]">
            Free
          </Badge>
        );
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="w-full max-w-[1600px] mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <button 
            onClick={() => onHome?.() || handleNavClick('dashboard')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#235347] to-[#052659] shadow-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-[#235347] to-[#052659] bg-clip-text text-transparent">SafariCharge</span>
              <span className="text-[10px] text-[#8EB69B] -mt-1 hidden sm:block">POWERING AFRICA</span>
            </div>
          </button>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="hidden md:flex items-center gap-1"
        >
          {/* Home Button */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavClick('dashboard')}
              className={`gap-2 transition-all ${
                activeTab === 'dashboard' 
                  ? 'bg-gradient-to-r from-[#235347] to-[#052659] text-white shadow-md' 
                  : 'text-gray-600 hover:text-[#235347] hover:bg-[#f0f7f5]'
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="hidden lg:inline">Home</span>
            </Button>
          </motion.div>

          {navItems.filter(item => item.id !== 'dashboard').map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Button
                variant={activeTab === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavClick(item.id)}
                className={`gap-2 transition-all ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-[#235347] to-[#052659] text-white shadow-md' 
                    : 'text-gray-600 hover:text-[#235347] hover:bg-[#f0f7f5]'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </motion.div>
          ))}
          
          {/* Premium Features */}
          {premiumNavItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
            >
              <Button
                variant={activeTab === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavClick(item.id)}
                className={`gap-2 transition-all ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-[#052659] to-[#141E30] text-white shadow-md' 
                    : 'text-gray-600 hover:text-[#052659] hover:bg-[#f0f7f5]'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] px-1.5 py-0 border-0 font-semibold">
                  PRO
                </Badge>
              </Button>
            </motion.div>
          ))}
          
          {/* Fleet Management */}
          {fleetNavItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + index * 0.05 }}
            >
              <Button
                variant={activeTab === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavClick(item.id)}
                className={`gap-2 transition-all ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-[#235347] to-[#8EB69B] text-white shadow-md' 
                    : 'text-gray-600 hover:text-[#235347] hover:bg-[#f0f7f5]'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                <Badge className="bg-gradient-to-r from-[#8EB69B] to-[#235347] text-white text-[10px] px-1.5 py-0 border-0 font-semibold">
                  FLEET
                </Badge>
              </Button>
            </motion.div>
          ))}
          
          {/* Analytics - visible to ADMIN and EMPLOYEE */}
          {analyticsNavItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <Button
                variant={activeTab === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavClick(item.id)}
                className={`gap-2 transition-all ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-[#5483B3] to-[#7DA0CA] text-white shadow-md' 
                    : 'text-gray-600 hover:text-[#5483B3] hover:bg-[#f0f7f5]'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </motion.div>
          ))}
          
          {/* Admin-only section */}
          {isAdmin && (
            <>
              <div className="w-px h-6 bg-gray-200 mx-2" />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="gap-1.5 text-xs border-[#5483B3]/30 text-[#052659] bg-[#5483B3]/10 font-medium">
                  <Shield className="h-3 w-3" />
                  Admin
                </Badge>
              </motion.div>
              {adminNavItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                >
                  <Button
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleNavClick(item.id)}
                    className={`gap-2 transition-all ${
                      activeTab === item.id 
                        ? 'bg-gradient-to-r from-[#5483B3] to-[#7DA0CA] text-white shadow-md' 
                        : 'text-gray-600 hover:text-[#5483B3] hover:bg-[#f0f7f5]'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </>
          )}
        </motion.nav>

        {/* Right side actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          {/* Battery Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#f0f7f5] to-[#e8f4f0] border border-[#8EB69B]/30">
            <div className="relative">
              <div className="w-4 h-2.5 rounded-sm border border-[#235347] relative">
                <div className="absolute inset-0.5 bg-gradient-to-r from-[#8EB69B] to-[#235347] rounded-sm" style={{ width: '95%' }} />
              </div>
              <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-[#235347] rounded-r-sm" />
            </div>
            <span className="text-xs font-semibold bg-gradient-to-r from-[#235347] to-[#052659] bg-clip-text text-transparent">98% Online</span>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover:bg-[#f0f7f5] text-gray-600 hover:text-[#235347]">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-[#8EB69B] to-[#235347] text-[10px] font-semibold text-white flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:ring-2 hover:ring-[#8EB69B]/30 transition-all">
                <Avatar className="h-9 w-9 ring-2 ring-[#8EB69B]/30">
                  <AvatarImage src={user?.avatar || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-[#235347] to-[#052659] text-white font-medium">
                    {user?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white border border-gray-100" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs leading-none text-gray-500">{user?.email}</p>
                  <div className="mt-1.5">
                    {getSubscriptionBadge()}
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-100" />
              <DropdownMenuItem
                onClick={() => void logout()}
                className="text-red-500 cursor-pointer focus:bg-red-50 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-white border-l border-gray-100">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-gray-900">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#235347] to-[#052659]">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  SafariCharge
                </SheetTitle>
                <SheetDescription className="text-gray-500">
                  Navigate the charging network
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-2">
                {/* Home Button */}
                <Button
                  variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                  className={`justify-start gap-3 h-11 ${
                    activeTab === 'dashboard' 
                      ? 'bg-gradient-to-r from-[#235347] to-[#052659] text-white' 
                      : 'text-gray-600 hover:text-[#235347] hover:bg-[#f0f7f5]'
                  }`}
                  onClick={() => handleNavClick('dashboard')}
                >
                  <Home className="h-5 w-5" />
                  Home
                </Button>

                {navItems.filter(item => item.id !== 'dashboard').map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className={`justify-start gap-3 h-11 ${
                      activeTab === item.id 
                        ? 'bg-gradient-to-r from-[#235347] to-[#052659] text-white' 
                        : 'text-gray-600 hover:text-[#235347] hover:bg-[#f0f7f5]'
                    }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                ))}
                
                {/* Premium Features */}
                {premiumNavItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className={`justify-start gap-3 h-11 ${
                      activeTab === item.id 
                        ? 'bg-gradient-to-r from-[#052659] to-[#141E30] text-white' 
                        : 'text-gray-600 hover:text-[#052659] hover:bg-[#f0f7f5]'
                    }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] px-1.5 py-0 border-0 ml-auto font-semibold">
                      PRO
                    </Badge>
                  </Button>
                ))}
                
                {/* Fleet Management */}
                {fleetNavItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className={`justify-start gap-3 h-11 ${
                      activeTab === item.id 
                        ? 'bg-gradient-to-r from-[#235347] to-[#8EB69B] text-white' 
                        : 'text-gray-600 hover:text-[#235347] hover:bg-[#f0f7f5]'
                    }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                    <Badge className="bg-gradient-to-r from-[#8EB69B] to-[#235347] text-white text-[10px] px-1.5 py-0 border-0 ml-auto font-semibold">
                      FLEET
                    </Badge>
                  </Button>
                ))}
                
                {/* Analytics - visible to ADMIN and EMPLOYEE */}
                {analyticsNavItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className={`justify-start gap-3 h-11 ${
                      activeTab === item.id 
                        ? 'bg-gradient-to-r from-[#5483B3] to-[#7DA0CA] text-white' 
                        : 'text-gray-600 hover:text-[#5483B3] hover:bg-[#f0f7f5]'
                    }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                ))}
                
                {/* Admin-only section */}
                {isAdmin && (
                  <>
                    <div className="h-px bg-gray-100 my-2" />
                    <p className="text-xs font-medium text-gray-400 px-3">Admin Tools</p>
                    {adminNavItems.map((item) => (
                      <Button
                        key={item.id}
                        variant={activeTab === item.id ? 'default' : 'ghost'}
                        className={`justify-start gap-3 h-11 ${
                          activeTab === item.id 
                            ? 'bg-gradient-to-r from-[#5483B3] to-[#7DA0CA] text-white' 
                            : 'text-gray-600 hover:text-[#5483B3] hover:bg-[#f0f7f5]'
                        }`}
                        onClick={() => handleNavClick(item.id)}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Button>
                    ))}
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </div>
    </header>
  );
}
