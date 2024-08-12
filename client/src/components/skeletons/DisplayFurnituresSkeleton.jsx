export const DisplayFurnituresSkeleton = ({ numSkeletons }) => {
  return (
    <>
      {Array.from({ length: numSkeletons }).map((_, index) => (
        <article className="relative cursor-pointer animate-pulse" key={index}>
          <div className="flex items-center justify-center overflow-hidden bg-gray-200 rounded-lg aspect-square">
            <svg
              className="w-10 h-10 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="absolute top-0 m-1 rounded-full "></div>
          <div className="flex items-start justify-between mt-4">
            <div className="w-full">
              <div className="h-2.5 bg-gray-200 rounded-full max-w-[480px] mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};
