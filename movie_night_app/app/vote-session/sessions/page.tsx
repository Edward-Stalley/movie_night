import Link from 'next/link';

export default function VotingSessions() {
  // TO DO: get sessions API not hardcoded
  const sessionIds = [29,32];

  const sessionList = sessionIds.map((id) => (
    <Link className="bg-primary p-2 rounded-2xl text-3xl" key={id} href={`/vote-session/${id}`}>
      Session {id}
    </Link>
  ));
  return (
    <div className=" flex flex-col">
      <div className="text-4xl">Sessions List</div>
      {sessionList}
    </div>
  );
}
