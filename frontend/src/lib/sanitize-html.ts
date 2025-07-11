import sanitizeHtml from "sanitize-html";

export function sanitizeAndTransform(html: string): string {
  const clean = sanitizeHtml(html, {
    allowedTags: ["p", "i", "strong", "em", "ul", "ol", "li", "a", "br"],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
  });

  return clean.replace(/<p>(.*?)<\/p>/g, (_, content) => {
    return `<TypographyP>${content}</TypographyP>`;
  });
}
