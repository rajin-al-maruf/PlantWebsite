
const SkeletonCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto gap-10 mt-36 px-4 md:px-6 lg:px-8 xl:px-0 animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-full aspect-square bg-neutral-200 rounded-lg"></div>

      {/* Right Section */}
      <div className="flex flex-col">
        <div className="h-6 bg-neutral-200 rounded w-1/3 mb-4"></div>
        <div className="h-5 bg-neutral-200 rounded w-1/4 mb-6"></div>

        {/* Quantity buttons */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-5 w-16 bg-neutral-200 rounded"></div>
          <div className="h-8 w-8 bg-neutral-200 rounded-md"></div>
          <div className="h-6 w-8 bg-neutral-200 rounded-md"></div>
          <div className="h-8 w-8 bg-neutral-200 rounded-md"></div>
        </div>

        {/* Dropdown placeholders */}
        <div className="h-24 bg-neutral-200 rounded mb-4"></div>
        <div className="h-24 bg-neutral-200 rounded mb-4"></div>

        {/* Buttons */}
        <div className="h-10 bg-neutral-200 rounded mb-3"></div>
        <div className="h-10 bg-neutral-200 rounded"></div>

      </div>

    </div>
  );
}
export default SkeletonCard;
