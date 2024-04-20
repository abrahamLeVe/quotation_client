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

const MarkdownLink: React.FC<MarkdownLinkProps> = ({ href, children }) => {
  if (!href) return <>{children}</>; // Render children directly if no href

  return (
    <Link href={href} passHref>
      <a
        rel="noopener noreferrer"
        className="break-words underline underline-offset-2 text-blue-600"
      >
        {children}
      </a>
    </Link>
  );
};

const MarkdownImage = ({
  classOpt,
  src,
  alt,
}: {
  src?: string;
  alt?: string;
  classOpt?: string;
}) => {
  return src ? (
    <img
      src={src}
      alt={alt || ""}
      className={`${classOpt} rounded-lg overflow-hidden border`}
    />
  ) : null;
};

export default function MarkdownLite({ text }: MarkdownLiteProps) {
  return (
    <article className="prose prose-invert max-w-none max-h-none text-inherit">
      <ReactMarkdown
        components={{
          a: ({ node, ...props }) => <MarkdownLink {...props} />,
          img: MarkdownImage,
        }}
      >
        {text}
      </ReactMarkdown>
    </article>
  );
}
