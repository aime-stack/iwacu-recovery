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
  TrendingUp,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    appointments: 0,
    gallery: 0,
    articles: 0,
    messages: 0,
    volunteers: 0,
    donations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch actual stats from your APIs
    setTimeout(() => {
      setStats({
        appointments: 12,
        gallery: 24,
        articles: 8,
        messages: 5,
        volunteers: 15,
        donations: 42,
      });
      setLoading(false);
    }, 500);
  }, []);

  const statCards = [
    { label: "Appointments", value: stats.appointments, icon: Calendar, href: "/admin/appointments", color: "blue" },
    { label: "Gallery Items", value: stats.gallery, icon: Image, href: "/admin/gallery", color: "purple" },
    { label: "Articles", value: stats.articles, icon: FileText, href: "/admin/articles", color: "green" },
    { label: "Messages", value: stats.messages, icon: Mail, href: "/admin/messages", color: "orange" },
    { label: "Volunteers", value: stats.volunteers, icon: Users, href: "/admin/volunteers", color: "indigo" },
    { label: "Donations", value: stats.donations, icon: Heart, href: "/admin/donations", color: "red" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome to the Iwacu Recovery Centre admin panel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "from-blue-500 to-blue-600",
            purple: "from-purple-500 to-purple-600",
            green: "from-green-500 to-green-600",
            orange: "from-orange-500 to-orange-600",
            indigo: "from-indigo-500 to-indigo-600",
            red: "from-red-500 to-red-600",
          };

          return (
            <Link
              key={stat.href}
              href={stat.href}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200 hover:border-amber-400 group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} text-white`}
                  >
                    <Icon size={24} />
                  </div>
                  <TrendingUp className="text-gray-400 group-hover:text-amber-600 transition-colors" size={20} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Quick Actions
        </h3>
        <p className="text-gray-600 text-sm">
          Use the navigation sidebar to manage appointments, content, and more.
        </p>
      </div>
    </div>
  );
}

