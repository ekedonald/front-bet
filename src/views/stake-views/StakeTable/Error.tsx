import { Empty } from '@/components/Layouts';

export const ErrorComponent = () => {
  return (
    <div className="max-w-screen-md mx-auto text-center h-full flex flex-col items-center justify-center gap-8 p-6">
      <div>
        <Empty title='Bet history is empty' />
      </div>
    </div>
  );
};
