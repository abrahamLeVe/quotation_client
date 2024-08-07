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

interface MarkdownImgProps {
  src?: string;
  alt?: string;
}

const MarkdownLink = ({ href, children }: MarkdownLinkProps) => {
  if (!children || !href) return <>{children}</>;

  return (
    <Link
      href={href}
      passHref
      className="underline underline-offset-2 text-blue-600"
      scroll={false}
    >
      {children}
    </Link>
  );
};

const MarkdownImage = ({ src, alt }: MarkdownImgProps) => {
  return src ? (
    <img
      src={src}
      alt={alt || ""}
      className="w-[158px] h-[158px] rounded-lg overflow-hidden border bg-slate-200"
      loading="eager"
    />
  ) : null;
};

export default function MarkdownLite({ text }: MarkdownLiteProps) {
  return (
    <article className="prose prose-invert max-h-none text-inherit">
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
