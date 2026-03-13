'use client';
import { useEffect, useState } from 'react';
import { EditPen } from '../icons';
import { WatchedMovie } from '@/lib/types/domain';

export default function DateInput({ movie }: { movie: WatchedMovie }) {
  const [displayOnly, setDisplayOnly] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(!movie.watchedOn);
  const [currentDate, setCurrentDate] = useState<string | undefined>(
    movie.watchedOn.toLocaleDateString(),
  );

  const toggleEditing = () => {
    console.log('clicked', movie);
    setEditing((prevState) => !prevState);
  };

  const handleChange = () => {};

  useEffect(() => {
    console.log('editing', editing);
  }, [editing]);

  return (
    <div className="flex pt-1 pb-1 gap-1 items-center  ">
      <div className="flex justify-center items-center p-1 gap-2 rounded-2xl bg-base-300 h-8">
        <div className="flex justify-center items-center w-30 pl-1  ">
          <div>
            {currentDate && !editing ? (
              <p className="text-secondary h-6 flex items-center">
                {movie.watchedOn.toLocaleDateString('en-US')}
              </p>
            ) : (
              <input
                type="date"
                value={currentDate || ''}
                onChange={handleChange}
                className="input rounded-2xl h-6"
              />
            )}
          </div>
        </div>
        <div>
          <button onClick={() => toggleEditing()} className="flex items-center justify-center   ">
            <EditPen className="btn btn-primary btn-circle h-6 w-10" />
          </button>
        </div>
      </div>
    </div>
  );
}
