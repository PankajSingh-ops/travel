/**
 * CSV Export utility to download data arrays as CSV files in the browser.
 */

export interface CsvColumn<T = any> {
  header: string;
  key: keyof T | string;
  format?: (value: any, row: T) => string | number;
}

export function exportToCsv<T extends Record<string, any>>(
  filename: string,
  data: T[],
  columns?: CsvColumn<T>[]
) {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  // If no columns specified, use object keys from first row
  const cols: CsvColumn<T>[] = columns || Object.keys(data[0]).map((key) => ({
    header: key.charAt(0).toUpperCase() + key.slice(1),
    key,
  }));

  // Build CSV Header line
  const headerRow = cols.map((col) => escapeCsvField(col.header)).join(",");

  // Build CSV Data rows
  const dataRows = data.map((row) => {
    return cols
      .map((col) => {
        let val: any;
        if (typeof col.key === "string" && col.key.includes(".")) {
          // Handle nested keys like "user.name"
          val = col.key.split(".").reduce((obj, key) => obj?.[key], row);
        } else {
          val = row[col.key as keyof T];
        }

        if (col.format) {
          val = col.format(val, row);
        } else if (Array.isArray(val)) {
          val = val.join("; ");
        } else if (val === null || val === undefined) {
          val = "";
        }

        return escapeCsvField(String(val));
      })
      .join(",");
  });

  const csvContent = "\uFEFF" + [headerRow, ...dataRows].join("\r\n"); // UTF-8 BOM for Excel compatibility
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const timestamp = new Date().toISOString().split("T")[0];
  const cleanFilename = `${filename.replace(/\.csv$/i, "")}_${timestamp}.csv`;

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", cleanFilename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeCsvField(field: string): string {
  if (field.includes(",") || field.includes('"') || field.includes("\n") || field.includes("\r")) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}
