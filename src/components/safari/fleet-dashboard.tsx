'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCurrency, CurrencyToggle } from '@/contexts/currency-context';
import {
  Car,
  MapPin,
  Battery,
  DollarSign,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Route,
  Users,
  Shield,
  Wrench,
  FileText,
  Zap,
  Gauge,
  Calendar,
  Bell,
  Eye,
  Plus,
  BarChart3,
  AlertCircle,
  LineChart,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Mock fleet vehicles data
const fleetVehicles = [
  {
    id: 'EV-001',
    name: 'Tesla Model 3',
    plate: 'KDA 123A',
    driver: 'John Kamau',
    status: 'charging',
    battery: 67,
    range: 189,
    location: 'Nairobi CBD',
    lastUpdate: '2 min ago',
    mileage: 45230,
    efficiency: 4.2,
    nextService: '2025-02-15',
    alerts: 1
  },
  {
    id: 'EV-002',
    name: 'BYD e6',
    plate: 'KBC 456B',
    driver: 'Mary Wanjiku',
    status: 'active',
    battery: 89,
    range: 280,
    location: 'Mombasa Road',
    lastUpdate: '1 min ago',
    mileage: 62100,
    efficiency: 4.8,
    nextService: '2025-03-01',
    alerts: 0
  },
  {
    id: 'EV-003',
    name: 'Hyundai Kona',
    plate: 'KCA 789C',
    driver: 'Peter Ochieng',
    status: 'idle',
    battery: 95,
    range: 310,
    location: 'Westlands',
    lastUpdate: '5 min ago',
    mileage: 38450,
    efficiency: 4.5,
    nextService: '2025-01-28',
    alerts: 2
  },
  {
    id: 'EV-004',
    name: 'Nissan Leaf',
    plate: 'KDB 321D',
    driver: 'Sarah Akinyi',
    status: 'maintenance',
    battery: 45,
    range: 120,
    location: 'Service Center',
    lastUpdate: '30 min ago',
    mileage: 78900,
    efficiency: 3.9,
    nextService: '2025-01-20',
    alerts: 3
  },
  {
    id: 'EV-005',
    name: 'BMW i3',
    plate: 'KEF 654E',
    driver: 'James Mwangi',
    status: 'active',
    battery: 78,
    range: 145,
    location: 'Kiambu Road',
    lastUpdate: '3 min ago',
    mileage: 52800,
    efficiency: 4.1,
    nextService: '2025-02-20',
    alerts: 0
  },
];

// Performance data for different vehicles over time
const performanceData = {
  'all': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    efficiency: [4.1, 4.2, 4.3, 4.2, 4.4, 4.3],
    cost: [320, 310, 340, 330, 350, 340],
    mileage: [1200, 1350, 1400, 1280, 1450, 1380],
    batteryHealth: [92, 91, 91, 90, 90, 89],
  },
  'EV-001': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    efficiency: [4.0, 4.1, 4.2, 4.1, 4.3, 4.2],
    cost: [85, 82, 88, 84, 90, 87],
    mileage: [280, 310, 320, 290, 340, 315],
    batteryHealth: [88, 87, 87, 86, 86, 85],
  },
  'EV-002': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    efficiency: [4.6, 4.7, 4.8, 4.7, 4.9, 4.8],
    cost: [72, 70, 75, 73, 78, 76],
    mileage: [320, 350, 360, 340, 380, 365],
    batteryHealth: [95, 95, 94, 94, 94, 93],
  },
  'EV-003': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    efficiency: [4.3, 4.4, 4.5, 4.4, 4.6, 4.5],
    cost: [68, 65, 70, 68, 72, 70],
    mileage: [290, 310, 320, 300, 340, 325],
    batteryHealth: [91, 90, 90, 89, 89, 88],
  },
  'EV-004': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    efficiency: [3.7, 3.8, 3.9, 3.8, 3.9, 3.9],
    cost: [55, 52, 54, 53, 55, 54],
    mileage: [180, 195, 200, 190, 205, 198],
    batteryHealth: [78, 77, 77, 76, 76, 75],
  },
  'EV-005': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    efficiency: [4.0, 4.1, 4.1, 4.0, 4.2, 4.1],
    cost: [40, 38, 42, 40, 44, 42],
    mileage: [130, 145, 150, 140, 160, 150],
    batteryHealth: [89, 89, 88, 88, 88, 87],
  },
};

