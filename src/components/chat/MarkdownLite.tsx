import React from "react";
import Link from "next/link";

const MarkdownLite = ({ text }: { text: string }) => {
  const linkRegex = /\[(.+?)\]\((.+?)\)/g;
  const parts = [];

  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, linkText, linkUrl] = match;
    const matchStart = match.index;
    const matchEnd = matchStart + fullMatch.length;

    if (lastIndex < matchStart) {
      parts.push(text.slice(lastIndex, matchStart));
    }

    parts.push(
      <Link
        // target="_blank"
        rel="noopener noreferrer"
        className="break-words underline underline-offset-2 text-blue-600"
        key={linkUrl}
        href={linkUrl}
      >
        {linkText}
      </Link>
    );

    lastIndex = matchEnd;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>{part}</React.Fragment>
      ))}
    </>
  );
};

export default MarkdownLite;
// "use client";
// import Link from "next/link";
// import { ReactNode } from "react";
// import ReactMarkdown from "react-markdown";

// interface MarkdownLiteProps {
//   text: string;
// }

// interface MarkdownLinkProps {
//   href?: string;
//   children?: ReactNode;
// }

// const MarkdownLink = ({ href, children }: MarkdownLinkProps) => {
//   if (!children || !href) return <>{children}</>;

//   return (
//     <Link
//       href={href}
//       passHref
//       rel="noopener noreferrer"
//       className="break-words underline underline-offset-2 text-blue-600"
//       scroll={false}
//     >
//       {children}
//     </Link>
//   );
// };

// const MarkdownImage = ({ src, alt }: { src?: string; alt?: string }) => {
//   return src ? (
//     <img
//       src={src}
//       alt={alt || ""}
//       className="w-[158px] h-[158px] rounded-lg overflow-hidden border "
//       loading="eager"
//     />
//   ) : null;
// };

// export default function MarkdownLite({ text }: MarkdownLiteProps) {
//   return (
//     <article className="prose prose-invert max-h-none text-inherit">
//       <ReactMarkdown
//         components={{
//           a: ({ node, ...props }) => <MarkdownLink {...props} />,
//           img: MarkdownImage,
//         }}
//       >
//         {text}
//       </ReactMarkdown>
//     </article>
//   );
// }
