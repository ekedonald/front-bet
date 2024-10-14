import { Button } from '@/components/Elements';
import { Empty } from '@/components/Layouts';
import { POOL_PREFIX_PATH } from '@/config';

export const EmptyTable = () => {
  return (
    <div className=" max-w-screen-md mx-auto text-center flex flex-col items-center justify-center p-6">
      <Empty title='No bet found'/>
      <Button.Link to={`/${POOL_PREFIX_PATH}`}>Start Betting</Button.Link>
    </div>
  );
};
