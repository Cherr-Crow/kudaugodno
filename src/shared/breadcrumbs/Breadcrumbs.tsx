'use client'
import React from 'react';
import { IBreadcrumbs } from './Breadcrumbs.types';
import { Typography } from '@/shared/typography';
import { usePathname, useRouter } from 'next/navigation';
import { SvgSprite } from '../svg-sprite';
import Link from 'next/link';

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
  const navigate = (i:number) => {
    route.splice(i);
  }
  return (
    <div className={`mt-6 ml-36`}>
        <ul className={`flex flex-row gap-1`}>
            {route.map((elem, i) =>
                crumbs[elem] ? (
                    route.length > 1 && i !== route.length - 1 ? (
                        <li key={i} className={`text-grey-primary flex flex-row gap-1 `}>
                          {<Link href={route.join('/')} onClick={()=>{navigate(i+1)}}>{crumbs[elem]}</Link>}
                          <SvgSprite name={'arrow'} width={16}></SvgSprite>
                          </li>
                    ) : (
                        <li key={i} className={`text-grey-primary`}>{crumbs[elem]}</li>
                    )
                ) : (
                    <li key={i} className={`text-black font-medium`}>{elem}</li>
                )
            )}
        </ul>
    </div>
);
}
