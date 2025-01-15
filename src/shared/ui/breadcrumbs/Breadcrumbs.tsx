'use client'
import React from 'react';
import { IBreadcrumbs } from './Breadcrumbs.types';
import { Typography } from '@/shared/typography';

const crumbs: Record<string, string> = {
  'catalog-hotels': 'Отели',
  'Kenia':'Кения',
  'Nairobi':'Найроби',
}
export function Breadcrumbs({}: IBreadcrumbs) {
  //const pathname = usePathname();
  const pathname = '/catalog-hotels/Kenia/Nairobi/Novotel Nairobi Westlands';
  let route = pathname.split('/');
  const translateRoute = route.map(elem => {

    return crumbs[elem]&&crumbs[elem] + ' > '||elem;
  });
  console.log(route);
  return <div className={`mt-6 ml-36`}>
    <Typography children={translateRoute}></Typography>
  </div>;
}
