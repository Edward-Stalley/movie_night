'use client';

import Link from 'next/link';

export default function NavbarMenu() {
  const closeDropdown = () => {
    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <div className="dropdown z-50">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </div>
      <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link onClick={closeDropdown} href="/search-movie">
            Search Movie
          </Link>
        </li>
        <li>
          <Link onClick={closeDropdown} href="/movies">
            Movies
          </Link>
        </li>
        <li>
          <Link onClick={closeDropdown} href="/watched-movies">
            Watched
          </Link>
        </li>
        <li>
          <Link onClick={closeDropdown} href="/vote-session/create">
            Create Vote
          </Link>
        </li>
        <li>
          <Link onClick={closeDropdown} href="/vote-session/sessions">
            Sessions
          </Link>
        </li>
      </ul>
    </div>
  );
}
