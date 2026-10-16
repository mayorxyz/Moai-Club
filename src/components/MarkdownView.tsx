// Edit here: MarkdownView component
export function MarkdownView({ content }: { content: string }) {
  const html = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>');
  return <div dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }} style={{ lineHeight: 1.6 }} />;
}
