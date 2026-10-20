import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getExcelBuffer, getAllTesters } from "@/lib/excel";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") ?? "xlsx";
  const key = searchParams.get("key");

  // If TESTERS_ADMIN_KEY is configured in .env, require it
  const requiredKey = process.env.TESTERS_ADMIN_KEY;
  if (requiredKey && key !== requiredKey) {
    return NextResponse.json(
      { error: "Unauthorized. Please provide a valid key parameter (?key=...)." },
      { status: 401 }
    );
  }

  const testers = await getAllTesters();

  if (format === "json") {
    return NextResponse.json(testers);
  }

  if (format === "csv") {
    // Generate simple CSV
    const headers = [
      "Number",
      "Google Play Email",
      "Full Name",
      "Android Device",
      "Android Version",
      "Notes",
      "Registration Date",
    ];
    const escapeCsv = (val?: string) => `"${(val || "").replace(/"/g, '""')}"`;
    const rows = testers.map((t, i) => [
      i + 1,
      escapeCsv(t.email),
      escapeCsv(t.fullName),
      escapeCsv(t.deviceModel),
      escapeCsv(t.androidVersion),
      escapeCsv(t.notes),
      escapeCsv(t.registeredAt),
    ].join(","));

    const csvContent = [headers.join(","), ...rows].join("\r\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="google-play-testers.csv"',
      },
    });
  }

  // Default: Return actual native Excel (.xlsx) file
  const buffer = await getExcelBuffer();

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="google-play-testers.xlsx"',
    },
  });
}
