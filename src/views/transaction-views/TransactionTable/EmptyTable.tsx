import { Button } from '@/components/Elements';
import { Empty } from '@/components/Layouts';
import { DEPOSIT_PREFIX_PATH } from '@/config';

export const EmptyTable = () => {
  return (
    <div className=" max-w-screen-md mx-auto text-center flex flex-col items-center justify-center p-6">
      <Empty title='No transaction found'/>
      <Button.Link to={`${DEPOSIT_PREFIX_PATH}`}>Make a deposit now</Button.Link>
    </div>
  );
};
