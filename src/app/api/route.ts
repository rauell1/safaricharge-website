import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const status = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || "unknown",
    database: "unknown" as "ok" | "error" | "unknown",
  };

  try {
    // Issue a round-trip query to validate actual DB connectivity, not just connection pool state.
    // $queryRaw`SELECT 1` is intentionally used over $connect() to verify the DB is reachable
    // and responding, which is what a health check endpoint should confirm.
    await db.$queryRaw`SELECT 1`;
    status.database = "ok";
  } catch {
    status.database = "error";
  }

  const httpStatus = status.database === "error" ? 503 : 200;
  return NextResponse.json(status, { status: httpStatus });
}
