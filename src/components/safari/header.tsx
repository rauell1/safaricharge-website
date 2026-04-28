'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
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
  LayoutDashboard,
  Sun,
  Moon,
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onHome?: () => void;
}

// ── Theme Toggle Button ──────────────────────────────────────
function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render a placeholder to avoid layout shift
    return <div className="w-9 h-9" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="theme-toggle"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 30, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </motion.div>
    </motion.button>
  );
}

// ── Header Component ─────────────────────────────────────────
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

  const premiumNavItems = canAccessBattery
    ? [{ id: 'battery', label: 'Battery Toolkit', icon: Recycle }]
    : [];

  const fleetNavItems = canAccessFleet
    ? [{ id: 'fleet', label: 'Fleet Management', icon: Users }]
    : [];

  const analyticsNavItems = canAccessAnalytics
    ? [{ id: 'analytics', label: 'Analytics', icon: BarChart3 }]
    : [];

  const adminNavItems = isAdmin ? [
    { id: 'employees', label: 'Employees', icon: Shield },
    { id: 'users', label: 'Users', icon: Users },
  ] : [];

  const handleNavClick = (tab: string) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  const activeClass = 'bg-gradient-to-r from-[#235347] to-[#052659] text-white shadow-md';
  const inactiveClass = 'text-[var(--nav-text)] hover:text-[var(--nav-text-hover)] hover:bg-[var(--nav-bg-hover)]';

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
          <Badge variant="outline" className="text-xs border-[#8EB69B] text-[var(--primary)]">
            Free
          </Badge>
        );
    }
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-[var(--header-bg)]"
      style={{
        borderColor: 'var(--header-border)',
        backgroundColor: 'var(--header-bg)',
      }}
    >
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
              <span className="text-lg font-bold bg-gradient-to-r from-[#235347] to-[#052659] bg-clip-text text-transparent dark:from-[#8EB69B] dark:to-[#DAF1DE]">
                SafariCharge
              </span>
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
          {/* Home */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavClick('dashboard')}
              className={`gap-2 transition-all ${activeTab === 'dashboard' ? activeClass : inactiveClass}`}
            >
              <Home className="h-4 w-4" />
              <span className="hidden lg:inline">Home</span>
            </Button>
          </motion.div>

          {navItems.filter(item => item.id !== 'dashboard').map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }}>
              <Button
                variant={activeTab === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavClick(item.id)}
                className={`gap-2 transition-all ${activeTab === item.id ? activeClass : inactiveClass}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </motion.div>
          ))}

          {/* Premium */}
          {premiumNavItems.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + index * 0.05 }}>
              <Button
                variant={activeTab === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavClick(item.id)}
                className={`gap-2 transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-[#052659] to-[#141E30] text-white shadow-md'
                    : inactiveClass
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

          {/* Fleet */}
          {fleetNavItems.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + index * 0.05 }}>
              <Button
                variant={activeTab === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavClick(item.id)}
                className={`gap-2 transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-[#235347] to-[#8EB69B] text-white shadow-md'
                    : inactiveClass
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

          {/* Analytics */}
          {analyticsNavItems.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.05 }}>
              <Button
                variant={activeTab === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavClick(item.id)}
                className={`gap-2 transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-[#5483B3] to-[#7DA0CA] text-white shadow-md'
                    : inactiveClass
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </motion.div>
          ))}

          {/* Admin */}
          {isAdmin && (
            <>
              <div className="w-px h-6 bg-border mx-2" />
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                <Badge className="gap-1.5 text-xs border-[#5483B3]/30 text-[#052659] dark:text-[#8EB69B] bg-[#5483B3]/10 font-medium">
                  <Shield className="h-3 w-3" />
                  Admin
                </Badge>
              </motion.div>
              {adminNavItems.map((item, index) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + index * 0.05 }}>
                  <Button
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleNavClick(item.id)}
                    className={`gap-2 transition-all ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-[#5483B3] to-[#7DA0CA] text-white shadow-md'
                        : inactiveClass
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

        {/* Right Side Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          {/* Network status pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-[#8EB69B]/30">
            <div className="relative">
              <div className="w-4 h-2.5 rounded-sm border border-[#235347] dark:border-[#8EB69B] relative">
                <div className="absolute inset-0.5 bg-gradient-to-r from-[#8EB69B] to-[#235347] rounded-sm" style={{ width: '95%' }} />
              </div>
              <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-[#235347] dark:bg-[#8EB69B] rounded-r-sm" />
            </div>
            <span className="text-xs font-semibold text-[var(--primary)]">98% Online</span>
          </div>

          {/* Dark/Light Mode Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-[var(--nav-bg-hover)] text-[var(--nav-text)] hover:text-[var(--nav-text-hover)]"
          >
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
            <DropdownMenuContent className="w-56 bg-card border-border" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-card-foreground">{user?.name || 'User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  <div className="mt-1.5">{getSubscriptionBadge()}</div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                onClick={() => void logout()}
                className="text-destructive cursor-pointer focus:bg-destructive/10 focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-[var(--nav-text)]">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-card border-l border-border">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-card-foreground">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#235347] to-[#052659]">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  SafariCharge
                </SheetTitle>
                <SheetDescription className="text-muted-foreground">
                  Navigate the charging network
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-2">
                <Button
                  variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                  className={`justify-start gap-3 h-11 ${activeTab === 'dashboard' ? activeClass : inactiveClass}`}
                  onClick={() => handleNavClick('dashboard')}
                >
                  <Home className="h-5 w-5" />
                  Home
                </Button>

                {navItems.filter(item => item.id !== 'dashboard').map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className={`justify-start gap-3 h-11 ${activeTab === item.id ? activeClass : inactiveClass}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                ))}

                {premiumNavItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className={`justify-start gap-3 h-11 ${
                      activeTab === item.id ? 'bg-gradient-to-r from-[#052659] to-[#141E30] text-white' : inactiveClass
                    }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] px-1.5 py-0 border-0 ml-auto font-semibold">PRO</Badge>
                  </Button>
                ))}

                {fleetNavItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className={`justify-start gap-3 h-11 ${
                      activeTab === item.id ? 'bg-gradient-to-r from-[#235347] to-[#8EB69B] text-white' : inactiveClass
                    }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                    <Badge className="bg-gradient-to-r from-[#8EB69B] to-[#235347] text-white text-[10px] px-1.5 py-0 border-0 ml-auto font-semibold">FLEET</Badge>
                  </Button>
                ))}

                {analyticsNavItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className={`justify-start gap-3 h-11 ${
                      activeTab === item.id ? 'bg-gradient-to-r from-[#5483B3] to-[#7DA0CA] text-white' : inactiveClass
                    }`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                ))}

                {isAdmin && (
                  <>
                    <div className="h-px bg-border my-2" />
                    <p className="text-xs font-medium text-muted-foreground px-3">Admin Tools</p>
                    {adminNavItems.map((item) => (
                      <Button
                        key={item.id}
                        variant={activeTab === item.id ? 'default' : 'ghost'}
                        className={`justify-start gap-3 h-11 ${
                          activeTab === item.id ? 'bg-gradient-to-r from-[#5483B3] to-[#7DA0CA] text-white' : inactiveClass
                        }`}
                        onClick={() => handleNavClick(item.id)}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Button>
                    ))}
                  </>
                )}

                {/* Theme toggle in mobile menu */}
                <div className="h-px bg-border my-2" />
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </div>
    </header>
  );
}