// Scenario presets
const scenarios = [
  { id: 'normal', name: 'Normal Operations', description: 'Regular daily operations' },
  { id: 'peak', name: 'Peak Demand', description: 'High-usage periods' },
  { id: 'eco', name: 'Eco Mode', description: 'Efficiency-optimized routes' },
  { id: 'long-haul', name: 'Long Distance', description: 'Extended range routes' },
];

// Mock drivers data
const fleetDrivers = [
  { id: 'D001', name: 'John Kamau', status: 'active', rating: 4.8, trips: 234, hoursToday: 6.5, safetyScore: 95 },
  { id: 'D002', name: 'Mary Wanjiku', status: 'driving', rating: 4.9, trips: 312, hoursToday: 8.2, safetyScore: 98 },
  { id: 'D003', name: 'Peter Ochieng', status: 'break', rating: 4.6, trips: 189, hoursToday: 4.0, safetyScore: 88 },
  { id: 'D004', name: 'Sarah Akinyi', status: 'off', rating: 4.7, trips: 256, hoursToday: 0, safetyScore: 92 },
  { id: 'D005', name: 'James Mwangi', status: 'driving', rating: 4.5, trips: 178, hoursToday: 5.5, safetyScore: 85 },
];

// Mock charging schedules
const chargingSchedules = [
  { vehicle: 'EV-001', station: 'Sarit Centre Hub', time: '14:00', duration: '45 min', energy: '35 kWh', status: 'in_progress', costUSD: 8.75 },
  { vehicle: 'EV-003', station: 'Two Rivers Mall', time: '16:30', duration: '30 min', energy: '22 kWh', status: 'scheduled', costUSD: 5.50 },
  { vehicle: 'EV-005', station: 'Garden City', time: '18:00', duration: '40 min', energy: '28 kWh', status: 'scheduled', costUSD: 7.00 },
];

// Mock alerts
const fleetAlerts = [
  { id: 1, type: 'warning', vehicle: 'EV-003', message: 'Low tire pressure detected', time: '10 min ago', priority: 'medium' },
  { id: 2, type: 'critical', vehicle: 'EV-004', message: 'Battery temperature high', time: '25 min ago', priority: 'high' },
  { id: 3, type: 'info', vehicle: 'EV-002', message: 'Scheduled maintenance due in 5 days', time: '1 hour ago', priority: 'low' },
  { id: 4, type: 'warning', vehicle: 'EV-004', message: 'Service overdue by 3 days', time: '2 hours ago', priority: 'high' },
];

// Maintenance schedules
const maintenanceSchedule = [
  { vehicle: 'EV-001', type: 'Tire Rotation', date: '2025-02-15', status: 'scheduled', costUSD: 50 },
  { vehicle: 'EV-003', type: 'Brake Inspection', date: '2025-01-28', status: 'overdue', costUSD: 120 },
  { vehicle: 'EV-004', type: 'Battery Health Check', date: '2025-01-20', status: 'in_progress', costUSD: 200 },
  { vehicle: 'EV-005', type: 'AC Service', date: '2025-02-20', status: 'scheduled', costUSD: 80 },
];

const statusColors: Record<string, string> = {
  active: 'bg-[#f0f7f5] text-[#235347] border border-[#8EB69B]',
  charging: 'bg-[#e8f4f8] text-[#052659] border border-[#5483B3]',
  idle: 'bg-gray-50 text-gray-700 border border-gray-200',
  maintenance: 'bg-amber-50 text-amber-700 border border-amber-200',
  driving: 'bg-[#f0f7f5] text-[#235347] border border-[#8EB69B]',
  break: 'bg-purple-50 text-purple-700 border border-purple-200',
  off: 'bg-gray-50 text-gray-500 border border-gray-200',
};

const statusIcons: Record<string, React.ElementType> = {
  active: CheckCircle,
  charging: Battery,
  idle: Clock,
  maintenance: Wrench,
  driving: Car,
  break: Clock,
  off: Clock,
};

// Simple line chart component
function SimpleLineChart({ data, color, height = 120 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{ height }} className="w-full relative">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
        ))}
        {/* Line */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
        />
        {/* Dots */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((value - min) / range) * 100;
          return (
            <circle key={index} cx={x} cy={y} r="3" fill={color} />
          );
        })}
      </svg>
    </div>
  );
}

