"use client";
import Link from "next/link";
import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownLiteProps {
  text: string;
}

interface MarkdownLinkProps {
  href?: string;
  children?: ReactNode;
}

const MarkdownLink = ({ href, children }: MarkdownLinkProps) => {
  if (!children) return null;

  if (!href) {
    return <>{children}</>;
  }

  return (
    <Link
      href={href}
      passHref
      rel="noopener noreferrer"
      className="break-words underline underline-offset-2 text-blue-600"
    >
      {children}
    </Link>
  );
};

export default function MarkdownLite({ text }: MarkdownLiteProps) {
  return (
    <article className="prose prose-invert max-w-none max-h-none  text-inherit">
      <ReactMarkdown
        components={{
          a: ({ node, ...props }) => <MarkdownLink {...props} />,
        }}
      >
        {text}
      </ReactMarkdown>
    </article>
  );
}
