import { ButtonCustom } from '@/shared/ui/button-custom';
import { Typography } from '@/shared/ui/typography';

export function WzhuhError({ onRepeat }: { onRepeat: (reset: true) => void }) {
  return (
    <div className='flex min-h-[30vh] flex-col items-center justify-center gap-5 rounded-[20px] bg-blue-100 text-center'>
      <Typography variant='l-bold'>Ой! По Вашему запросу ничего нет!</Typography>
      <ButtonCustom
        variant='wzhuh'
        size='m'
        className='px-9 py-5 text-white'
        onClick={() => onRepeat(true)}
      >
        <Typography variant='l-bold'>Попробовать еще раз</Typography>
      </ButtonCustom>
    </div>
  );
}
