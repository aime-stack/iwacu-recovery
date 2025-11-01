"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Image,
  FileText,
  Mail,
  Users,
  Heart,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    // Verify authentication on mount and get user role
    fetch("/api/auth/verify")
      .then(async (res) => {
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        setUserRole(data.role || 'staff');
      })
      .catch(() => {
        router.push("/admin/login");
      })
      .finally(() => setLoading(false));
  }, [router, pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, roles: ['admin', 'staff'] },
    { href: "/admin/appointments", label: "Appointments", icon: Calendar, roles: ['admin', 'staff'] },
    { href: "/admin/gallery", label: "Gallery", icon: Image, roles: ['admin', 'staff'] },
    { href: "/admin/articles", label: "Articles", icon: FileText, roles: ['admin', 'staff'] },
    { href: "/admin/messages", label: "Messages", icon: Mail, roles: ['admin', 'staff'] },
    { href: "/admin/volunteers", label: "Volunteers", icon: Users, roles: ['admin', 'staff'] },
    { href: "/admin/donations", label: "Donations", icon: Heart, roles: ['admin'] }, // Admin only
  ];

  // Filter nav items based on user role
  const visibleNavItems = navItems.filter(item => {
    if (!item.roles) return true; // If no roles specified, show to all
    return item.roles.includes(userRole || 'staff');
  });

  // Don't render sidebar for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-amber-700 to-orange-800 text-white fixed h-full shadow-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">Iwacu Dashboard</h2>
          <nav className="space-y-2">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-white text-amber-700 font-semibold shadow-lg"
                      : "hover:bg-white/20 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-6 left-0 right-0 px-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 text-left"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

