"use client";
import React, { useState } from "react";

interface StarRatingProps {
  totalStars?: number;
  value: number;
  onChange: (value: number) => void;
  idPrefix: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  value,
  onChange,
  idPrefix,
}) => {
  const [hover, setHover] = useState<number>(0);

  return (
    <div className="flex flex-row justify-center">
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        const inputId = `${idPrefix}-${ratingValue}`; // Utilizar el prefijo

        return (
          <React.Fragment key={inputId}>
            <input
              type="radio"
              id={inputId}
              name="rating"
              value={ratingValue}
              checked={ratingValue === value}
              onChange={() => onChange(ratingValue)}
              className="star-rating-input hidden"
              aria-labelledby={inputId}
            />
            <label
              htmlFor={inputId}
              className="star text-2xl cursor-pointer transition-all"
              style={{
                color: ratingValue <= (hover || value) ? "#ffc107" : "#e4e5e9",
              }}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(value)}
              onClick={() => onChange(ratingValue)}
              role="button"
              aria-label={`Star ${ratingValue}`}
            >
              &#9733;
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StarRating;
