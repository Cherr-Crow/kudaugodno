import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { MyArticles } from '@/widgets/admin-panel-tourist/reviews/MyArticles';
import { OurAdvantages } from '@/widgets/our-advantages';
import { Reviews } from '@/widgets/reviews';

export default function AboutUs() {
  return (
    <div className='relative flex flex-col gap-6 md:gap-10'>
      <section className='container'>
        <div className='absolute left-0 top-0 z-[-1] h-[218px] w-full rounded-bl-[20px] rounded-br-[20px] bg-[url("/about-us-hero-bg375.png")] bg-cover bg-no-repeat md:h-[380px] md:rounded-bl-[100px] md:rounded-br-[100px] md:bg-[url("/about-us-hero-bg960.png")] lg:bg-[url("/about-us-hero-bg1440.png")]'></div>
        <div className='flex flex-col items-center pt-[33px] text-center md:pt-12'>
          <Typography
            variant='h1'
            className='mb-2 text-[20px] text-white md:mb-3 md:text-6xl'
          >
            О нас
          </Typography>
          <Typography
            variant='subtitle3'
            className='mb-5 text-base font-normal text-white md:mb-20 md:max-w-[601px] md:text-[32px] md:leading-10'
          >
            Узнайте больше о нашем сервисе по подбору и бронированию путешествий
          </Typography>
          <ul className='flex flex-row-reverse flex-nowrap items-center gap-3 md:gap-5'>
            {[1, 2, 3, 4].map((item) => (
              <li
                key={item}
                className={`h-[120px] w-[165px] overflow-hidden rounded-[40px] ${item === 3 && 'hidden md:block'} ${item === 4 && 'hidden lg:block'} md:h-[206px] md:w-[253px] md:even:h-[272px] lg:w-[280px]`}
              >
                <img
                  src='admin-panel-tourist-hotel-review.png'
                  className='h-full w-full object-center'
                  alt={`about-us-hero-pic ${item}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className='container'>
        <div className='flex flex-col gap-4 md:flex-row md:gap-3'>
          <div className='flex flex-col justify-center gap-5 md:max-w-[527px] md:gap-3 lg:max-w-[880px]'>
            <Typography
              variant='h2'
              className='text-[20px] font-semibold leading-[30px] md:text-[28px] md:leading-8 lg:text-[40px] lg:leading-[52px]'
            >
              Мы воплощаем в реальность мечты о дальних странах
            </Typography>
            <Typography
              variant='subtitle3'
              className='text-base font-normal md:text-2xl lg:text-[32px] lg:leading-10'
            >
              Мы всей душой любим путешествия и осуществлять мечты! С нами вы без
              проблем найдете лучший вариант отдыха, а если нет, мы с радостью
              поможем с выбором)
            </Typography>
          </div>
          <img
            src='/frog_sits_on_suitcase.png'
            alt='frog_sits_on_suitcase'
            className='mx-auto w-20 md:w-[140px] lg:w-[155px]'
          />
        </div>
      </section>
      <OurAdvantages className='mb-[-4px] mt-[17px] md:mb-[-54px] md:mt-[0px] lg:mb-[-34px]'>
        <Typography
          variant='h2'
          className='mb-5 text-[20px] font-semibold leading-[30px] md:mb-6 md:text-center md:text-[28px] md:leading-8 lg:text-[40px] lg:leading-[52px]'
        >
          Почему нам доверяют свой отпуск
        </Typography>
      </OurAdvantages>
      <Reviews>
        <Typography variant='m' className='md:text-2xl lg:text-[32px] lg:leading-10'>
          Мы радуемся каждому новому путешественнику
        </Typography>
        <Typography
          variant='h2'
          className='text-[32px] font-extrabold leading-9 md:text-[40px] md:leading-[52px] lg:text-6xl'
        >
          120 000 +
        </Typography>
        <Typography variant='m' className='lg:text-2xl lg:leading-9'>
          туристов уже выбрали нас
        </Typography>
      </Reviews>
      <section className='container items-center md:flex md:flex-col lg:mb-12'>
        <Typography
          variant='h2'
          className='mb-5 text-[20px] font-semibold leading-[30px] md:mb-6 md:text-[28px] md:leading-8 lg:mb-8 lg:text-[40px] lg:leading-[52px]'
        >
          Заказать тур или выбрать отель проще простого
        </Typography>
        <ul className='flex flex-col gap-3 md:w-[526px] md:gap-5 lg:w-full lg:flex-row lg:gap-10'>
          <li
            className='flex h-[264px] w-full flex-col gap-3 rounded-3xl px-4 py-5 shadow-lg lg:h-[268px]'
            style={{
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Typography
              variant='h2'
              className='pl-2 text-base lg:text-2xl lg:font-bold'
            >
              1. Выберите подходящий вариант
            </Typography>
            <div className='relative'>
              <img
                src='about-us-step1.png'
                alt='step1'
                className='h-44 w-full rounded-3xl object-cover lg:h-[168px] lg:w-[260px] lg:rotate-[-5deg]'
              />
              <Typography
                variant='m-bold'
                className='absolute right-0 top-5 flex gap-5 rounded-3xl bg-green-300 py-[10px] pl-7 pr-4 md:right-4 md:pl-[30px] md:pr-5 lg:right-0 lg:top-9 lg:text-[20px] lg:leading-[32px]'
              >
                240 894 ₽
                <SvgSprite
                  name='arrow-pointer'
                  className='color-green-950'
                  color='currentColor'
                  width={14}
                />
              </Typography>
              <Typography
                variant='m'
                className='absolute bottom-[-10px] left-5 rounded-3xl bg-blue-600 px-4 py-3 text-white lg:bottom-[-35px] lg:left-7 lg:rotate-[-5deg] lg:text-[20px] lg:leading-[32px]'
              >
                Приключения в Китае
              </Typography>
            </div>
          </li>
          <li
            className='flex h-[264px] w-full flex-col gap-3 rounded-3xl px-4 py-5 shadow-lg lg:h-[268px] lg:gap-10'
            style={{
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Typography
              variant='h2'
              className='pl-2 text-base lg:text-2xl lg:font-bold'
            >
              2. Забронируйте
            </Typography>
            <div className='flex flex-col gap-2'>
              <Typography variant='m' className='lg:text-[20px] lg:leading-[32px]'>
                Куда: Китай
              </Typography>
              <Typography
                variant='m'
                className='rounded-lg bg-blue-600 px-2 py-3 text-white lg:max-w-[275px]'
              >
                Имя
              </Typography>
              <Typography
                variant='m'
                className='rounded-lg bg-blue-600 px-2 py-3 text-white lg:max-w-[275px]'
              >
                Фамилия
              </Typography>
              <Typography
                variant='m-bold'
                className='self-start rounded-3xl bg-green-300 px-7 py-[10px] lg:rotate-[5deg] lg:self-center lg:text-[20px] lg:leading-[32px]'
              >
                Забронировать
              </Typography>
            </div>
          </li>
          <li
            className='flex h-[264px] w-full flex-col gap-3 rounded-3xl px-4 py-5 shadow-lg lg:h-[268px] lg:gap-[50px]'
            style={{
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Typography
              variant='h2'
              className='pl-2 text-base lg:text-2xl lg:font-bold'
            >
              3. Ждите сообщения от туроператора
            </Typography>
            <div className='relative flex flex-col gap-2'>
              <img
                src='about-us-bubble1.png'
                alt='step3_bubble1'
                className='self-start lg:absolute lg:left-[-50px]'
              />
              <img
                src='about-us-bubble2.png'
                alt='step3_bubble2'
                className='self-end lg:absolute lg:bottom-[-175px]'
              />
            </div>
          </li>
        </ul>
      </section>
      <section className='container'>
        <Typography
          variant='h2'
          className='md:text-28px] mb-5 text-[20px] font-semibold leading-[30px] md:mb-6 md:text-center md:leading-8 lg:mb-8 lg:text-[40px] lg:leading-[52px]'
        >
          С нами сотрудничают
        </Typography>
        <ul className='flex flex-wrap gap-3 md:gap-7'>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <li
              key={item}
              className={`$ rounded-[20px] p-4 shadow-lg md:px-[26.5px] ${item === 5 && 'md:hidden lg:block'} ${item === 6 && 'md:hidden'} lg:px-[42.5px]`}
              style={{
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              }}
            >
              <img
                src='anex-logo.png'
                alt='partner-logo'
                className='h-[27px] w-[72px] md:h-[46px] md:w-[126px]'
              />
            </li>
          ))}
        </ul>
      </section>
      <section className='container flex flex-col gap-5 md:items-center md:gap-6 lg:gap-8'>
        <Typography
          variant='h2'
          className='text-[21px] font-semibold leading-[30px] md:text-[28px] md:leading-8 lg:text-[40px] lg:leading-[52px]'
        >
          А ещё у нас есть программа лояльности
        </Typography>
        <Typography
          variant='m'
          className='mb-[-8px] text-[20px] leading-[30px] md:mb-1 md:text-center md:text-[32px] md:leading-10 lg:max-w-[671px]'
        >
          Наполняй блог рассказами о своих путешествиях и становись амбассадором
        </Typography>

        <div className='flex flex-col gap-5 md:order-1 md:flex-row lg:px-9'>
          <MyArticles />
          <MyArticles />
          <MyArticles className='md:hidden lg:flex' />
        </div>

        <ButtonCustom
          type='button'
          variant='secondary'
          size='s'
          disabled={false}
          className='self-center md:py-4'
        >
          <Typography variant='m-bold' className='md:text-xl md:leading-8'>
            Перейти в блог
          </Typography>
        </ButtonCustom>
      </section>
      <section className=''>
        <div className='z-[-1] flex h-[187px] w-full flex-col items-center justify-center gap-8 rounded-tl-[20px] rounded-tr-[20px] bg-[url("/about-us-final-bg.png")] bg-cover bg-no-repeat md:h-[490px] md:gap-5 md:rounded-tl-[100px] md:rounded-tr-[100px] md:pb-7 lg:h-[460px] lg:pb-0'>
          <Typography
            variant='h2'
            className='text-[20px] leading-8 text-white md:text-[40px] md:leading-[52px] lg:text-6xl'
          >
            Ну что, готов к приключениям?
          </Typography>
          <div className='flex gap-5 md:pl-[218px]'>
            <ButtonCustom
              type='button'
              variant='primary'
              size='s'
              disabled={false}
              className='self-center md:px-14 md:py-5'
            >
              <Typography variant='m-bold' className='md:text-xl md:leading-8'>
                Найти тур
              </Typography>
            </ButtonCustom>
            <img
              src='frog_on_chair.png'
              alt='frog_on_chair'
              className='hidden md:block'
            />
          </div>
        </div>
      </section>
    </div>
  );
}
