"use client";

interface PhotoFilterProps {
  filterList: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const PhotoFilter = ({
  filterList,
  activeFilter,
  setActiveFilter,
}: PhotoFilterProps) => {
  return (
    <div className="flex justify-center flex-wrap gap-2 mb-12">
      {filterList.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
            activeFilter === filter
              ? "bg-teal-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {activeFilter === filter ? filter : filter.split("・")[0]}
        </button>
      ))}
    </div>
  );
};

export default PhotoFilter;
