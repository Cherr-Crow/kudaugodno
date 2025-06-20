import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { NameSvg } from '@/shared/ui/svg-sprite/SvgSprite.types';
import { Typography } from '@/shared/ui/typography';

const socialButtons: {
  svg: NameSvg;
  label: string;
  iconWidth: number;
  iconClassName?: string;
  buttonClassName?: string;
}[] = [
  {
    svg: 'google',
    label: 'Google',
    iconWidth: 20,
    iconClassName: 'pt-[2px] mr-1 md:pt-[1px]',
    buttonClassName: 'md:relative md:z-[1]',
  },
  {
    svg: 'vkontakte',
    label: 'Вконтакте',
    iconWidth: 22,
    iconClassName: 'pt-[6px] mr-1 md:pt-[2px] md:h-4 md:w-4',
    buttonClassName: '',
  },
  {
    svg: 'yandex',
    label: 'Яндекс',
    iconWidth: 15,
    iconClassName: 'md:scale-75 md:w-4',
    buttonClassName: '',
  },
];

export function OtherWaysToAuth() {
  return (
    <div className='w-full md:flex md:flex-col md:items-center'>
      <Typography className='mb-4 block text-nowrap text-center text-base font-semibold text-grey-950 md:mb-[21px] md:text-[18px] lg:mb-[25px] lg:text-[20px]'>
        Другие способы входа
      </Typography>

      <ul className='flex w-full flex-col gap-3 md:max-w-[505px] md:flex-row md:justify-between'>
        {socialButtons.map(
          ({ svg, label, iconWidth, iconClassName, buttonClassName }) => (
            <li key={svg} className='w-full md:w-fit'>
              <ButtonCustom
                type='button'
                variant='wzhuh'
                size='m'
                className={`flex w-full justify-center gap-2 py-[10px] md:w-fit md:items-center md:gap-2 md:px-[31px] md:py-[24px] ${buttonClassName}`}
              >
                <span className={`h-[20px] w-[20px] ${iconClassName}`}>
                  <SvgSprite name={svg} width={iconWidth} color='#fff' />
                </span>
                <Typography variant='m-bold' className='text-white md:text-[20px]'>
                  {label}
                </Typography>
              </ButtonCustom>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
