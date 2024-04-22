"use client";
import { useState } from "react";

interface StarRatingProps {
  totalStars?: number;
  value: number;
  onChange: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  value,
  onChange,
}) => {
  const [hover, setHover] = useState<number>(0);

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              checked={ratingValue === value}
              onChange={() => onChange(ratingValue)}
              className="star-rating-input"
            />
            <span
              className="star"
              style={{
                color: ratingValue <= (hover || value) ? "#ffc107" : "#e4e5e9",
              }}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(value)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
