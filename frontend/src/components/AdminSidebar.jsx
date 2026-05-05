"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/api";

export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    setToken(null);
    router.push("/admin/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <img
          src="/vithara-logo.png"
          alt="Vithara Care Clinic"
          className="admin-sidebar-logo"
        />
        <div>
          <h2>Vithara</h2>
          <p>Care Admin</p>
        </div>
      </div>

      <nav className="admin-sidebar-nav">
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/dashboard/blogs">Care Journal</Link>
        <Link href="/admin/dashboard/appointments">Appointments</Link>
        <Link href="/" target="_blank">View Site</Link>
      </nav>

      <button className="admin-logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}