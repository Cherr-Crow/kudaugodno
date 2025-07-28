'use client';

import React, { useEffect, useState } from 'react';

import { useFetchMeQuery } from '@/servicesApi/authApi';
import {
  useLazyGetInsuranceDataQuery,
  useUpdateInsurancesMutation,
} from '@/servicesApi/insurancesApi';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';
import { Select } from '@/shared/ui/select';
import { useToast } from '@/shared/ui/toast/toastService';
import { Typography } from '@/shared/ui/typography';

import { IInsurance } from './Insurance.types';

const insuranceCompanies = [
  'Т-Страхование',
  'Совкомбанк Страхование',
  'Сбербанк Страхование',
  'ВСК Страхование',
  'Росгорстрах',
  'РЕСО Страхование',
  'Согласие',
  'СОГАЗ',
  'Альфа Страхование',
  'Ренессанс Страхование',
  'Ингострах',
  'INTOUCH',
];

export function Insurance({}: IInsurance) {
  const { showToast } = useToast();

  const [visibleDeparture, setVisibleDeparture] = useState<boolean>(false);
  const [medicalCompany, setMedicalCompany] = useState<string>('');
  const [departureCompany, setDepartureCompany] = useState<string>('');

  const { data: fetchMeData } = useFetchMeQuery();

  const [getInsuranceData, { data: insurance }] = useLazyGetInsuranceDataQuery();
  const [changeInsurances] = useUpdateInsurancesMutation();

  useEffect(() => {
    if (fetchMeData && fetchMeData.user.id) {
      const userId = fetchMeData.user.id;
      getInsuranceData(userId);
    }
  }, [fetchMeData]);

  useEffect(() => {
    if (insurance) {
      if (insurance.medical) {
        setMedicalCompany(insurance.medical);
      }
      if (insurance.not_leaving) {
        setDepartureCompany(insurance.not_leaving);
        if (insurance.not_leaving === 'Не выбрано') {
          setVisibleDeparture(false);
        } else {
          setVisibleDeparture(true);
        }
      }
    }
  }, [insurance]);

  const handleChangeInsurances = async () => {
    const changeData = {
      medical: medicalCompany ? medicalCompany : '',
      not_leaving: departureCompany ? departureCompany : '',
    };
    if (fetchMeData && fetchMeData.user.id) {
      try {
        changeInsurances({ id: fetchMeData.user.id, data: changeData });
        showToast('Данные успешно сохранены', 'success');
      } catch {
        showToast('Ошибка сервера', 'error');
      }
    }
  };

  const handleCancel = () => {
    if (insurance) {
      setMedicalCompany(insurance.medical);
      if (insurance.not_leaving) {
        setDepartureCompany(insurance.not_leaving);
        setVisibleDeparture(true);
      }
    }
  };

  if (!insurance) {
    return <div className='text-gray-500 py-10 text-center'>Загрузка...</div>;
  }

  return (
    <section className='w-full lg:min-w-[352px]'>
      <form className='flex flex-col gap-[20px] lg:h-full'>
        <div className='flex flex-col gap-[20px]'>
          <Typography variant='h5' className='text-[16px] leading-[24px]'>
            Медицинская
          </Typography>
          <div className='flex w-full flex-col gap-[20px]'>
            <div className='flex w-full flex-col gap-[4px]'>
              <Typography variant='h5' className='text-[16px] leading-[24px]'>
                Страховая компания
              </Typography>
              <Select
                options={[...insuranceCompanies, 'Не выбрано']}
                color='blue'
                size='small'
                className='relative w-full'
                getValue={(e) => setMedicalCompany(e)}
                startValue={medicalCompany || 'Не выбрано'}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-[20px]'>
          <div
            onClick={() => {
              setVisibleDeparture(!visibleDeparture);
              setDepartureCompany('Не выбрано');
            }}
            className='w-fit'
          >
            <Checkbox
              label='От невыезда'
              isChecked={visibleDeparture}
              onChange={() => setVisibleDeparture(!visibleDeparture)}
            />
          </div>
          {visibleDeparture && (
            <div className='flex w-full flex-col gap-[20px]'>
              <div className='flex w-full flex-col gap-[4px]'>
                <Typography variant='h5' className='text-[16px] leading-[24px]'>
                  Страховая компания
                </Typography>
                <Select
                  options={[...insuranceCompanies, 'Не выбрано']}
                  color='blue'
                  size='small'
                  className='relative w-full'
                  getValue={(e) => setDepartureCompany(e)}
                  startValue={departureCompany || 'Не выбрано'}
                />
              </div>
            </div>
          )}
        </div>
        <div
          className={'mt-[8px] flex gap-4 sm:mt-[12px] sm:justify-end lg:mt-auto'}
        >
          <ButtonCustom
            variant='secondary'
            size='s'
            type='button'
            onClick={handleCancel}
          >
            <Typography variant='l-bold'>Отменить</Typography>
          </ButtonCustom>
          <ButtonCustom
            variant='primary'
            size='s'
            onClick={handleChangeInsurances}
            type='button'
          >
            <Typography variant='l-bold'>Сохранить</Typography>
          </ButtonCustom>
        </div>
      </form>
    </section>
  );
}
