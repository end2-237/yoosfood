"use client";

import { ProtectedRoute } from "@/neonx.admin/auth";
import DbConfigPage from "@/neonx.admin/pages/DbConfigPage";

export default function NeonxDbConfigPage() {
  return (
    <ProtectedRoute>
      <DbConfigPage />
    </ProtectedRoute>
  );
}
