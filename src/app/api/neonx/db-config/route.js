import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "lib", "db.config.json");

// GET /api/neonx/db-config — lecture de la config base de données
export async function GET() {
  if (!fs.existsSync(dbPath)) {
    return NextResponse.json({ error: "DB config introuvable" }, { status: 404 });
  }
  const data = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  return NextResponse.json(data);
}

// POST /api/neonx/db-config — mise à jour de la config base de données
export async function POST(request) {
  const body = await request.json();
  fs.writeFileSync(dbPath, JSON.stringify(body, null, 2), "utf8");
  return NextResponse.json({ message: "DB config mise à jour avec succès !" });
}
