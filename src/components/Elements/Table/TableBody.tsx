import { ReactNode } from 'react';

import { Skeleton } from '../Skeleton';

import { useTableContextData } from './Table';

export const TableBody = () => {
  const { data, rawData, isLoading, column, action } = useTableContextData();
  const res = isLoading ? new Array(10).fill({}) : data;

  return (
    <tbody>
      {res?.map((item, index) => (
        <tr
          key={index}
          className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-blue-600/10 last-of-type:border-none"
        >
          {column?.map(({ accessor, wrapper = ({ children }: { children: ReactNode }) => <>
                {children}
              </> }) => {
            const Container = wrapper;
            return (
              <td key={accessor} className="py-3 px-4 min-w-[40px] font-medium">
                {isLoading ? (
                  <Skeleton variant="rounded" />
                ) : (
                  <Container>{item?.[accessor] || '-'}</Container>
                )}
              </td>
            );
          })}
          {!isLoading && action && rawData && (
            <th scope="col" className="px-3 py-3">
              {action(rawData[index])}
            </th>
          )}
        </tr>
      ))}
    </tbody>
  );
};
