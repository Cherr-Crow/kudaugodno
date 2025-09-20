import { ISwitcher } from './Switcher.types';

const Switcher: React.FC<ISwitcher> = ({
  label = '',
  isActive = false,
  isDisabled = false,
  onToggle = () => {},
}) => {
  const handleToggle = () => {
    if (isDisabled) return;
    onToggle(!isActive);
  };

  return (
    <div className='flex items-center space-x-1'>
      <button
        className={`relative flex h-8 w-16 rounded-2xl transition-colors duration-300 ${isDisabled ? 'cursor-not-allowed bg-blue-50 outline outline-1 outline-blue-100' : isActive ? 'bg-blue-400 outline outline-1 outline-blue-500' : 'bg-blue-200 outline outline-1 outline-blue-300'} ${!isDisabled && 'hover:bg-blue-100 hover:outline hover:outline-blue-200'} ${!isDisabled && 'hover:drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'} ${!isDisabled && 'active:bg-blue-400 active:outline active:outline-blue-500'} `}
        onClick={handleToggle}
        disabled={isDisabled}
      >
        <span
          className={`absolute left-0 top-0.5 m-1 h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${isActive ? 'translate-x-9' : 'translate-x-0'} drop-shadow-[0_3.81px_11.43px_rgba(0,0,0,0.1)], drop-shadow-[0_0.95px_1.9px_rgba(0,0,0,0.1)]`}
        />
      </button>
      <span className='text-xl'>{isActive ? label || 'On' : 'Off'}</span>
    </div>
  );
};

export default Switcher;
