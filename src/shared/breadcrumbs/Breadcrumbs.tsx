'use client'
import React from 'react';
import { IBreadcrumbs } from './Breadcrumbs.types';
import { Typography } from '@/shared/typography';
import { usePathname } from 'next/navigation';

const crumbs: Record<string, string> = {
  'catalog-hotels': 'Отели',
  'Kenia':'Кения',
  'Nairobi':'Найроби',
}
export function Breadcrumbs({}: IBreadcrumbs) {
//const pathname = usePathname();
  const pathname = '/catalog-hotels/Kenia/Nairobi/Novotel Nairobi Westlands';
  let route = pathname.split('/');
  route.shift();
  console.log(route);
  const translateRoute = route.map((elem) => route.length===1&&crumbs[elem]&&crumbs[elem] || crumbs[elem]&&crumbs[elem] + ' > ' || elem);
  return <div className={`mt-6 ml-36`}>
    <Typography children={translateRoute}></Typography>
  </div>;
}
