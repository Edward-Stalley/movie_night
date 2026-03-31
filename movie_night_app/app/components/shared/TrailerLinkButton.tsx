type TrailerLinkType = {
  trailerLink: string;
};

export function TrailerLinkButton({ trailerLink }: TrailerLinkType) {
  return (
    <button className="btn btn-primary btn-soft w-full ">
      <a
        className=" p-2 m-2"
        href={`${trailerLink ?? '#'}`}
        target="blank"
        rel="noopener noreferrer"
      >
        Trailer Link
      </a>
    </button>
  );
}
