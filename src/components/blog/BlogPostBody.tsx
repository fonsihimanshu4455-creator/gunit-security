/**
 * Naïve markdown-ish renderer for blog post bodies. Avoids pulling in a
 * full markdown lib for a handful of formatting needs:
 *   - Blank line splits paragraphs.
 *   - Lines starting with `## ` become <h2>, `### ` become <h3>.
 *   - Lines starting with `- ` collapse into a single <ul>.
 *   - Everything else renders as a paragraph with whitespace preserved.
 *
 * We intentionally do NOT support raw HTML — protects against XSS from
 * any future non-admin content input.
 */
type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "p"; text: string };

function parse(content: string): Block[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let buf: string[] = [];
  let listBuf: string[] = [];

  const flushParagraph = () => {
    if (buf.length) {
      blocks.push({ type: "p", text: buf.join("\n").trim() });
      buf = [];
    }
  };
  const flushList = () => {
    if (listBuf.length) {
      blocks.push({ type: "list", items: listBuf });
      listBuf = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", text: trimmed.slice(3).trim() });
    } else if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h3", text: trimmed.slice(4).trim() });
    } else if (trimmed.startsWith("- ")) {
      flushParagraph();
      listBuf.push(trimmed.slice(2).trim());
    } else if (trimmed === "") {
      flushParagraph();
      flushList();
    } else {
      flushList();
      buf.push(line);
    }
  }
  flushParagraph();
  flushList();
  return blocks;
}

export function BlogPostBody({ content }: { content: string }) {
  const blocks = parse(content);
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="font-display text-3xl tracking-wider text-off-white pt-4"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3
              key={i}
              className="font-display text-2xl tracking-wider text-off-white pt-2"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-2 pl-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3 text-off-white/85 leading-relaxed">
                  <span className="text-red-bright pt-2.5 leading-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={i}
            className="text-off-white/85 leading-relaxed text-base whitespace-pre-line"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
