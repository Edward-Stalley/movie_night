import Image from "next/image";
import { MovieNightHome } from "./components/icons/movieNightHome";
import { PopcornDetailed } from "./components/icons/popcorn";

export default function Home() {
  return (
    <div className="relative p-10 grid grid-cols-12 grid-rows-12 gap-1 w-full h-dvh overflow-hidden">
      <div className="row-start-1 row-span-12 col-start-6 col-span-6 z-20">
        <div className="">
          <MovieNightHome className="" />
        </div>
      </div>
      {/* <div className="absolute inset-y-0 left-0 w-2/3 bg-linear-to-br from-gray-900 via-gray-800  pointer-events-none"></div> */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-primary-content bg-linear-to-tr from-black via-gray-800 to-slate-800 [clip-path:polygon(0%_0%,100%_40%,0%_500%)] pointer-events-none"></div> */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-primary-content bg-linear-to-tr from-black via-base-300 to-base-100 [clip-path:polygon(0%_0%,100%_0%,0%_100%)] pointer-events-none"></div> */}
      <div className="absolute top-0 left-0 w-full h-full bg-primary-content bg-linear-to-tr from-black via-gray-800 to-slate-800 [clip-path:polygon(0%_0%,90%_20%,0%_500%)] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-primary bg-linear-to-br from-orange-300 via-orange-500 to-bg-primary  [clip-path:polygon(-60%_0%,66%_55%,50%_0%)] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-fu/ll h-full bg-primary bg-linear-to-br from-orange-300 via-bg-primary  [clip-path:polygon(-100%_0%,10%_60%,50%_0%)] pointer-events-none"></div>
      <div className="col-span-1 col-start-1 row-start-1 row-span-6 relative rounded-2xl ">
        <Image
          src={`https://image.tmdb.org/t/p/original/12EeSboRofP3CI4SPmMFNNXCbtY.jpg`}
          alt={""}
          fill
          quality={100}
          className=" h-auto w-auto object-cover rounded-2xl"
        />
      </div>
      <div className="bg-base-content col-span-3 col-start-3 row-start-3 row-span-2 relative rounded-2xl">
        <Image
          src={`https://image.tmdb.org/t/p/original/gl0jzn4BupSbL2qMVeqrjKkF9Js.jpg`}
          alt={""}
          fill
          className=" h-auto w-auto object-cover object-top rounded-2xl"
        />
      </div>
      <div className="bg-base-content col-span-1 col-start-2 row-start-3 row-span-2 relative rounded-2xl ">
        <Image
          src={`https://media.themoviedb.org/t/p/w220_and_h330_face/15uOEfqBNTVtDUT7hGBVCka0rZz.jpg`}
          alt={""}
          fill
          className=" h-auto w-auto object-top rounded-2xl"
        />
      </div>
      <div className="bg-accent col-span-1 col-start-2 row-start-5 row-span-2 relative rounded-2xl ">
        <Image
          src={`https://image.tmdb.org/t/p/original/neVhDxYVsmMMSuhXpHMT3LMK9f.jpg`}
          alt={""}
          fill
          quality={100}
          className=" h-auto w-auto object-cover rounded-2xl"
        />
      </div>
      <div className="col-span-1 col-start-3 row-start-5 row-span-4 relative rounded-2xl ">
        <div className="flex flex-col h-full gap-1">
          <div className="relative h-1/2">
            <Image
              src={`https://image.tmdb.org/t/p/original/tH4Jvr2Rg7UQFqcndE6Mws4p7sP.jpg`}
              alt={""}
              fill
              quality={100}
              className=" w-auto  object-cover rounded-tl-2xl rounded-tr-2xl"
            />
          </div>
          <div className="relative h-1/2">
            <Image
              src={`https://media.themoviedb.org/t/p/w220_and_h330_face/sMWPuhgtuUuFHcwSlp73EGACNrl.jpg`}
              alt={""}
              fill
              quality={100}
              className=" w-auto object-cover  rounded-bl-2xl rounded-br-2xl "
            />
          </div>
        </div>
      </div>
      <div className="bg-accent col-span-3 col-start-4 row-start-5 row-span-2 relative rounded-2xl">
        Box
      </div>
      <div className="bg-accent col-span-3 col-start-4 row-start-5 row-span-2 relative rounded-2xl">
        <Image
          src={`https://image.tmdb.org/t/p/original/eFth6zw4PEInzr2Y64mYVN1zbBi.jpg`}
          alt={""}
          fill
          quality={100}
          className=" h-auto w-auto object-cover rounded-2xl"
        />
      </div>
      <div className=" border-2 text-base-content col-span-5 col-start-4 row-start-7 row-span-2 flex justify-center items-center z-20  rounded-2xl bg-linear-to-l from-black via-gray-900 to-slate-800 ">
        <h1 className="text-8xl font-extrabold text-neutral-content text-outline [text-shadow:0_4px_20px_rgba(0,0,0,0.8)] font-sans ">
          Movie Night
        </h1>
      </div>
    </div>
  );
}
