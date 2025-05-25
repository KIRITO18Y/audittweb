import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, } from '@fortawesome/free-solid-svg-icons';
export const ButtonDeletes = ({ id, onDelete }: { id: number; onDelete: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void }) => {
  return (
    <button className="w-6 h-6 rounded-full bg-red-300  border-red-400 flex items-center justify-center hover:border-red-500 mr-2 cursor-pointer"
      onClick={(e) => onDelete(e, id)}>
      <FontAwesomeIcon icon={faMinus} className='text-red-600 border-red-400' />
    </button>
  );
};
export default ButtonDeletes;