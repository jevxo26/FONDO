export function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null) {
    const e = error as { message?: string; data?: { message?: string } };
    return e.data?.message || e.message || "Something went wrong";
  }
  return "Something went wrong";
}
