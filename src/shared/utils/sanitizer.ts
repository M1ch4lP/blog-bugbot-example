//TODO: use a library for sanitization

export default function sanitize(input: string): string {
  // Simple HTML sanitization
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
