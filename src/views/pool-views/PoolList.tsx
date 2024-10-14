import { Loading } from "@/components/Elements";
import { useState, useEffect } from "react";
import { useGetAllPools } from "./api";
import { PoolType } from "./types";
import { PoolCard } from "./PoolCard";
import { Empty } from "@/components/Layouts";

interface PoolListProps {
  limit?: number;
}
export const PoolList = ({ limit }: PoolListProps) => {
  const { data, isLoading } = useGetAllPools({
    filter: {
      paginate: limit
    }
  });

  const [pools, setPools] = useState<PoolType[]>();

  useEffect(() => {
    if (data) {
      setPools(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-4">
        {
          pools && pools?.length > 0 && pools?.map((pool: PoolType) => (
            <PoolCard pool={pool} key={pool?.id}/>
          ))
        }
      </div>
      {
        pools && pools?.length < 1 &&
        <Empty title="No active pool, check back later" />
      }
    </>
  )
}