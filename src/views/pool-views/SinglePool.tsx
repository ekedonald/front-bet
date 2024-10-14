import { useDocumentTitle } from "@/hooks";
import { useGetPool } from "./api";
import { useEffect, useState } from "react";
import { Button, Divider, Loading } from "@/components/Elements";
import { PoolType } from "./types";
import { useNavigate, useParams } from "react-router-dom";
import { Trade, TradeDetails } from "@/components/Layouts/Trade";
import Breadcrumbs from "@/components/Elements/Breadcrumbs/Breadcrumbs";
import PoolTokenIndicator from "./PoolTokenIndicator";

interface PoolPropType {
  title: string;
}



const SinglePool = ({ title }: PoolPropType) => {
  useDocumentTitle(title);
  
  const { poolID } = useParams();
  
  const { data, isLoading, isError } = useGetPool({
    id: poolID
  });
  
  const navigate = useNavigate();
  
  const [pool, setPool] = useState<PoolType>();

  const [defaultToken, setDefaultToken] = useState("");

  const breadcrumbItems = [
    { label: 'Pools', link: '..' },
    { label: pool ? pool?.ticker?.name : 'ticker', link: '#' }
  ];
  
  useEffect(() => {
    if (data) {
      setPool(data);
    }
  }, [data]);

  useEffect(() => {
    if(pool){
      setDefaultToken(pool?.ticker?.base_token?.symbol);
    }
  }, [pool]);

  if (isLoading) {
    return <Loading />;
  }

  if(isError){
    navigate('../');
  }

  return (
    <div className="pool-wrapper">
      <Breadcrumbs items={breadcrumbItems} />
      <div className='grid lg:grid-cols-10 gap-3'>
        <div className='lg:col-span-6 bg-white dark:bg-bgDark-800 lg:p-4 rounded-xl lg:border lg:border-gray-200 dark:border-gray-700'>
          <div className="flex !m-0 justify-between items-center mb-5 border dark:border-bgDark-500 border-bgDark-300 px-2 py-2 rounded-lg gap-3">
            <div className="flex justify-start items-center gap-3 lg:gap-4">
              <div className="avatar-group -space-x-3">
                <div className="avatar">
                  <div className="w-5">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-5">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
              </div>
              <div>
                <h5 className="uppercase text-sm font-semibold">{pool?.ticker?.name}</h5>
              </div>
              <Divider />
              {
                pool &&
                <PoolTokenIndicator handleSetDefaultToken={setDefaultToken} token={pool?.ticker?.base_token} defaultSymbol={defaultToken}/>
              }
              <Divider />
              {
                pool &&
                <PoolTokenIndicator handleSetDefaultToken={setDefaultToken} token={pool?.ticker?.target_token} defaultSymbol={defaultToken}/>
              }
            </div>
            <div className="">
              <Button.Link className="text-xs btn btn-sm" to='../'>Pools</Button.Link>
            </div>
          </div>
          <div className="hidden lg:block mt-5">
            {
              pool && 
              <TradeDetails pool={pool} defaultToken={defaultToken}/>
            }
          </div>
        </div>
        <div className='lg:col-span-4  bg-white dark:bg-bgDark-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700'>
          {
            pool &&
            <Trade pool={pool}/>
          }
        </div>
      </div>
    </div>
  );
};

export default SinglePool;
