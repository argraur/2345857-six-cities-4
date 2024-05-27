import { FC } from 'react';
import { User } from '../types/user';
import { AppRoute } from '../types/app-route';
import { Link } from 'react-router-dom';

type HeaderViewProps = {
    user: User | undefined;
    favoriteCount: number | undefined;
}

export const HeaderView: FC<HeaderViewProps> = ({ user, favoriteCount }) => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link" to={AppRoute.Index}>
            <img
              className="header__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="81"
              height="41"
            />
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            {user ? (
              <>
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Favorites}
                  >
                    <div
                      className="header__avatar-wrapper user__avatar-wrapper"
                      style={{
                        backgroundImage: `url(${user.avatarUrl})`,
                        borderRadius: '50%',
                      }}
                    />
                    <span className="header__user-name user__name">
                      {user.name}
                    </span>
                    <span className="header__favorite-count">{favoriteCount}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </>
            ) : (
              <Link
                className="header__nav-link header__nav-link--profile"
                to={AppRoute.Login}
              >
                <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                <span className="header__login">Sign in</span>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </div>
  </header>
);
