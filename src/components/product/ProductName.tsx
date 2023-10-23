interface TruncatedTextProps {
  text: string;
  maxLength: number;
}

export function TruncatedText({ text, maxLength }: TruncatedTextProps) {
  return (
    <div title={text}>
      {text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}
    </div>
  );
}
