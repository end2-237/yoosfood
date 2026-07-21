import { NextResponse } from "next/server";
import neonxConfig from "@/lib/neonx.config";

// GET /api/neonx/config  — configuration active du framework NeonX
export async function GET() {
  return NextResponse.json({
    message: "🧠 Configuration active du framework NeonX",
    config: neonxConfig,
  });
}
