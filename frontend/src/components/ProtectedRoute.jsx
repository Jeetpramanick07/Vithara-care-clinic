"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest, clearToken, getToken } from "@/lib/api";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const token = getToken();
      if (!token) {
        router.replace("/admin/login");
        return;
      }

      try {
        await apiRequest("/auth/me");
        setChecking(false);
      } catch (error) {
        clearToken();
        router.replace("/admin/login");
      }
    };

    verify();
  }, [router]);

  if (checking) {
    return (
      <main className="admin-shell centered-admin">
        <div className="admin-loader">Checking admin session...</div>
      </main>
    );
  }

  return children;
}
