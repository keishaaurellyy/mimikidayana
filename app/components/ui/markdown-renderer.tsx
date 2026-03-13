"use client";

import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const components: Components = {
  h1: ({ children }) => <h1 className="text-3xl font-bold mb-2">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-bold mb-2">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-bold mb-2">{children}</h3>,
  p: ({ children }) => <p className="mb-2">{children}</p>,
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => <ul className="list-disc ml-5 mb-2">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal ml-5 mb-2">{children}</ol>,
  li: ({ children }) => <li className="mb-1">{children}</li>,
  a: ({ children, href }) => (
    <a href={href} className="underline text-blue-500">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 pl-4 italic">{children}</blockquote>
  ),
};

export default function MarkdownRenderer({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={`leading-relaxed ${className ?? ""}`}>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
