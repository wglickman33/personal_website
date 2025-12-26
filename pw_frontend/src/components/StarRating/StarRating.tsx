import './StarRating.scss';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating = ({ rating, size = 'md' }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`star-rating star-rating--${size}`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} className="star-rating__star star-rating__star--full">
          <span className="material-symbols-outlined">star</span>
        </span>
      ))}
      {hasHalfStar && (
        <span className="star-rating__star star-rating__star--half">
          <span className="material-symbols-outlined">star_half</span>
        </span>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} className="star-rating__star star-rating__star--empty">
          <span className="material-symbols-outlined">star</span>
        </span>
      ))}
      <span className="star-rating__value">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;

