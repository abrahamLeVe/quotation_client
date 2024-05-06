// ProductSimpleRating.js
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface ProductSimpleRatingProps {
  rating: number; // Asumimos que el rating ya viene como promedio
}

const ProductSimpleRating = ({ rating }: ProductSimpleRatingProps) => {
  const starIcons = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      starIcons.push(<BsStarFill key={i} className="text-amber-300" />);
    } else if (rating >= i - 0.5) {
      starIcons.push(<BsStarHalf key={i} className="text-amber-300" />);
    } else {
      starIcons.push(<BsStar key={i} className="text-amber-300" />);
    }
  }

  return (
    <div className="flex gap-1">
      {starIcons.map((icon, index) => (
        <span key={index}>{icon}</span>
      ))}
    </div>
  );
};

export default ProductSimpleRating;
