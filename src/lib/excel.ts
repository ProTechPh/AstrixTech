import * as XLSX from "xlsx";
import { promises as fs } from "fs";
import path from "path";
import type { TesterFormValues } from "@/lib/validations";

export type StoredTesterRecord = TesterFormValues & {
  registeredAt: string;
  ip?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const JSON_FILE = path.join(DATA_DIR, "testers.json");
const EXCEL_FILE = path.join(DATA_DIR, "testers.xlsx");
const CSV_FILE = path.join(DATA_DIR, "testers.csv");

/**
 * Reads all stored testers from testers.json.
 */
export async function getAllTesters(): Promise<StoredTesterRecord[]> {
  try {
    const raw = await fs.readFile(JSON_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Builds an XLSX workbook object from an array of tester records.
 */
function buildWorkbook(records: StoredTesterRecord[]) {
  const rows = records.map((r, index) => ({
    "#": index + 1,
    "Google Play Email": r.email,
    "Full Name": r.fullName,
    "Android Device": r.deviceModel || "Not specified",
    "Android Version": r.androidVersion || "Not specified",
    "Notes": r.notes || "",
    "Registration Date": new Date(r.registeredAt).toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    }),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Set nice column widths for Excel
  worksheet["!cols"] = [
    { wch: 5 },  // #
    { wch: 32 }, // Google Play Email
    { wch: 24 }, // Full Name
    { wch: 22 }, // Android Device
    { wch: 18 }, // Android Version
    { wch: 30 }, // Notes
    { wch: 24 }, // Registration Date
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Play Store Testers");
  return workbook;
}

/**
 * Saves or updates a tester record into Excel (.xlsx), CSV, and JSON files.
 */
export async function saveTesterToExcel(record: StoredTesterRecord): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });

    // 1. Update JSON
    const existing = await getAllTesters();
    const index = existing.findIndex(
      (item) => item.email.toLowerCase() === record.email.toLowerCase()
    );

    if (index >= 0) {
      existing[index] = record;
    } else {
      existing.push(record);
    }

    await fs.writeFile(JSON_FILE, JSON.stringify(existing, null, 2), "utf-8");

    // 2. Generate and write Excel (.xlsx) file
    const workbook = buildWorkbook(existing);
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    await fs.writeFile(EXCEL_FILE, excelBuffer);

    // 3. Generate and write CSV file (easy copy-paste for Play Console)
    const csvContent = XLSX.utils.sheet_to_csv(workbook.Sheets["Play Store Testers"]);
    await fs.writeFile(CSV_FILE, csvContent, "utf-8");
  } catch (error) {
    console.error("[excel] Error persisting to Excel file:", error);
  }
}

/**
 * Generates an Excel (.xlsx) buffer directly from saved records for download.
 */
export async function getExcelBuffer(): Promise<Buffer> {
  const records = await getAllTesters();
  const workbook = buildWorkbook(records);
  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }) as Buffer;
}

/**
 * Sends tester record to a live Google Sheet or Excel Webhook (if configured in .env).
 * Detects if Google Sheet reports that the email already exists.
 */
export async function syncTesterToOnlineSheet(
  record: StoredTesterRecord
): Promise<{ ok: boolean; duplicate?: boolean }> {
  const webhookUrl = process.env.TESTERS_SHEET_WEBHOOK_URL;
  if (!webhookUrl) return { ok: false };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      body: JSON.stringify({
        email: record.email,
        fullName: record.fullName,
        deviceModel: record.deviceModel || "",
        androidVersion: record.androidVersion || "",
        notes: record.notes || "",
        registeredAt: record.registeredAt,
      }),
    });

    const data = (await response.json().catch(() => null)) as {
      status?: string;
      alreadyRegistered?: boolean;
    } | null;

    if (data && (data.status === "duplicate" || data.alreadyRegistered)) {
      return { ok: false, duplicate: true };
    }

    return { ok: response.ok };
  } catch (err) {
    console.warn("[excel] Webhook sheet sync failed:", err);
    return { ok: false };
  }
}
