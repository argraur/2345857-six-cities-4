/* eslint-disable react/no-array-index-key */
import { FC, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { OfferDetail } from '../../types/offer-detail';
import { Review } from '../../types/review';
import { WriteReviewForm } from './components/write-review-form';
import { MOCK_OFFERS } from '../../mock/offers';
import { Point } from '../../types/point';
import { OfferGallery } from '../../components/offer-gallery';
import { ReviewsList } from './components/review-list';
import { OfferCard } from '../../components/offer-card';
import { Map } from '../../components/map';

type OfferPageProps = {
    offerDetails: OfferDetail[];
    reviewsMap: Map<string, Review[]>;
}

export const OfferPage: FC<OfferPageProps> = ({ offerDetails, reviewsMap }) => {
  const { id } = useParams();
  const offer = offerDetails.find((it) => String(it.id) === id);

  // TODO: Remove direct mock data access
  const offers = MOCK_OFFERS.slice(0, 2);

  const reviews = reviewsMap.get(offer.id);

  const [activePoint, setActivePoint] = useState<Point>();

  const points = useMemo<Point[]>(
    () =>
      offers?.map((item) => ({
        id: item.id,
        latitude: item.location.latitude,
        longitude: item.location.longitude,
        zoom: item.location.zoom,
      })) ?? [],
    [offers]
  );

  const handleCardMouseEnter = (placeId: string) => {
    const point = points.find((p) => p.id === placeId);
    if (point) {
      setActivePoint(point);
    }
  };

  const handleCardMouseLeave = () => {
    setActivePoint(undefined);
  };

  if (!offer) {
    return <Navigate to="/not_found" />;
  }

  return (
    <div className="page">
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <OfferGallery images={offer.images} alt={offer.title} />
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className={`offer__bookmark-button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''} button`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type.toUpperCase()}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((it) => (
                    <li key={`offer__inside-item-${it}`} className="offer__inside-item">{it}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  <span className="offer__user-status">{offer.host.isPro ? 'Pro' : 'Non-Pro'}</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={reviews} />
                <WriteReviewForm />
              </section>
            </div>
          </div>
        </section>
        <div className="container">
          <section className="near-places places">
            <Map city={offer.city} points={points} selectedPoint={activePoint} className='offer__map' />
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {offers.map((item) => (
                <OfferCard
                  key={item.id}
                  prefix={'near-places'}
                  onMouseEnter={() => handleCardMouseEnter(item.id)}
                  onMouseLeave={handleCardMouseLeave}
                  offer={item}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
