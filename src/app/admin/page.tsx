"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Image,
  FileText,
  Mail,
  Users,
  Heart,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Define UserRole type
type UserRole = 'admin' | 'staff';

type DashboardStats = {
  appointments: {
    total: number;
    pending: number;
    recent: number;
  };
  gallery: {
    total: number;
  };
  articles: {
    total: number;
    published: number;
  };
  messages: {
    total: number;
    unread: number;
    recent: number;
  };
  volunteers: {
    total: number;
  };
  donations: {
    total: number;
    recent: number;
    amount: number;
  } | null;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // Get user role
    fetch("/api/auth/verify")
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUserRole((data.role as UserRole) || 'staff');
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    // Fetch real dashboard stats
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const result = await res.json();
          if (result.success && result.data) {
            setStats(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  // Build stat cards based on available data
  const baseStatCards = stats ? [
    { 
      label: "Appointments", 
      value: stats.appointments.total, 
      icon: Calendar, 
      href: "/admin/appointments", 
      color: "blue" as const, 
      roles: ['admin', 'staff'] as const,
      badge: stats.appointments.pending > 0 ? `${stats.appointments.pending} pending` : null,
      subtitle: `${stats.appointments.recent} this week`,
    },
    { 
      label: "Gallery Items", 
      value: stats.gallery.total, 
      icon: Image, 
      href: "/admin/gallery", 
      color: "purple" as const, 
      roles: ['admin', 'staff'] as const,
      badge: null,
      subtitle: null,
    },
    { 
      label: "Articles", 
      value: stats.articles.total, 
      icon: FileText, 
      href: "/admin/articles", 
      color: "green" as const, 
      roles: ['admin', 'staff'] as const,
      badge: `${stats.articles.published} published`,
      subtitle: null,
    },
    { 
      label: "Messages", 
      value: stats.messages.total, 
      icon: Mail, 
      href: "/admin/messages", 
      color: "orange" as const, 
      roles: ['admin', 'staff'] as const,
      badge: stats.messages.unread > 0 ? `${stats.messages.unread} unread` : null,
      subtitle: `${stats.messages.recent} this week`,
    },
    { 
      label: "Volunteers", 
      value: stats.volunteers.total, 
      icon: Users, 
      href: "/admin/volunteers", 
      color: "indigo" as const, 
      roles: ['admin', 'staff'] as const,
      badge: null,
      subtitle: null,
    },
    { 
      label: "Donations", 
      value: stats.donations?.total || 0, 
      icon: Heart, 
      href: "/admin/donations", 
      color: "red" as const, 
      roles: ['admin'] as const,
      badge: stats.donations ? `${stats.donations.recent} this week` : null,
      subtitle: stats.donations ? `USD ${(stats.donations.amount || 0).toLocaleString()}` : null,
    },
  ] : [
    { label: "Appointments", value: 0, icon: Calendar, href: "/admin/appointments", color: "blue" as const, roles: ['admin', 'staff'] as const, badge: null, subtitle: null },
    { label: "Gallery Items", value: 0, icon: Image, href: "/admin/gallery", color: "purple" as const, roles: ['admin', 'staff'] as const, badge: null, subtitle: null },
    { label: "Articles", value: 0, icon: FileText, href: "/admin/articles", color: "green" as const, roles: ['admin', 'staff'] as const, badge: null, subtitle: null },
    { label: "Messages", value: 0, icon: Mail, href: "/admin/messages", color: "orange" as const, roles: ['admin', 'staff'] as const, badge: null, subtitle: null },
    { label: "Volunteers", value: 0, icon: Users, href: "/admin/volunteers", color: "indigo" as const, roles: ['admin', 'staff'] as const, badge: null, subtitle: null },
    { label: "Donations", value: 0, icon: Heart, href: "/admin/donations", color: "red" as const, roles: ['admin'] as const, badge: null, subtitle: null },
  ];

  // Filter stat cards based on user role
  const visibleStatCards = baseStatCards.filter(card => {
    if (!card.roles) return true;
    const role = userRole || 'staff';
    return card.roles.some(r => r === role);
  });

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const colorClasses = {
    blue: {
      gradient: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
    },
    purple: {
      gradient: "from-purple-500 to-purple-600",
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-200",
    },
    green: {
      gradient: "from-green-500 to-green-600",
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
    },
    orange: {
      gradient: "from-orange-500 to-orange-600",
      bg: "bg-orange-50",
      text: "text-orange-700",
      border: "border-orange-200",
    },
    indigo: {
      gradient: "from-indigo-500 to-indigo-600",
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      border: "border-indigo-200",
    },
    red: {
      gradient: "from-red-500 to-red-600",
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
    },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening at Iwacu Recovery Centre
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Last updated</div>
          <div className="text-sm font-medium text-gray-700">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleStatCards.map((stat) => {
          const Icon = stat.icon;
          const colors = colorClasses[stat.color as keyof typeof colorClasses];

          return (
            <Link
              key={stat.href}
              href={stat.href}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 hover:border-amber-400 group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${colors.gradient} text-white shadow-sm`}
                  >
                    <Icon size={24} />
                  </div>
                  {stat.badge && (
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colors.bg} ${colors.text} ${colors.border} border`}
                    >
                      {stat.badge}
                    </span>
                  )}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value.toLocaleString()}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-700 font-medium">{stat.label}</div>
                  {stat.subtitle && (
                    <div className="text-sm text-gray-500">{stat.subtitle}</div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="text-amber-600" size={20} />
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Calendar className="text-blue-600" size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    New Appointments
                  </div>
                  <div className="text-xs text-gray-500">Last 7 days</div>
                </div>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {stats.appointments.recent}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Mail className="text-orange-600" size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    New Messages
                  </div>
                  <div className="text-xs text-gray-500">Last 7 days</div>
                </div>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {stats.messages.recent}
              </div>
            </div>
            {stats.donations && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <Heart className="text-red-600" size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      New Donations
                    </div>
                    <div className="text-xs text-gray-500">Last 7 days</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {stats.donations.recent}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="text-amber-600" size={20} />
            Status Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Clock className="text-yellow-600" size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Pending Appointments
                  </div>
                  <div className="text-xs text-gray-500">Requires attention</div>
                </div>
              </div>
              <div className="text-lg font-bold text-yellow-600">
                {stats.appointments.pending}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Mail className="text-orange-600" size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Unread Messages
                  </div>
                  <div className="text-xs text-gray-500">Needs review</div>
                </div>
              </div>
              <div className="text-lg font-bold text-orange-600">
                {stats.messages.unread}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="text-green-600" size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Published Articles
                  </div>
                  <div className="text-xs text-gray-500">
                    {stats.articles.total - stats.articles.published} drafts
                  </div>
                </div>
              </div>
              <div className="text-lg font-bold text-green-600">
                {stats.articles.published}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/appointments"
            className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600" size={20} />
              <span className="text-sm font-medium text-gray-900">
                Manage Appointments
              </span>
            </div>
          </Link>
          <Link
            href="/admin/articles"
            className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <FileText className="text-green-600" size={20} />
              <span className="text-sm font-medium text-gray-900">
                Create Article
              </span>
            </div>
          </Link>
          <Link
            href="/admin/messages"
            className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <Mail className="text-orange-600" size={20} />
              <span className="text-sm font-medium text-gray-900">
                View Messages
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}