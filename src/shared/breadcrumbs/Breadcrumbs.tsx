'use client';
import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SvgSprite } from '../ui/svg-sprite';

type Path = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  paths: Path[];
  color?: 'grey' | 'white';
  className?: string;
};

export function Breadcrumbs({ paths, color = 'grey', className }: BreadcrumbsProps) {
  const router = useRouter();

  return (
    <div className={`invisible mb-10 mt-6 lg:visible ${className ? className : ''}`}>
      <ul className='flex flex-row flex-wrap gap-1'>
        {paths.map((crumb, i) => {
          const isLast = i === paths.length - 1;
          return (
            <li
              key={i}
              className={`flex flex-row items-center gap-1 font-normal ${color === 'white' ? 'text-white' : 'text-grey-400'}`}
            >
              {!isLast && crumb.href ? (
                <>
                  <Link
                    href={crumb.href}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(crumb.href!);
                    }}
                  >
                    {crumb.label}
                  </Link>
                  <SvgSprite
                    name='arrow'
                    color={color === 'white' ? 'white' : 'grey'}
                    width={16}
                  />
                </>
              ) : (
                <span
                  className={`font-semibold ${color === 'white' ? 'text-white' : 'text-grey-950'}`}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
