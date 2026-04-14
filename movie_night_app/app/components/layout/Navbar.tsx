import Link from 'next/link';
import { auth } from '@/auth';
import Image from 'next/image';
import LogoutButton from '@/app/components//auth/LogoutButton';
import NavbarMenu from './NavbarMenu';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export default async function Navbar() {
  const session = await auth();

  let loggedIn = (
    <Link href={'/login'} className="btn btn-outline btn-primary m-2 ">
      Log In
    </Link>
  );

  if (session?.user) {
    loggedIn = (
      <div className="m-2 p-2 flex gap-2 items-center justify-center transform transition-transform duration-200 hover:scale-120  ">
        <Image
          src={`${session.user.image}`}
          alt={''}
          width={30}
          height={30}
          className="rounded-2xl h-auto w-auto "
        />
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start flex items-center">
        <NavbarMenu />
        <Link href="/" className="flex w-fit justify-start">
          <Image
            src="/movie-night-logo.svg"
            alt="Movie Night"
            height={10}
            width={10}
            className="h-10 w-auto  "
          />
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <Link href={'/search-movie'}>
            <MagnifyingGlassIcon className="h-6 w-6" />
          </Link>
        </button>
        <div>{loggedIn}</div>
      </div>
    </div>
  );
}
