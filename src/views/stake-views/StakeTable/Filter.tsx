interface SearchProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
};

export const SearchInput = ({ value, onChange }: SearchProps) => {
  return (
    <div className="">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <input
          type="text"
          name="search"
          value={value}
          onChange={onChange}
          className="p-2 pr-11 text-sm font-medium border-transparent border hover:border focus:border hover:border-gray-400 transition-colors bg-gray-200/30 dark:bg-bgDark-800 dark:text-white duration-200 appearance-none block w-full text-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 autofill:!bg-white"
          placeholder="Search bets"
          required
        />
        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none ">
          <div className="h-3/5 w-px bg-gray-200" />
          <button type="button" className=" h-full p-2  rounded-r-lg">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
