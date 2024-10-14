// import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';

import { Button } from '../Button';

import { useTableContextData } from './Table';

export const TableHead = () => {
  const { column, action, isLoading, isFetching } = useTableContextData();
  return (
    <thead className="text-gray-600 dark:text-gray-300 capitalize bg-gray-100 dark:bg-bgDark-800">
      <tr>
        {column?.map(({ sortFn, accessor, title }) => (
          <th
            key={accessor}
            scope="col"
            className="whitespace-nowrap min-w-[60px] text-base font-semibold px-4 py-3"
          >
            {sortFn ? (
              <Button
                disabled={isFetching}
                variant="text"
                endIcon={
                  <span className="flex text-gray-500 flex-col justify-center">
                    {/* <ArrowIcon className="-scale-y-100 w-2" /> */}
                    {/* <ArrowIcon className="w-2" /> */}
                  </span>
                }
                onClick={() => sortFn(accessor)}
                className="text-inherit capitalize"
              >
                {title}
              </Button>
            ) : (
              title
            )}
          </th>
        ))}
        {!isLoading && action && <th scope="col" className="px-2 py-3"></th>}
      </tr>
    </thead>
  );
};
