"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Donation = {
  id: string | number;
  name: string;
  email: string;
  amount: number;
  status: "success" | "pending" | "failed" | string;
  createdAt: string | number | Date;
};

export default function DonationsPage() {
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check user role first
    fetch("/api/auth/verify")
      .then(async (res) => {
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        setUserRole(data.role || 'staff');
        
        // If user is staff, redirect to dashboard
        if (data.role !== 'admin') {
          router.push("/admin");
          return;
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [router]);

  useEffect(() => {
    // Only fetch donations if user is admin
    if (userRole !== 'admin') {
      return;
    }

    // Fetch donations from database
    async function fetchDonations() {
      try {
        const response = await fetch("/api/admin/donations");
        if (response.ok) {
          const result = await response.json();
          setDonations((result.data as Donation[]) || []);
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDonations();
  }, [userRole]);

  // Don't render anything if not admin or still checking
  if (userRole !== 'admin' || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading donations...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
        <p className="text-gray-600 mt-2">
          View and manage all donations received
        </p>
      </div>

      {donations.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-600">No donations found.</p>
          <p className="text-sm text-gray-500 mt-2">
            Donations will appear here once received.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Donor Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.map((donation: Donation) => (
                <tr key={donation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {donation.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {donation.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    {donation.amount.toLocaleString()} USD
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        donation.status === "success"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

