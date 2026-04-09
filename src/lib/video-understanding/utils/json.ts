export function safeJsonParse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function extractJsonObject(value: string): string | null {
  const fenced = value.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return fenced[1].trim();

  const firstBrace = value.indexOf('{');
  const lastBrace = value.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) return null;
  return value.slice(firstBrace, lastBrace + 1);
}

export function parseJsonFromText<T>(value: string): T | null {
  const extracted = extractJsonObject(value);
  if (!extracted) return null;
  return safeJsonParse<T>(extracted);
}
