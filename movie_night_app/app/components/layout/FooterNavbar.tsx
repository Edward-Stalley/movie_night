import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { EyeIcon, FilmIcon, ListBulletIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type FooterLinkProps = {
  icon: React.ElementType;
  label: string;
  href: string;
};

const FooterLink = ({ icon: Icon, label, href }: FooterLinkProps) => {
  return (
    <Link href={href} className="btn btn-soft p-1 m-0 hover:bg-base-100  border-0">
      <div className="flex flex-col items-center ">
        <Icon className="h-5 w-5 " />
        <label className="text-xs"> {label}</label>
      </div>
    </Link>
  );
};

export default function FooterNavbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm gap-6 justify-center border-t-2 fixed bottom-0 h-16 flex">
      <FooterLink icon={MagnifyingGlassIcon} label="Search" href="/search-movie" />
      <FooterLink icon={FilmIcon} label="Movies" href="/movies" />
      <FooterLink icon={EyeIcon} label="Watched" href="/watched-movies" />
      <FooterLink icon={PlusCircleIcon} label="Create" href="/vote-session/create" />
      <FooterLink icon={ListBulletIcon} label="Sessions" href="/vote-session/sessions" />
    </div>
  );
}
