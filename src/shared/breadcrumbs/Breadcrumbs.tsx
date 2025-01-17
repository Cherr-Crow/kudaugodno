'use client';
import React from 'react';
import { IBreadcrumbs } from './Breadcrumbs.types';
import { usePathname, useRouter } from 'next/navigation';
import { SvgSprite } from '../svg-sprite';
import Link from 'next/link';

const crumbs: Record<string, string> = {
  'catalog-hotels': 'Отели',
  Kenia: 'Кения',
  Nairobi: 'Найроби',
};
export function Breadcrumbs({}: IBreadcrumbs) {
  const pathname = usePathname();
  const router = useRouter();
  const route = pathname.split('/');
  route.shift();
  return (
    <div className={`invisible mt-6 mb-10 lg:visible `}>
      <ul className={`flex flex-row gap-1`}>
        {route.map((elem, i) =>
          crumbs[elem] ? (
            <li key={i} className={`flex flex-row gap-1 text-grey-primary`}>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(route.slice(0, i + 1).join('/'));
                }}
              >
                {crumbs[elem]}
              </Link>
              {route.length > 1 &&<SvgSprite name={'arrow'} width={16}></SvgSprite>}
            </li>
          ) : (
            <li key={i} className={`font-medium text-black`}>
              {elem}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
