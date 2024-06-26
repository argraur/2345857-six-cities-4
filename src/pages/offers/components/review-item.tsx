import { FC } from 'react';
import { Review } from '../../../types/review';
import { Rating } from '../../../components/rating';
import { formatDateToDateString, formatDateToMonthYear } from '../../../utils/datetime';

type ReviewItemProps = {
  review: Review;
}

export const ReviewItem: FC<ReviewItemProps> = ({review}) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={review.user.avatarUrl}
          width="54"
          height="54"
          alt={review.user.name}
        />
      </div>
      <span className="reviews__user-name">{review.user.name}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <Rating value={review.rating} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {review.comment}
      </p>
      <time className="reviews__time" dateTime={formatDateToDateString(review.date)}>
        {formatDateToMonthYear(review.date)}
      </time>
    </div>
  </li>
);
