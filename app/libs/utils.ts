export function stripMarkdown(content: string) {
  return content
    .replace(/[#>*_`~\-\[\]\(\)!]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(content: string, maxLength: number) {
  if (content.length <= maxLength) return content;
  return `${content.slice(0, maxLength).trim()}...`;
}
