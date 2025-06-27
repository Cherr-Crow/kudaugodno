import { useState, useRef, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { closeAuthModal } from '@/rtk/authModalSlice';
import { selectEmail } from '@/rtk/userSlice';
import { useGetCodeMutation, useConfirmCodeMutation } from '@/servicesApi/authApi';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { timeForComponent } from '@/shared/ui/time-for-component/time';
import { Typography } from '@/shared/ui/typography';

function isRespFields(
  resp: unknown,
): resp is { role: string; id: number; refresh: string; access: string } {
  return (
    typeof resp === 'object' &&
    resp !== null &&
    'role' in resp &&
    typeof resp.role === 'string' &&
    'id' in resp &&
    typeof resp.id === 'number' &&
    'refresh' in resp &&
    typeof resp.refresh === 'string' &&
    'access' in resp &&
    typeof resp.access === 'string'
  );
}

export function EnterCodeState() {
  const dispatch = useDispatch();

  const email = useSelector(selectEmail);
  const router = useRouter();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [input3, setInput3] = useState<string>('');
  const [input4, setInput4] = useState<string>('');

  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(45);

  const [hasConfirmCodeError, setHasConfirmCodeError] = useState(false);

  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const inputRef4 = useRef<HTMLInputElement>(null);

  const [getCode, { error }] = useGetCodeMutation();
  const [confirmCode, { error: confirmCodeError }] = useConfirmCodeMutation();

  const handleFocusForInput2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyNumberForFocusChange(e.target.value)) {
      setInput1(onlyNumber(e.target.value));
      inputRef2.current?.focus();
    }
  };
  const handleFocusForInput3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyNumberForFocusChange(e.target.value)) {
      setInput2(onlyNumber(e.target.value));
      inputRef3.current?.focus();
    }
  };
  const handleFocusForInput4 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyNumberForFocusChange(e.target.value)) {
      setInput3(onlyNumber(e.target.value));
      inputRef4.current?.focus();
    }
  };
  const handleDataToServer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput4(onlyNumber(e.target.value));
  };

  const codeForAuth = {
    input1,
    input2,
    input3,
    input4,
  };

  const tick = (currentSecond: number) => {
    if (currentSecond <= 0) {
      setStartTimer(false);
      return;
    }

    setSeconds(currentSecond);

    timerRef.current = setTimeout(() => {
      tick(currentSecond - 1);
    }, 1000);
  };

  const launchTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStartTimer(true);
    tick(45);
  };

  useEffect(() => {
    launchTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (confirmCodeError) {
      setHasConfirmCodeError(true);
    }
  }, [confirmCodeError]);

  useEffect(() => {
    if (input1 !== '' && input2 !== '' && input3 !== '' && input4 !== '') {
      setTimeout(() => {
        if (codeForAuth.input4 !== '') {
          // setInput1('');
          // setInput2('');
          // setInput3('');
          // setInput4('');

          const handleConfirmCode = async () => {
            if (!email) return;
            try {
              const resp = await confirmCode({
                email: email,
                code: `${input1 + input2 + input3 + input4}`,
              }).unwrap();
              dispatch(closeAuthModal());
              if (isRespFields(resp)) {
                const redirectUrl =
                  resp.role === 'USER'
                    ? '/admin-panel-tourist'
                    : '/admin-panel-tour-operator';
                await router.push(redirectUrl);
              }
            } catch {}
          };
          handleConfirmCode();
        }
      }, 500);
    }
  }, [input1, input2, input3, input4]);

  const handleSentNewCode = async () => {
    setHasConfirmCodeError(false);
    setInput1('');
    setInput2('');
    setInput3('');
    setInput4('');
    fetchAuthCode();
  };

  const fetchAuthCode = async () => {
    if (!email) return;
    try {
      await getCode({ email: email }).unwrap();
      launchTimer();
    } catch {}
  };

  function onlyNumber(text: string) {
    const regex = new RegExp('^[0-9]$');
    if (regex.test(text)) {
      return text;
    } else {
      return '';
    }
  }

  function onlyNumberForFocusChange(text: string) {
    const regex = new RegExp('^[0-9]$');
    if (regex.test(text) || text === '') {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className='mx-auto flex max-w-[390px] flex-col items-center lg:max-w-[316px]'>
      <form className='mb-[15px] w-full md:mb-5 lg:mb-[24px]'>
        <Typography
          variant='l-bold'
          className='mb-[18px] block text-nowrap text-center font-semibold text-grey-950 md:mb-[13px] md:text-[18px] lg:mb-[20px] lg:text-[20px]'
        >
          Введите код из письма
        </Typography>
        <div className='flex justify-between gap-3 md:w-[316px]'>
          <label htmlFor='' className='block'>
            <input
              autoFocus
              className={`h-[80px] w-[66px] cursor-pointer rounded-[8px] bg-blue-200 px-[15px] text-center text-[20px] text-grey-950 transition-opacity hover:opacity-80 focus:opacity-80 focus:outline-none focus-visible:opacity-80 focus-visible:outline-none md:h-[81px] md:w-[65px] ${hasConfirmCodeError ? 'border border-red-primary-800' : ''}`}
              type='text'
              placeholder=''
              onChange={handleFocusForInput2}
              value={input1}
            />
          </label>
          <label htmlFor='' className='block'>
            <input
              ref={inputRef2}
              className={`h-[80px] w-[66px] cursor-pointer rounded-[8px] bg-blue-200 px-[15px] text-center text-[20px] text-grey-950 transition-opacity hover:opacity-80 focus:opacity-80 focus:outline-none focus-visible:opacity-80 focus-visible:outline-none md:h-[81px] md:w-[65px] ${hasConfirmCodeError ? 'border border-red-primary-800' : ''}`}
              type='text'
              placeholder=''
              onChange={handleFocusForInput3}
              value={input2}
            />
          </label>
          <label htmlFor='' className='block'>
            <input
              ref={inputRef3}
              className={`h-[80px] w-[66px] cursor-pointer rounded-[8px] bg-blue-200 px-[15px] text-center text-[20px] text-grey-950 transition-opacity hover:opacity-80 focus:opacity-80 focus:outline-none focus-visible:opacity-80 focus-visible:outline-none md:h-[81px] md:w-[65px] ${hasConfirmCodeError ? 'border border-red-primary-800' : ''}`}
              type='text'
              placeholder=''
              onChange={handleFocusForInput4}
              value={input3}
            />
          </label>
          <label htmlFor='' className='block'>
            <input
              ref={inputRef4}
              className={`h-[80px] w-[66px] cursor-pointer rounded-[8px] bg-blue-200 px-[15px] text-center text-[20px] text-grey-950 transition-opacity hover:opacity-80 focus:opacity-80 focus:outline-none focus-visible:opacity-80 focus-visible:outline-none md:h-[81px] md:w-[65px] ${hasConfirmCodeError ? 'border border-red-primary-800' : ''}`}
              type='text'
              placeholder=''
              onChange={handleDataToServer}
              value={input4}
            />
          </label>
        </div>
      </form>

      {hasConfirmCodeError && (
        <Typography
          variant='m'
          className='mb-5 block text-wrap text-center text-[19px] font-normal text-red-primary-800 md:mb-[22px] md:mt-[-3px] md:text-[18px] lg:mb-[24px] lg:mt-[-4px] lg:text-[20px]'
        >
          Неверный код, попробуйте еще раз.
        </Typography>
      )}

      {error && (
        <Typography
          variant='m'
          className='mb-4 mt-[-16px] block text-wrap text-center text-[19px] font-normal text-red-primary-800 md:mb-5 md:mt-[-6px] md:text-[18px] lg:text-[20px]'
        >
          Email не найден. Пожалуйста, вернитесь назад и введите email заново.
        </Typography>
      )}

      {!startTimer ? (
        <ButtonCustom
          type='button'
          onClick={handleSentNewCode}
          variant='primary'
          size='m'
          className='w-full px-[35px] py-[8px] md:mx-auto md:mt-0 md:block md:w-auto md:px-8 md:py-[13px] lg:py-[14px]'
        >
          <Typography className='text-nowrap text-base font-semibold text-grey-950 md:text-[16px] lg:text-green-950'>
            Прислать новый код
          </Typography>
        </ButtonCustom>
      ) : (
        <Typography className='mb-[15px] block text-nowrap text-[20px] font-normal text-grey-700 md:mb-[21px] md:text-[18px] lg:mb-[28px] lg:text-[20px]'>
          Запросить новый код через {timeForComponent(seconds)}
        </Typography>
      )}
    </div>
  );
}
