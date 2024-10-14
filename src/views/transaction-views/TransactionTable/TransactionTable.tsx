import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Popover, Section, Table } from '@/components/Elements';
import { AuthUser } from '@/views/auth-views/types';
import { useModal } from '@/hooks';
import { useAuth } from '@/libs/auth';
import { format } from '@/libs/date';
import { EmptyTable } from './EmptyTable';
import { ErrorComponent } from './Error';
import { SearchInput } from './Filter';
import { FilterType } from '@/views/pool-views/types';
import { useGetUserTransactions } from '../api';
import { Transaction } from '../types';
import { TransactionStatus } from '@/components/Elements/BetResult/TransactionStatus';
import { BetStatus } from '@/components/Elements/BetResult/BetStatus';
import { TRANSACTION_PREFIX_PATH } from '@/config';

function filterQueryParam(arr: string[], obj: Record<string, any>) {
  const filteredObj: Record<string, any> = {};
  for (const key in obj) {
    if (arr.includes(key)) {
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
}

export const TransactionTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryKeyList = ['page', 'search', 'plan', 'roles', 'sortBy', 'sort'];
  const _temp = Object.fromEntries(searchParams);
  const queries = filterQueryParam(queryKeyList, _temp);

  const { user } = useAuth();

  const [modalContent, setModalContent] = useModal();

  const [order, setOrder] = useState<{ key: string; type: 'asc' | 'desc' }>({
    key: '',
    type: 'desc',
  });
  const [filters, setFilters] = useState<FilterType>({ page: 1, ...queries, paginate: 20 });
  const [tableData, setTableData] = useState<Transaction[]>([]);

  const handleSearchParams = useCallback(
    (values: any) => {
      const data = {
        ...queries,
        ...values,
      };
      Object.keys(data).forEach((key) => {
        if (!data[key]) {
          delete data[key];
        }
      });
      setSearchParams(data, { replace: true });
    },
    [queries, setSearchParams]
  );

  // Handle Sort
  const handleSort = useMemo(
    () => (key: string) => {
      setOrder({ key, type: order.type === 'asc' ? 'desc' : 'asc' });

      const tableDataCopy: any[] = [...tableData];

      tableDataCopy.sort((a, b) => {
        const fnameA = a[key]?.toLowerCase() || '';
        const fnameB = b[key]?.toLowerCase() || '';

        if (order.type === 'asc') {
          return fnameB.localeCompare(fnameA, 'en', {});
        }

        return fnameA.localeCompare(fnameB);
      });
      setTableData(tableDataCopy);
    },
    [order.type, tableData]
  );

  useEffect(() => {
    handleSearchParams({ ...filters });
  }, [filters]);

  const { data, error, isLoading, isFetching } = useGetUserTransactions({
    filter: {
      ...filters,
    },
  });

  useEffect(() => {
    if (data) {
      setTableData(data?.data);
    }
  }, [data]);

  const column = useMemo(
    () => [
      {
        title: 'Transaction Id',
        accessor: 'id',
      },
      {
        title: 'Type',
        accessor: 'type',
        sortFn: handleSort,
      },
      {
        title: 'Status',
        accessor: 'status',
        sortFn: handleSort,
      },
      {
        title: 'Amount',
        accessor: 'amount',
        sortFn: handleSort,
      },
      {
        title: 'Date Created',
        accessor: 'createdAt',
        sortFn: handleSort,
      },
    ],
    [handleSort]
  );

  const allBets = useMemo(
    () =>
      tableData?.map((transaction) => ({
        ...transaction,
        TransactionID: transaction?.id, 
        status: <TransactionStatus status={transaction?.status}/>,
        type: <BetStatus status={transaction?.type}/>,
        createdAt: format(new Date(transaction?.created_at), 'dd/MMM/yyyy HH:mm:ss'),
      })),
    [filters.page, tableData]
  );

  return (
    <>
      <Section className="rounded-lg scroll-smooth bg-white dark:bg-bgDark-700 shadow-sm shadow-light dark:shadow-dark w-full">
        <div className="flex flex-wrap gap-4 items-center px-4 py-6">
          <div className="flex gap-2 flex-wrap items-center">
            <SearchInput
              value={filters?.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
            />
          </div>
        </div>
        <Table
          name="User List"
          isLoading={isLoading}
          isFetching={isFetching}
          column={column}
          rawData={allBets}
          emptyComponent={<EmptyTable />}
          errorComponent={<ErrorComponent />}
          meta={{
            page: Number(filters.page),
            count: Number(data?.total),
            rowsPerPage: Number(data?.per_page),
            onPageChange: (page: any) => setFilters({ ...filters, page }),
          }}
          data={allBets}
          action={(acc: AuthUser) => (
            <Popover
              placement="auto-end"
              disabled={acc.email === user?.email}
              className="py-2 px-1 rounded-md bg-white dark:bg-bgDark-700 space-y-3 w-max"
              trigger={() => (
                <svg
                  className="mx-1"
                  width={3}
                  height={13}
                  viewBox="0 0 3 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" fillOpacity="0.5" />
                  <circle cx="1.5" cy="6.5" r="1.5" fill="currentColor" fillOpacity="0.5" />
                  <circle cx="1.5" cy="11.5" r="1.5" fill="currentColor" fillOpacity="0.5" />
                </svg>
              )}
            >
              <Popover.Item>
                <Button.Link
                  to={`${TRANSACTION_PREFIX_PATH}/${acc.id}`}
                  // startIcon={<ViewIcon />}
                  variant="text"
                  size="sm"
                  className="!flex px-2 text-gray-600 dark:text-gray-300 w-full !justify-start"
                >
                  Details
                </Button.Link>
              </Popover.Item>
            </Popover>
          )}
        />
      </Section>
      {modalContent}
    </>
  );
};