// Bar chart component
function SimpleBarChart({ data, labels, color, height = 120 }: { data: number[]; labels: string[]; color: string; height?: number }) {
  const max = Math.max(...data);
  
  return (
    <div style={{ height }} className="w-full flex items-end gap-1">
      {data.map((value, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-1">
          <div 
            className="w-full rounded-t transition-all"
            style={{ 
              height: `${(value / max) * 100}%`,
              backgroundColor: color,
              minHeight: 4
            }}
          />
          <span className="text-[8px] text-gray-400 truncate w-full text-center">{labels[index]}</span>
        </div>
      ))}
    </div>
  );
}

export function FleetDashboard() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('today');
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedScenario, setSelectedScenario] = useState('normal');
  const { formatPrice, currency } = useCurrency();

  // Get current performance data based on selection
  const currentData = performanceData[selectedModel as keyof typeof performanceData] || performanceData['all'];

  // Fleet statistics
  const fleetStats = {
    totalVehicles: 5,
    activeVehicles: 2,
    chargingVehicles: 1,
    inMaintenance: 1,
    totalMileage: 277500,
    avgEfficiency: 4.3,
    totalEnergyUsed: 1250, // kWh
    totalCostUSD: 15750,
  };

  const overviewStats = [
    { label: 'Fleet Size', value: fleetStats.totalVehicles, icon: Car, color: 'bg-[#235347]' },
    { label: 'Active Now', value: fleetStats.activeVehicles, icon: Activity, color: 'bg-[#8EB69B]' },
    { label: 'Total Mileage', value: '277,500 km', icon: Route, color: 'bg-[#052659]' },
    { label: 'Avg Efficiency', value: `${fleetStats.avgEfficiency} km/kWh`, icon: Gauge, color: 'bg-[#5483B3]' },
  ];

  const costBreakdown = [
    { category: 'Energy', amountUSD: 4500, percentage: 45 },
    { category: 'Maintenance', amountUSD: 2800, percentage: 28 },
    { category: 'Insurance', amountUSD: 1500, percentage: 15 },
    { category: 'Other', amountUSD: 1200, percentage: 12 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div 
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#235347]">
              <Car className="h-6 w-6 text-white" />
            </div>
            Fleet Command Center
          </h1>
          <p className="text-gray-500">Manage your EV fleet efficiently</p>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <CurrencyToggle />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px] bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2 bg-[#235347] hover:bg-[#163832] text-white">
            <Plus className="h-4 w-4" />
            Add Vehicle
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-white overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList className="bg-gray-100 flex-wrap h-auto gap-1 p-1.5">
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="vehicles" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm gap-2">
            <Car className="w-4 h-4" />
            Vehicles
          </TabsTrigger>
          <TabsTrigger value="drivers" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm gap-2">
            <Users className="w-4 h-4" />
            Drivers
          </TabsTrigger>
          <TabsTrigger value="charging" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm gap-2">
            <Battery className="w-4 h-4" />
            Charging
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm gap-2">
            <Wrench className="w-4 h-4" />
            Maintenance
          </TabsTrigger>
        </TabsList>

        {/* Analytics Tab with Performance Graphs */}
        <TabsContent value="analytics" className="space-y-4">
          {/* Model and Scenario Selection */}
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Vehicle:</span>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-[180px] bg-white border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vehicles</SelectItem>
                      {fleetVehicles.map((v) => (
                        <SelectItem key={v.id} value={v.id}>{v.id} - {v.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Scenario:</span>
                  <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                    <SelectTrigger className="w-[180px] bg-white border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {scenarios.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Graphs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Efficiency Over Time */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <TrendingUp className="w-5 h-5 text-[#235347]" />
                  Efficiency Over Time
                </CardTitle>
                <CardDescription className="text-gray-500">
                  km per kWh performance trend
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleLineChart data={currentData.efficiency} color="#235347" height={150} />
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  {currentData.labels.map((label, i) => (
                    <span key={i}>{label}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">{currentData.efficiency[currentData.efficiency.length - 1]}</span>
                  <span className="text-sm text-gray-500">km/kWh</span>
                  <div className="flex items-center gap-1 text-green-600 text-sm ml-auto">
                    <ArrowUp className="w-3 h-3" />
                    +{(currentData.efficiency[currentData.efficiency.length - 1] - currentData.efficiency[0]).toFixed(1)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Energy Cost Over Time */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <DollarSign className="w-5 h-5 text-[#052659]" />
                  Energy Cost Trend
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Weekly energy expenditure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleBarChart data={currentData.cost} labels={currentData.labels.map(l => l.split(' ')[1])} color="#052659" height={150} />
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">{formatPrice(currentData.cost[currentData.cost.length - 1])}</span>
                  <span className="text-sm text-gray-500">this week</span>
                  <div className="flex items-center gap-1 text-red-600 text-sm ml-auto">
                    <ArrowUp className="w-3 h-3" />
                    +{((currentData.cost[currentData.cost.length - 1] - currentData.cost[0]) / currentData.cost[0] * 100).toFixed(0)}%
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mileage Tracking */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Route className="w-5 h-5 text-[#5483B3]" />
                  Mileage Tracking
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Weekly distance covered (km)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleLineChart data={currentData.mileage} color="#5483B3" height={150} />
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  {currentData.labels.map((label, i) => (
                    <span key={i}>{label}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">{currentData.mileage[currentData.mileage.length - 1].toLocaleString()}</span>
                  <span className="text-sm text-gray-500">km this week</span>
                  <div className="flex items-center gap-1 text-green-600 text-sm ml-auto">
                    <ArrowUp className="w-3 h-3" />
                    +{currentData.mileage[currentData.mileage.length - 1] - currentData.mileage[0]} km
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Battery Health */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Battery className="w-5 h-5 text-[#8EB69B]" />
                  Battery Health Trend
                </CardTitle>
                <CardDescription className="text-gray-500">
                  State of Health percentage over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleLineChart data={currentData.batteryHealth} color="#8EB69B" height={150} />
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  {currentData.labels.map((label, i) => (
                    <span key={i}>{label}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">{currentData.batteryHealth[currentData.batteryHealth.length - 1]}%</span>
                  <span className="text-sm text-gray-500">SoH</span>
                  <div className="flex items-center gap-1 text-amber-600 text-sm ml-auto">
                    <Minus className="w-3 h-3" />
                    -{currentData.batteryHealth[0] - currentData.batteryHealth[currentData.batteryHealth.length - 1]}%
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <DollarSign className="w-5 h-5 text-[#235347]" />
                  Cost Breakdown
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Monthly operating expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costBreakdown.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{item.category}</span>
                        <span className="text-sm font-medium text-gray-900">{formatPrice(item.amountUSD)}</span>
                      </div>
                      <Progress value={item.percentage} className="h-2 [&>div]:bg-[#235347]" />
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Monthly Cost</span>
                    <span className="text-2xl font-bold text-gray-900">{formatPrice(10000)}</span>
                  </div>
                  <p className="text-sm text-[#235347] mt-1">↓ 12% vs last month</p>
                </div>
              </CardContent>
            </Card>

            {/* Fleet Efficiency */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <TrendingUp className="w-5 h-5 text-[#052659]" />
                  Fleet Efficiency
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#f0f7f5]">
                    <p className="text-xs text-gray-500 mb-1">Avg. km per kWh</p>
                    <p className="text-2xl font-bold text-gray-900">4.3</p>
                    <p className="text-xs text-[#235347]">+0.2 vs last month</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#e8f4f8]">
                    <p className="text-xs text-gray-500 mb-1">Fleet Utilization</p>
                    <p className="text-2xl font-bold text-gray-900">78%</p>
                    <p className="text-xs text-[#052659]">+5% vs last month</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#f0f7f5]">
                    <p className="text-xs text-gray-500 mb-1">Uptime</p>
                    <p className="text-2xl font-bold text-gray-900">96.5%</p>
                    <p className="text-xs text-[#235347]">Excellent</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#e8f4f8]">
                    <p className="text-xs text-gray-500 mb-1">Cost per km</p>
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(0.12).replace('0', '0.')}</p>
                    <p className="text-xs text-[#5483B3]">-{formatPrice(0.02)} vs avg</p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-[#f0f7f5] border border-[#8EB69B]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#235347]">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[#235347]">Safety Score: 94%</p>
                      <p className="text-sm text-[#235347]/70">Fleet performing above industry average</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Benefits Section */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-[#f0f7f5] to-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#235347]" />
                How SafariCharge Helps Fleet Owners
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Route, title: 'Smart Route Planning', desc: 'Optimize routes with charging stops' },
                  { icon: Battery, title: 'Charging Optimization', desc: 'Schedule charging during off-peak hours' },
                  { icon: DollarSign, title: 'Cost Reduction', desc: 'Up to 30% savings on energy costs' },
                  { icon: Wrench, title: 'Predictive Maintenance', desc: 'AI-powered vehicle health monitoring' },
                ].map((benefit, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white shadow-sm">
                    <div className="p-2 rounded-lg bg-[#235347] inline-block mb-3">
                      <benefit.icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vehicles Tab */}
        <TabsContent value="vehicles" className="space-y-4">
          {/* Alerts Banner */}
          {fleetAlerts.filter(a => a.priority === 'high').length > 0 && (
            <Card className="border-0 shadow-lg bg-red-50 border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium text-red-700">
                      {fleetAlerts.filter(a => a.priority === 'high').length} Critical Alert(s)
                    </p>
                    <p className="text-sm text-red-600">
                      {fleetAlerts.find(a => a.priority === 'high')?.message}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {fleetVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="p-5">
                    {/* Vehicle Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-[#f0f7f5]">
                          <Car className="h-6 w-6 text-[#235347]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900">{vehicle.id}</h3>
                            <Badge className={statusColors[vehicle.status]}>
                              {vehicle.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">{vehicle.name} • {vehicle.plate}</p>
                        </div>
                      </div>
                      {vehicle.alerts > 0 && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-50 text-red-600 text-sm">
                          <Bell className="h-3.5 w-3.5" />
                          {vehicle.alerts}
                        </div>
                      )}
                    </div>

                    {/* Vehicle Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 rounded-xl bg-[#f0f7f5]">
                        <Battery className="h-4 w-4 mx-auto mb-1 text-[#235347]" />
                        <p className="text-lg font-bold text-gray-900">{vehicle.battery}%</p>
                        <p className="text-xs text-gray-500">Battery</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-[#e8f4f8]">
                        <Route className="h-4 w-4 mx-auto mb-1 text-[#052659]" />
                        <p className="text-lg font-bold text-gray-900">{vehicle.range} km</p>
                        <p className="text-xs text-gray-500">Range</p>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-[#f0f7f5]">
                        <Gauge className="h-4 w-4 mx-auto mb-1 text-[#5483B3]" />
                        <p className="text-lg font-bold text-gray-900">{vehicle.efficiency}</p>
                        <p className="text-xs text-gray-500">kWh/100km</p>
                      </div>
                    </div>

                    {/* Battery Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500">Battery Level</span>
                        <span className="font-medium text-gray-700">{vehicle.battery}%</span>
                      </div>
                      <Progress 
                        value={vehicle.battery} 
                        className={`h-2 ${
                          vehicle.battery >= 80 ? '[&>div]:bg-[#8EB69B]' :
                          vehicle.battery >= 50 ? '[&>div]:bg-[#5483B3]' :
                          vehicle.battery >= 20 ? '[&>div]:bg-amber-500' :
                          '[&>div]:bg-red-500'
                        }`}
                      />
                    </div>

                    {/* Location & Driver */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin className="h-4 w-4" />
                        {vehicle.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Users className="h-4 w-4" />
                        {vehicle.driver}
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">Updated {vehicle.lastUpdate}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-600 hover:text-[#235347]">
                        <MapPin className="h-4 w-4 mr-1" />
                        Track
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-600 hover:text-[#235347]">
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Drivers Tab */}
        <TabsContent value="drivers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fleetDrivers.map((driver, index) => (
              <motion.div
                key={driver.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg bg-white overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-[#235347] flex items-center justify-center text-white font-bold">
                          {driver.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{driver.name}</h3>
                          <Badge className={statusColors[driver.status]}>
                            {driver.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-[#f0f7f5]">
                        <p className="text-xs text-gray-500">Rating</p>
                        <p className="text-lg font-bold text-gray-900">⭐ {driver.rating}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#e8f4f8]">
                        <p className="text-xs text-gray-500">Safety Score</p>
                        <p className="text-lg font-bold text-gray-900">{driver.safetyScore}%</p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#f0f7f5]">
                        <p className="text-xs text-gray-500">Total Trips</p>
                        <p className="text-lg font-bold text-gray-900">{driver.trips}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#e8f4f8]">
                        <p className="text-xs text-gray-500">Hours Today</p>
                        <p className="text-lg font-bold text-gray-900">{driver.hoursToday}h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Charging Tab */}
        <TabsContent value="charging" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Charging Schedules */}
            <Card className="lg:col-span-2 border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Clock className="w-5 h-5 text-[#235347]" />
                  Charging Schedule
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Upcoming and active charging sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {chargingSchedules.map((schedule, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-xl border ${
                        schedule.status === 'in_progress' 
                          ? 'bg-[#f0f7f5] border-[#8EB69B]' 
                          : 'bg-gray-50 border-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            schedule.status === 'in_progress' ? 'bg-[#235347]' : 'bg-gray-200'
                          }`}>
                            <Battery className={`h-4 w-4 ${
                              schedule.status === 'in_progress' ? 'text-white' : 'text-gray-600'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{schedule.vehicle}</p>
                            <p className="text-sm text-gray-500">{schedule.station}</p>
                          </div>
                        </div>
                        <Badge className={schedule.status === 'in_progress' ? 'bg-[#235347] text-white' : 'bg-gray-100 text-gray-600'}>
                          {schedule.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {schedule.time}
                        </span>
                        <span>•</span>
                        <span>{schedule.duration}</span>
                        <span>•</span>
                        <span>{schedule.energy}</span>
                        <span>•</span>
                        <span className="font-medium text-[#235347]">{formatPrice(schedule.costUSD)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4 border-[#235347] text-[#235347] hover:bg-[#f0f7f5]">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Charging
                </Button>
              </CardContent>
            </Card>

            {/* Energy Consumption */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Zap className="w-5 h-5 text-[#052659]" />
                  Energy Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                      <circle 
                        cx="64" cy="64" r="56" 
                        stroke="#235347" strokeWidth="12" fill="none"
                        strokeDasharray={`${75 * 3.52} 352`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">{fleetStats.totalEnergyUsed}</span>
                      <span className="text-sm text-gray-500">kWh Today</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#f0f7f5]">
                    <span className="text-sm text-gray-500">Peak Usage</span>
                    <span className="font-medium text-gray-900">85 kWh (2-3 PM)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#e8f4f8]">
                    <span className="text-sm text-gray-500">Avg per Vehicle</span>
                    <span className="font-medium text-gray-900">250 kWh</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#f0f7f5]">
                    <span className="text-sm text-gray-500">Est. Cost</span>
                    <span className="font-medium text-[#235347]">{formatPrice(187.50)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Maintenance Schedule */}
            <Card className="lg:col-span-2 border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Wrench className="w-5 h-5 text-[#235347]" />
                  Maintenance Schedule
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Upcoming and overdue services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {maintenanceSchedule.map((item, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-xl border ${
                        item.status === 'overdue' 
                          ? 'bg-red-50 border-red-200' 
                          : item.status === 'in_progress'
                          ? 'bg-amber-50 border-amber-200'
                          : 'bg-[#f0f7f5] border-[#8EB69B]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            item.status === 'overdue' ? 'bg-red-500' :
                            item.status === 'in_progress' ? 'bg-amber-500' :
                            'bg-[#235347]'
                          }`}>
                            <Wrench className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.vehicle}</p>
                            <p className="text-sm text-gray-500">{item.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{item.date}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={`${
                              item.status === 'overdue' ? 'bg-red-100 text-red-700' :
                              item.status === 'in_progress' ? 'bg-amber-100 text-amber-700' :
                              'bg-[#f0f7f5] text-[#235347]'
                            }`}>
                              {item.status}
                            </Badge>
                            <span className="text-sm font-medium text-gray-900">{formatPrice(item.costUSD)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4 border-[#235347] text-[#235347] hover:bg-[#f0f7f5]">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Service
                </Button>
              </CardContent>
            </Card>

            {/* Maintenance Stats */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Maintenance Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium text-red-700">1 Overdue</p>
                      <p className="text-sm text-red-600">Requires immediate attention</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="font-medium text-amber-700">1 In Progress</p>
                      <p className="text-sm text-amber-600">EV-004 at service center</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-[#f0f7f5] border border-[#8EB69B]">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#235347]" />
                    <div>
                      <p className="font-medium text-[#235347]">3 Scheduled</p>
                      <p className="text-sm text-[#235347]/70">Upcoming this month</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Monthly Maintenance Cost</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(450)}</p>
                  <p className="text-xs text-gray-400">Budget: {formatPrice(500)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
