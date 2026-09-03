/**
 * LarHub Enquiry Service
 *
 * Frontend demonstration persistence only.
 */

const STORAGE_KEY =
  "larhub.demoEnquiries";

function readRecords() {
  try {
    const raw =
      window.localStorage.getItem(
        STORAGE_KEY
      );

    if (!raw) {
      return [];
    }

    const parsed =
      JSON.parse(raw);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

function writeRecords(records) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(records)
    );
  } catch {
    // Keep demo UI functional if storage is blocked.
  }
}

export function getDemoEnquiries() {
  return readRecords()
    .sort(
      (a, b) =>
        new Date(b.createdAt)
        - new Date(a.createdAt)
    );
}

export function createDemoEnquiry(
  record
) {
  const next = {
    id:
      `enquiry-${Date.now()}`,
    type:
      record.type ?? "enquiry",
    propertyId:
      record.propertyId ?? null,
    propertyReference:
      record.propertyReference
      ?? "",
    propertyTitle:
      record.propertyTitle
      ?? "",
    name:
      record.name ?? "",
    email:
      record.email ?? "",
    phone:
      record.phone ?? "",
    preferredDate:
      record.preferredDate
      ?? "",
    preferredTime:
      record.preferredTime
      ?? "",
    message:
      record.message ?? "",
    status: "local-demo",
    createdAt:
      new Date().toISOString()
  };

  const records = [
    next,
    ...readRecords()
  ];

  writeRecords(records);

  return next;
}

export function clearDemoEnquiries() {
  try {
    window.localStorage.removeItem(
      STORAGE_KEY
    );
  } catch {
    // No blocking behavior.
  }
}
