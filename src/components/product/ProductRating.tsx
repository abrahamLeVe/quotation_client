"use strict";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface ProductRatingProps {
  rating: number; // Aquí debería recibir el total de puntos acumulados de las calificaciones
  rating_count: number; // Aquí debería recibir el total de calificaciones que se han realizado
}

export default function ProductRating({
  rating,
  rating_count,
}: ProductRatingProps) {
  console.log("rating, rating_count ", rating, rating_count);

  // Calcular el promedio de la calificación
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
    <div className="flex gap-1">
      {starIcons.map((icon, index) => (
        <span key={index}>{icon}</span>
      ))}
      {rating_count > 0 && <span>({rating_count} reviews)</span>}
    </div>
  );
}
