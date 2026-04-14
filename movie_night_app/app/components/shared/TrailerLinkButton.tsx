import { LinkIcon } from '@heroicons/react/20/solid';

type TrailerLinkType = {
  trailerLink: string;
};

export function TrailerLinkButton({ trailerLink }: TrailerLinkType) {
  return (
    <button className="btn btn-primary btn-soft  h-5 ">
      <a
        className=" p-2 m-2"
        href={`${trailerLink ?? '#'}`}
        target="blank"
        rel="noopener noreferrer"
      >
        <LinkIcon className="h-5 w-5" />
      </a>
    </button>
  );
}
