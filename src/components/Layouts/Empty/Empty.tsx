import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

interface EmptyPropsType {
  title: string;
}
export const Empty = ({ title }: EmptyPropsType) => {
  return (
    <div className="flex justify-center items-center h-60">
      <div className='text-center'>
        <FontAwesomeIcon icon={faFolderOpen} size="5x" className="mr-2" />
        <h4 className='mt-5 font-extralight text-xl'>{ title }</h4>
      </div>
    </div>
  );
}