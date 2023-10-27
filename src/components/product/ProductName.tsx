"use client";
interface TruncatedTextProps {
  text: string;
  maxLength: number;
}

export function TruncatedText({ text, maxLength }: TruncatedTextProps) {
  return (
    <div>
      <p title={text}>
        {text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}
      </p>
    </div>
  );
}
