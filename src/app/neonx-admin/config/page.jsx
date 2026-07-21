"use client";

import { ProtectedRoute } from "@/neonx.admin/auth";
import ConfigPage from "@/neonx.admin/pages/config";

export default function NeonxConfigPage() {
  return (
    <ProtectedRoute>
      <ConfigPage />
    </ProtectedRoute>
  );
}
