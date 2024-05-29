"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EmojiPopupProps {
  onSelectEmoji: (emoji: string) => void;
}

const EmojiPopup: React.FC<EmojiPopupProps> = ({ onSelectEmoji }) => {
  return (
    <Popover>
      <PopoverTrigger>😊</PopoverTrigger>
      <PopoverContent className="backdrop-blur-md">
        {["👋", "👍", "❤️", "😍", "😂", "👏", "😊", "🥇", "🌹", "💝", "🙏"].map(
          (emoji) => (
            <span
              key={emoji}
              onClick={() => onSelectEmoji(emoji)}
              style={{ cursor: "pointer", margin: "0 5px" }}
            >
              {emoji}
            </span>
          )
        )}
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPopup;
