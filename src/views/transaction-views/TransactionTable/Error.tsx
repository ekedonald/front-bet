import { Button } from '@/components/Elements';
import { Empty } from '@/components/Layouts';
import { DEPOSIT_PREFIX_PATH } from '@/config';

export const ErrorComponent = () => {
  return (
    <div className="max-w-screen-md mx-auto text-center h-full flex flex-col items-center justify-center gap-8 p-6">
      <div>
        <Empty title='No transaction found'/>
        <Button.Link to={`${DEPOSIT_PREFIX_PATH}`}>Make a deposit now</Button.Link>
      </div>
    </div>
  );
};
