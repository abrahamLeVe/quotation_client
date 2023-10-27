"use client";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface ProductRatingProps {
  rating: number;
}

export default function ProductRating({ rating }: ProductRatingProps) {
  const starIcons = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      starIcons.push(<BsStarFill key={i} />);
    } else if (rating >= i - 0.5) {
      starIcons.push(<BsStarHalf key={i} />);
    } else {
      starIcons.push(<BsStar key={i} />);
    }
  }

  return (
    <div className="flex gap-1">
      {starIcons.map((icon, index) => (
        <span key={index}>{icon}</span>
      ))}
    </div>
  );
}
