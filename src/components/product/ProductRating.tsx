"use client";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface ProductRatingProps {
  rating: number;
  rating_count: number;
}

export default function ProductRating({
  rating,
  rating_count,
}: ProductRatingProps) {
  const averageRating = rating_count > 0 ? rating / rating_count : 0;
  const starIcons = [];
  for (let i = 1; i <= 5; i++) {
    if (averageRating >= i) {
      starIcons.push(<BsStarFill key={i} className="text-amber-300" />);
    } else if (averageRating >= i - 0.5) {
      starIcons.push(<BsStarHalf key={i} className="text-amber-300" />);
    } else {
      starIcons.push(<BsStar key={i} className="text-amber-300" />);
    }
  }

  return (
    <div className="flex items-center gap-1">
      {starIcons.map((icon, index) => (
        <span key={index}>{icon}</span>
      ))}
      {rating_count > 0 && <span>({rating_count})</span>}
    </div>
  );
}
