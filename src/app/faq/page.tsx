'use client';

import React, { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useScreen } from 'usehooks-ts';
import { z } from 'zod';

import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { useToast } from '@/shared/ui/toast/toastService';
import { Typography } from '@/shared/ui/typography';

const nameRegex = /^[a-zA-Zа-яА-ЯёЁ'-]+$/;
const FormSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: 'Введите имя' })
    .min(2, { message: 'Имя слишком короткое' })
    .max(20, { message: 'Имя слишком длинное' })
    .regex(nameRegex, { message: 'Недопустимые символы' }),
  email: z
    .string()
    .trim()
    .nonempty({ message: 'Введите Email' })
    .email({ message: 'Введи действительный адрес электронной почты' })
    .refine((val) => !val.includes(' '), {
      message: 'Email не должен содержать пробелы',
    }),
  question: z.string().trim().nonempty({ message: 'Введите сообщение' }),
});

export default function Faq() {
  const windowWidth = useScreen();
  const { showToast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('Инструкции');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  type FormData = z.infer<typeof FormSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      question: '',
    },
  });

  const onSubmit = () => {
    try {
      showToast('Отправлено! Скоро ответим!', 'success');
      reset();
    } catch {
      showToast('Сбой отправки! Еще рзок?', 'error');
    }
  };
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <>
      <div className="relative flex h-[116px] items-center justify-center rounded-b-[20px] bg-blue-600 bg-[url('/admin-panel-tourist-bg1446.svg')] bg-cover bg-no-repeat md:h-[156px] md:rounded-b-[100px]">
        <Typography
          variant='h1'
          className={`text-[2rem] text-white md:text-[2.5rem] lg:text-6xl ${'font-semibold'} lg:p-0`}
        >
          Вопрос — Ответ
        </Typography>
      </div>
      <div className='container'>
        <section className='relative flex flex-col items-center justify-between md:flex-row md:items-center lg:justify-start'>
          <div className='absolute -top-[32px] h-[200px] md:relative md:-left-0 md:top-0 md:flex md:h-[253px] md:w-[253px] md:justify-center lg:mr-5 lg:h-[320px] lg:w-[320px]'>
            <picture>
              <source
                srcSet='frog-sits-on-suitcase-desctop.png'
                media='(min-width: 1380px)'
              />
              <img
                src='frog_sits_on_suitcase375.png'
                alt='Лягушка с чемоданом'
                className={'h-full w-full'}
              ></img>
            </picture>
          </div>

          <div className='pt-[10.60rem] md:max-w-[527px] md:pt-0 lg:w-full lg:max-w-[770px]'>
            <Typography
              className='text-#1A1F4C md:text-lg md:leading-6 lg:text-xl lg:leading-8'
              variant={windowWidth?.width < 1380 ? 'm' : 'l'}
            >
              Наши специалисты готовы ответить на любые вопросы об интересующих тебя
              турах и услугах. Для удобства мы сделали подборку ответов на часто
              задаваемые вопросы. Если здесь нет ответа на твой вопрос, напиши
              его в форме обратной связи, наш специалист оперативно ответит!
            </Typography>
          </div>
        </section>
        <section className='mt-10 md:mt-4 lg:mt-10'>
          <ul className='mb-3 flex flex-nowrap justify-around gap-1 text-nowrap rounded-[9999px] bg-[#C7F85E] px-2 py-2 md:px-2 md:py-2 lg:mb-6 lg:mt-0 lg:justify-start'>
            {['Инструкции', 'О сервисе', 'Оплата', 'Страховка', 'Виза'].map(
              (tab) => (
                <li
                  key={tab}
                  className={`cursor-pointer rounded-[40px] px-1 py-1 text-center md:w-1/5 ${activeTab === tab ? 'bg-white' : ''} md:px-4 md:py-3`}
                  onClick={() => setActiveTab(tab)}
                >
                  <Typography variant={windowWidth?.width < 840 ? 's' : 'l'}>
                    {tab}
                  </Typography>
                </li>
              ),
            )}
          </ul>
          <div className='mx-auto'>
            {activeTab === 'Инструкции' && (
              <div
                className='rounded-[20px] px-4 py-4 text-[#1A1F4C] shadow-xl md:py-8 md:pb-8 md:pl-8 md:pr-9 lg:py-10 lg:pl-10'
                style={{
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Typography
                  className='mb-5 text-xl font-bold md:mb-5 md:text-3xl lg:mb-7 lg:text-[2.5rem] lg:leading-[3.25rem]'
                  variant='h2'
                >
                  Инструкции
                </Typography>
                <ul className='flex flex-col gap-3 text-wrap md:gap-4'>
                  {[
                    {
                      title: 'Информация о работе с личным кабинетом',
                      content:
                        'Для бронирования тура/отеля вам необходимо зарегистрироваться в личном кабинете. Вся информация по бронированию/поездке будет отображаться вличном кабинете. В личном кабинете вам необходмио заполнить карточку с ичными данными, для упрощения бронирования необходимо указать данные ваших документов. В разделе Поездке у вас будет информация по текущей поездке и по ранее приобретённым турам. Нажав на кнопку Документы в нужной карточке тура, вы автоматически попадаете в раздел с документами по данной поездке. В разделе Избранное отображаются все туры/отели, которые ранее вам понравились при просмотре нашего сайте. В разделе Программа Лояльности вы можете ознакомиться с актуальной информацией по вашим бонусам',
                    },
                    { title: 'Сроки деактивации профиля', content: 'ЖЖЖЖалко' },
                    { title: 'Не отвечает туроператор', content: 'ЖЖЖЖалко' },
                    { title: 'Не пришел договор', content: 'текст' },
                    { title: 'Не пришла бронь от отеля', content: 'ЖЖЖЖалко' },
                    { title: 'Не пришел билет', content: 'ЖЖЖЖалко' },
                    {
                      title: 'Не пришла квитанция об оплате',
                      content: 'ЖЖЖЖалко',
                    },
                    { title: 'Путешествие с детьми', content: 'ЖЖЖЖалко' },
                    { title: 'Путешествие с животными', content: 'ЖЖЖЖалко' },
                  ].map((item) => (
                    <li
                      key={item.title}
                      className='flex cursor-pointer flex-col'
                      onClick={() => toggleItem(item.title)}
                    >
                      <div className='flex items-center justify-between rounded-xl bg-[#EEF5FF] px-3 py-2'>
                        <Typography
                          className='flex max-w-[230px] break-words text-base md:max-w-full lg:leading-8'
                          variant={windowWidth?.width < 1280 ? 'h3' : 'l-bold'}
                        >
                          {item.title}
                        </Typography>
                        <SvgSprite
                          width={24}
                          height={24}
                          name='arrow'
                          className={`transition-transform ${
                            openItems[item.title] ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                      <div
                        className={`mt-0 overflow-hidden rounded-b-xl bg-[#EEF5FF] transition-all duration-100 ${
                          openItems[item.title]
                            ? 'visible mt-[-10px] max-h-[1000px] p-3 opacity-100'
                            : 'max-h-0 p-0 opacity-0'
                        }`}
                      >
                        <Typography variant={windowWidth?.width < 840 ? 's' : 'l'}>
                          {item.content}
                        </Typography>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 'О сервисе' && <div className='shadow-xl'>О сервисе</div>}
            {activeTab === 'Регистрация на рейс' && (
              <div className='shadow-xl'>Регистрация</div>
            )}
            {activeTab === 'Список безвизовых стран' && (
              <div className='shadow-xl'>Список</div>
            )}
            {activeTab === 'Оплата' && <div className='shadow-xl'>Оплата</div>}
            {activeTab === 'Страховка' && <div className='shadow-xl'>Страховка</div>}
            {activeTab === 'Виза' && <div className='shadow-xl'>Виза</div>}
          </div>
        </section>

        <section className='mt-10 w-full pb-14 md:mt-14 md:items-center md:justify-end md:pb-16 lg:mt-[4.6rem] lg:pb-20'>
          <Typography
            className='mb-4 hidden text-xl font-bold md:mb-2 md:block md:text-3xl lg:mb-[1.8rem] lg:pl-10 lg:text-[2.5rem] lg:leading-[3.25rem]'
            variant='h2'
          >
            Форма обратной связи
          </Typography>
          <div className='md:flex md:flex-row-reverse lg:justify-end'>
            <div
              className='flex flex-col rounded-[20px] px-4 py-3 pb-4 shadow-xl md:w-full md:p-5 md:pt-7 lg:mb-4 lg:pt-5'
              style={{
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              }}
            >
              <Typography
                className='mb-4 text-xl font-bold md:mb-2 md:hidden lg:text-[2.5rem] lg:leading-[3.25rem]'
                variant='h2'
              >
                Форма обратной связи
              </Typography>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='border-1 border-red flex flex-col gap-2 border-solid md:w-full md:gap-3 lg:max-w-[680px] lg:gap-6'
              >
                <label htmlFor='name'>
                  <Typography className='mb-1 block lg:mb-2' variant='l-bold'>
                    Имя*
                  </Typography>
                  <input
                    {...register('name')}
                    id='name'
                    className={`w-full rounded-md border p-3 py-[12px] focus:outline-none focus:ring-1 md:p-2 lg:py-3 ${
                      errors.name ? 'border-[#E94C4C] focus:ring-0' : 'focus:ring-1'
                    }`}
                    placeholder='Констанция'
                  />
                  {errors.name && (
                    <Typography
                      variant={windowWidth?.width < 840 ? 's' : 'm'}
                      className='text-red-primary-800'
                    >
                      {errors.name.message}
                    </Typography>
                  )}
                </label>

                <label htmlFor='email'>
                  <Typography className='mb-1 block lg:mb-2' variant='l-bold'>
                    Email*
                  </Typography>
                  <input
                    {...register('email')}
                    id='email'
                    type='email'
                    className={`w-full rounded-md border p-3 py-[12px] focus:outline-none focus:ring-1 md:p-2 lg:py-3 ${
                      errors.email ? 'border-[#E94C4C] focus:ring-0' : 'focus:ring-1'
                    }`}
                    placeholder='constantinopolskaya123@gmail.com'
                  />
                  {errors.email && (
                    <Typography
                      variant={windowWidth?.width < 840 ? 's' : 'm'}
                      className='text-red-primary-800'
                    >
                      {errors.email.message}
                    </Typography>
                  )}
                </label>

                <label htmlFor='question' className='mb-1 md:mb-0 lg:mt-[-5px]'>
                  <Typography className='mb-1 block' variant='l-bold'>
                    Вопрос*
                  </Typography>
                  <textarea
                    {...register('question')}
                    id='question'
                    className={`h-[158px] w-full rounded-md border p-[0.65rem] focus:outline-none focus:ring-1 md:h-[124px] lg:h-[157px] ${
                      errors.question
                        ? 'border-[#E94C4C] focus:ring-0'
                        : 'focus:ring-1'
                    }`}
                    name={'question'}
                    placeholder='Как я могу оплатить тур?'
                  />
                  {errors.question && (
                    <Typography
                      variant={windowWidth?.width < 840 ? 's' : 'm'}
                      className='text-red-primary-800'
                    >
                      {errors.question.message}
                    </Typography>
                  )}
                </label>

                <ButtonCustom
                  type='submit'
                  className='w-full self-end md:mt-[-5px] md:w-[47%] lg:mt-[-15px] lg:w-[36%]'
                  variant={'primary'}
                  size={
                    windowWidth?.width < 840
                      ? 's'
                      : windowWidth?.width >= 1220
                        ? 'l'
                        : 'l'
                  }
                >
                  <Typography
                    variant={windowWidth?.width < 840 ? 's-bold' : 'l-bold'}
                  >
                    Отправить
                  </Typography>
                </ButtonCustom>
              </form>
            </div>
            <div className='flex h-auto max-w-full flex-shrink-0 flex-grow-0 items-center justify-center lg:relative lg:mr-5 lg:block lg:w-[480px] lg:justify-normal lg:pl-16'>
              <img
                className='hidden lg:right-[6.5rem] lg:top-0 lg:block'
                src='map-desctop.png'
                alt='Лягушка с чемоданом'
              ></img>
              <picture className='z-10 pt-5 md:mr-5 md:h-[253px] md:w-[253px] md:pt-0 lg:absolute lg:-left-[70px] lg:bottom-6 lg:h-[370px] lg:w-[370px]'>
                <source
                  srcSet='jumping-frog-desktop.png'
                  media='(min-width: 1380px)'
                />
                <source
                  srcSet='jumping-frog-tablet.png'
                  media='(min-width: 840px)'
                />
                <img src='jumping-frog-mobile.png' alt='Лягушка с чемоданом'></img>
              </picture>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
