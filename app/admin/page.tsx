import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard - Product Management | GRYP.FIT",
  description: "Admin panel for managing GRYP.FIT product catalog, inventory, and orders.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-black tracking-tighter text-primary mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted font-medium">
              Manage your product catalog and orders
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <span className="text-sm font-bold text-muted uppercase tracking-widest">Total Products</span>
              <p className="text-4xl font-black text-primary mt-2">23</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <span className="text-sm font-bold text-muted uppercase tracking-widest">Categories</span>
              <p className="text-4xl font-black text-primary mt-2">3</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <span className="text-sm font-bold text-muted uppercase tracking-widest">Pending Inquiries</span>
              <p className="text-4xl font-black text-primary mt-2">5</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <span className="text-sm font-bold text-muted uppercase tracking-widest">Active Orders</span>
              <p className="text-4xl font-black text-primary mt-2">12</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-2xl font-black tracking-tighter text-primary mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/admin/products"
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                    <path d="m3.3 7 8.7 5 8.7-5"/>
                    <path d="M12 22V12"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Manage Products</h3>
                <p className="text-sm text-muted">Add, edit, or remove products from your catalog</p>
              </Link>

              <Link
                href="/admin/inquiries"
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">View Inquiries</h3>
                <p className="text-sm text-muted">Check and respond to customer inquiries</p>
              </Link>

              <Link
                href="/admin/settings"
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Settings</h3>
                <p className="text-sm text-muted">Configure store settings and preferences</p>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black tracking-tighter text-primary mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-primary">New product added</p>
                  <p className="text-sm text-muted">"Climbing Holds Set" was added to the catalog</p>
                </div>
                <span className="text-xs text-muted">2 hours ago</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-primary">New inquiry received</p>
                  <p className="text-sm text-muted">Bulk order inquiry from Mumbai gym chain</p>
                </div>
                <span className="text-xs text-muted">5 hours ago</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-primary">Product updated</p>
                  <p className="text-sm text-muted">"Exercise Bike Pedals" price updated to ₹299</p>
                </div>
                <span className="text-xs text-muted">1 day ago</span>
              </div>
            </div>
          </div>

          {/* Back to Site */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="text-sm font-bold text-muted hover:text-primary transition-colors"
            >
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}