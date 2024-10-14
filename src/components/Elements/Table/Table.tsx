import clsx from 'clsx';
import { createContext, ReactNode, useContext } from 'react';

import { ErrorBoundary } from '@/components/Layouts';

import { TableBody } from './TableBody';
import { TableHead } from './TableHead';
import { TablePagination } from './TablePagination';

type TableProps = {
  title?: ReactNode;
  header?: ReactNode;
  head?: ReactNode;
  body?: ReactNode;
  name?: string;
  tableHeightClass?: string;
  className?: string;
  data?: Record<string, any>[];
  rawData?: Record<string, any>[];
  action?: (data: any) => ReactNode;
  pagination?: ReactNode;
  meta?: {
    page: number;
    count: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
  };
  isLoading?: boolean;
  isFetching?: boolean;
  emptyComponent?: ReactNode;
  errorComponent?: ReactNode;
  column: {
    title: string;
    sortFn?: (key: string) => void;
    wrapper?: (props: any) => JSX.Element;
    accessor: string; // accessor is the "key" in the data
  }[];
};

type TableContextData = {
  data?: Record<string, any>[];
  rawData?: Record<string, any>[];
  isLoading: boolean;
  isFetching?: boolean;
  action?: (data: any) => ReactNode;
  meta?: {
    page: number;
    count: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
  };
  column: {
    title: string;
    sortFn?: (key: string) => void;
    wrapper?: (props: any) => JSX.Element;
    accessor: string; // accessor is the "key" in the data
  }[];
};

const TableContext = createContext<TableContextData | null>(null);

export const Table = ({
  head,
  body,
  data,
  rawData,
  isLoading = false,
  isFetching = false,
  column,
  action,
  pagination,
  className,
  meta,
  emptyComponent,
  name,
  errorComponent,
}: TableProps) => {
  return (
    <ErrorBoundary>
      <TableContext.Provider
        value={{
          isLoading,
          isFetching,
          data,
          rawData,
          column,
          action,
          meta,
        }}
      >
        {!isLoading && (!data || data.length === 0) ? (
          <>{data?.length === 0 ? emptyComponent : errorComponent}</>
        ) : (
          <div className={className}>
            <div className={clsx('overflow-auto overscroll-x-contain relative w-full')}>
              <table aria-label={name} className="w-full text-sm text-left">
                {head || <TableHead />}
                {body || <TableBody />}
              </table>
            </div>
            {!isLoading && meta && (pagination || <TablePagination {...meta} />)}
          </div>
        )}
      </TableContext.Provider>
    </ErrorBoundary>
  );
};

Table.Head = TableHead;
Table.Body = TableBody;

export const useTableContextData = () => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return { ...context };
};
