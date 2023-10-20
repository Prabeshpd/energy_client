'use client';

import * as React from 'react';

import classNames from 'classnames';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import { logout } from '@/adapters/authentication';

const Header = () => {
  const segment = useSelectedLayoutSegment();
  return (
    <header className="app-header">
      <nav className="app-header__navigation">
        <div className="app-header__menu">
          <Link
            href="/"
            className={classNames('app-header__link', {
              'app-header__link--active': segment === null,
            })}
          >
            Home
          </Link>
          <Link
            href="/upload"
            data-test-id="app-header-profile-nav"
            className={classNames('app-header__link', {
              'app-header__link--active': segment === 'profile',
            })}
          >
            Profile
          </Link>
        </div>
        <div className="app-header__dropdown">
          <button
            type="button"
            onClick={() => {
              logout();
            }}
          >
            Log out
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
