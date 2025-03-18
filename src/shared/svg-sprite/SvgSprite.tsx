'use client';

import React from 'react';

import { ISvgSprite } from './SvgSprite.types';

export function SvgSprite({
  className,
  name,
  color,
  width,
  height,
  strokeWidth,
  onClick,
}: ISvgSprite) {
  switch (name) {
    case 'add-image':
      return (
        <svg
          className={className ?? ''}
          xmlns='http://www.w3.org/2000/svg'
          width='35'
          height='35'
          viewBox='0 0 35 35'
          fill='none'
        >
          <path
            d='M21.5 9.83333H21.5167M17.3333 31.5H6.5C5.17392 31.5 3.90215 30.9732 2.96447 30.0355C2.02678 29.0979 1.5 27.8261 1.5 26.5V6.5C1.5 5.17392 2.02678 3.90215 2.96447 2.96447C3.90215 2.02678 5.17392 1.5 6.5 1.5H26.5C27.8261 1.5 29.0979 2.02678 30.0355 2.96447C30.9732 3.90215 31.5 5.17392 31.5 6.5V17.3333'
            stroke='#1C3003'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M1.5 23.1664L9.83333 14.833C11.38 13.3447 13.2867 13.3447 14.8333 14.833L21.5 21.4997'
            stroke='#1C3003'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M19.832 19.8328L21.4987 18.1661C22.6154 17.0928 23.9154 16.7928 25.1354 17.2661M23.1654 28.1661H33.1654M28.1654 23.1661V33.1661'
            stroke='#1C3003'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'admin-panel-tourist-background':
      return (
        <svg
          className={className ?? ''}
          xmlns='http://www.w3.org/2000/svg'
          width='375'
          height='213'
          viewBox='0 0 375 213'
          fill='none'
        >
          <g clipPath='url(#clip0_1623_17278)'>
            <path
              d='M0 0H375V193C375 204.046 366.046 213 355 213H20C8.95431 213 0 204.046 0 193V0Z'
              fill='#4757EA'
            />
            <path
              d='M96.4918 49.6512C99.38 53.3973 99.7739 58.7283 97.6734 65.6442C95.5729 72.5601 92.0282 78.7556 87.0395 84.2307L71.1872 101.629L86.9411 176.839C87.2693 178.208 86.8754 179.397 85.7595 180.405L73.1565 190.779C72.697 191.211 72.0734 191.427 71.2857 191.427C71.0231 191.427 70.7934 191.391 70.5965 191.319C69.6119 191.103 68.9226 190.527 68.5288 189.59L41.0581 134.695L15.5566 162.683L20.775 183.647C21.1032 184.872 20.8407 185.988 19.9873 186.997L10.535 197.371C9.94426 198.019 9.18939 198.343 8.27042 198.343H8.07349C7.08888 198.199 6.30119 197.731 5.71042 196.939L-12.8988 169.707L-37.7111 149.284C-38.4331 148.779 -38.8598 147.951 -38.991 146.798C-39.0567 145.862 -38.7613 144.961 -38.1049 144.097L-28.6526 133.615C-28.0618 132.966 -27.307 132.642 -26.388 132.642C-25.9941 132.642 -25.7316 132.678 -25.6003 132.75L-6.49879 138.477L19.0027 110.49L-31.0157 80.3405C-31.9346 79.7642 -32.4926 78.8997 -32.6895 77.7471C-32.8208 76.5944 -32.5254 75.6219 -31.8034 74.8294L-19.2003 60.9976C-18.2813 60.0611 -17.2967 59.7729 -16.2465 60.1331L49.2304 77.3148L64.9842 60.025C69.9729 54.5499 75.618 50.6597 81.9195 48.3544C88.2211 46.0491 93.0785 46.4814 96.4918 49.6512Z'
              fill='#5F79F5'
              fillOpacity='0.6'
            />
            <ellipse
              cx='375'
              cy='30.2885'
              rx='69'
              ry='67.4174'
              fill='#7E9CFB'
              fillOpacity='0.2'
            />
            <ellipse
              cx='375.199'
              cy='30.4842'
              rx='35.1017'
              ry='34.2967'
              fill='#A3C0FE'
              fillOpacity='0.3'
            />
          </g>
        </svg>
      );
    case 'airplane-tour':
      return (
        <svg
          width='36'
          height='36'
          viewBox='0 0 36 36'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
        >
          <rect width='36' height='36' fill='url(#pattern0_1149_10226)' />
          <defs>
            <pattern
              id='pattern0_1149_10226'
              patternContentUnits='objectBoundingBox'
              width='1'
              height='1'
            >
              <use
                xlinkHref='#image0_1149_10226'
                transform='translate(-0.075) scale(0.003125)'
              />
            </pattern>
            <image
              id='image0_1149_10226'
              width='368'
              height='320'
              preserveAspectRatio='none'
              xlinkHref='data:image/png;base64,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'
            />
          </defs>
        </svg>
      );
    case 'arrow-check':
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M20 6L9 17L4 12'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'filter':
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M4.5 7H19.5M7 12H17M10 17H14'
            stroke='#363636'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'map':
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M15.861 1.16321L16.021 1.21721L17.223 1.61721C17.686 1.77221 18.093 1.90721 18.414 2.05721C18.762 2.21921 19.081 2.42721 19.325 2.76621C19.569 3.10521 19.666 3.47321 19.71 3.85421C19.75 4.20721 19.75 4.63521 19.75 5.12421V13.3362C19.75 14.0342 19.75 14.6232 19.696 15.0892C19.64 15.5732 19.514 16.0512 19.161 16.4372C18.952 16.666 18.6981 16.8492 18.415 16.9752C17.937 17.1872 17.444 17.1552 16.967 17.0562C16.507 16.9602 15.949 16.7742 15.287 16.5532L15.244 16.5392C14.124 16.1652 13.739 16.0492 13.367 16.0622C13.2184 16.0676 13.0707 16.0873 12.926 16.1212C12.563 16.2062 12.223 16.4202 11.24 17.0752L9.858 17.9972L9.718 18.0902C8.656 18.7992 7.918 19.2912 7.054 19.4072C6.191 19.5232 5.349 19.2422 4.139 18.8372L3.979 18.7842L2.777 18.3842C2.314 18.2292 1.907 18.0942 1.586 17.9442C1.238 17.7822 0.919 17.5742 0.675 17.2342C0.431 16.8962 0.334 16.5282 0.29 16.1462C0.25 15.7932 0.25 15.3662 0.25 14.8772V6.66521C0.25 5.96621 0.25 5.37721 0.304 4.91221C0.36 4.42821 0.486 3.95021 0.839 3.56421C1.04797 3.33543 1.30194 3.15227 1.585 3.02621C2.063 2.81321 2.557 2.84521 3.033 2.94521C3.493 3.04021 4.051 3.22721 4.713 3.44821L4.756 3.46221C5.876 3.83521 6.261 3.95221 6.634 3.93921C6.78223 3.93378 6.92958 3.91402 7.074 3.88021C7.437 3.79421 7.777 3.58021 8.76 2.92621L10.142 2.00421L10.282 1.91021C11.344 1.20221 12.082 0.710214 12.945 0.594214C13.809 0.478214 14.651 0.758215 15.861 1.16321ZM13.75 2.10721V14.5802C14.286 14.6382 14.85 14.8262 15.593 15.0742L15.718 15.1162C16.435 15.3552 16.91 15.5122 17.273 15.5882C17.629 15.6622 17.75 15.6282 17.805 15.6042C17.8994 15.5623 17.9842 15.5014 18.054 15.4252C18.094 15.3812 18.164 15.2762 18.206 14.9152C18.249 14.5472 18.25 14.0462 18.25 13.2912V5.16321C18.25 4.62321 18.249 4.28321 18.22 4.02521C18.192 3.78621 18.148 3.69721 18.108 3.64321C18.069 3.58921 17.999 3.51821 17.782 3.41721C17.546 3.30721 17.222 3.19921 16.712 3.02821L15.547 2.64021C14.66 2.34421 14.134 2.17721 13.75 2.10721ZM12.25 14.7602V2.43421C11.939 2.61421 11.54 2.87521 10.974 3.25221L9.592 4.17421L9.482 4.24721C8.794 4.70721 8.281 5.04921 7.75 5.24121V17.5672C8.061 17.3872 8.46 17.1252 9.026 16.7482L10.408 15.8272L10.518 15.7542C11.206 15.2942 11.719 14.9522 12.25 14.7602ZM6.25 17.8952V5.42021C5.714 5.36221 5.15 5.17421 4.407 4.92621L4.282 4.88421C3.565 4.64521 3.09 4.48821 2.726 4.41221C2.371 4.33821 2.25 4.37121 2.196 4.39521C2.10111 4.43727 2.01598 4.49856 1.946 4.57521C1.906 4.61821 1.836 4.72321 1.794 5.08421C1.751 5.45221 1.75 5.95421 1.75 6.70921V14.8372C1.75 15.3772 1.751 15.7172 1.78 15.9752C1.808 16.2142 1.852 16.3022 1.892 16.3572C1.931 16.4112 2.001 16.4822 2.218 16.5832C2.454 16.6932 2.778 16.8012 3.288 16.9722L4.453 17.3602C5.34 17.6552 5.865 17.8232 6.25 17.8942'
            fill='#3440CE'
          />
        </svg>
      );
    case 'entertainment':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M16.0007 18.6667C17.4734 18.6667 18.6673 17.4728 18.6673 16C18.6673 14.5273 17.4734 13.3334 16.0007 13.3334C14.5279 13.3334 13.334 14.5273 13.334 16C13.334 17.4728 14.5279 18.6667 16.0007 18.6667Z'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M16 2.66663V7.99996'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M9.06706 20L4.40039 22.6667'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M27.6003 9.33337L22.9336 12'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M9.06706 12L4.40039 9.33337'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M27.6003 22.6667L22.9336 20'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12 29.3333L16 18.6666L20 29.3333'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10.666 29.3334H21.3327'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M24 24.9333C25.8114 23.3131 27.0882 21.1811 27.6615 18.8193C28.2347 16.4576 28.0773 13.9775 27.2101 11.7071C26.3429 9.43683 24.8068 7.48332 22.8051 6.10513C20.8033 4.72693 18.4303 3.98901 16 3.98901C13.5697 3.98901 11.1967 4.72693 9.19495 6.10513C7.19321 7.48332 5.65712 9.43683 4.78993 11.7071C3.92275 13.9775 3.76535 16.4576 4.33856 18.8193C4.91176 21.1811 6.18856 23.3131 8 24.9333'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'bus':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10.666 8V16'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M20 8V16'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M2.66602 16H28.7993'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M23.9993 24H27.9993C27.9993 24 28.666 21.7333 29.066 20.2667C29.1993 19.7333 29.3327 19.2 29.3327 18.6667C29.3327 18.1333 29.1993 17.6 29.066 17.0667L27.1993 10.4C26.7993 9.06667 25.466 8 23.9993 8H5.33268C4.62544 8 3.94716 8.28095 3.44706 8.78105C2.94697 9.28115 2.66602 9.95942 2.66602 10.6667V24H6.66602'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M9.33268 26.6667C10.8054 26.6667 11.9993 25.4728 11.9993 24C11.9993 22.5273 10.8054 21.3334 9.33268 21.3334C7.85992 21.3334 6.66602 22.5273 6.66602 24C6.66602 25.4728 7.85992 26.6667 9.33268 26.6667Z'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12 24H18.6667'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M21.3327 26.6667C22.8054 26.6667 23.9993 25.4728 23.9993 24C23.9993 22.5273 22.8054 21.3334 21.3327 21.3334C19.8599 21.3334 18.666 22.5273 18.666 24C18.666 25.4728 19.8599 26.6667 21.3327 26.6667Z'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'icon_document':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.99935 1.33337H3.99935C3.64573 1.33337 3.30659 1.47385 3.05654 1.7239C2.80649 1.97395 2.66602 2.31309 2.66602 2.66671V13.3334C2.66602 13.687 2.80649 14.0261 3.05654 14.2762C3.30659 14.5262 3.64573 14.6667 3.99935 14.6667H11.9993C12.353 14.6667 12.6921 14.5262 12.9422 14.2762C13.1922 14.0261 13.3327 13.687 13.3327 13.3334V4.66671L9.99935 1.33337Z'
            stroke={color ? color : '#000'}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M9.33398 1.33337V4.00004C9.33398 4.35366 9.47446 4.6928 9.72451 4.94285C9.97456 5.1929 10.3137 5.33337 10.6673 5.33337H13.334'
            stroke={color ? color : '#000'}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M6.66732 6H5.33398'
            stroke={color ? color : '#000'}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10.6673 8.66663H5.33398'
            stroke={color ? color : '#000'}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10.6673 11.3334H5.33398'
            stroke={color ? color : '#000'}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'icon_video':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M9 8L15 12L9 16V8Z'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'trash-light':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M14 11V17M10 11V17M6 7V19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7M4 7H20M7 7L9 3H15L17 7'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'plant':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.33398 26.6666H22.6673'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M13.334 26.6667C20.6673 23.3334 14.4007 18.1334 17.334 13.3334'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12.6673 12.5333C14.134 13.6 15.0673 15.4666 15.734 17.4666C13.0673 18 11.0673 18 9.33398 17.0666C7.73398 16.2666 6.26732 14.5333 5.33398 11.4666C9.06732 10.8 11.2007 11.4666 12.6673 12.5333Z'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M18.7997 8.00004C17.7832 9.58878 17.2718 11.4482 17.333 13.3334C19.8664 13.2 21.733 12.5334 23.0664 11.4667C24.3997 10.1334 25.1997 8.40004 25.333 5.33337C21.733 5.46671 19.9997 6.66671 18.7997 8.00004Z'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'sort':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M21 16L17 20L13 16'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M17 20V4'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M3 8L7 4L11 8'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M7 4V20'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'tennis-racket':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M14.2665 6.26668C18.2665 2.26668 24.1332 1.46668 27.3332 4.66668C30.5332 7.86668 29.7332 13.7333 25.7332 17.7333C24.152 19.3339 22.1731 20.4845 19.9999 21.0667C17.1999 21.7333 14.5332 21.2 12.6665 19.3333C10.7999 17.4667 10.2665 14.8 10.9332 12C11.5154 9.82678 12.6659 7.84784 14.2665 6.26668Z'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10.9327 12L7.99935 24M7.99935 24L19.9993 21.0667M7.99935 24L2.66602 29.3333'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M26.6667 29.3333C28.1394 29.3333 29.3333 28.1394 29.3333 26.6667C29.3333 25.1939 28.1394 24 26.6667 24C25.1939 24 24 25.1939 24 26.6667C24 28.1394 25.1939 29.3333 26.6667 29.3333Z'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'airplane':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 21 21'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M15.8 18.2L14 10L17.5 6.5C19 5 19.5 3 19 2C18 1.5 16 2 14.5 3.5L11 7L2.8 5.2C2.3 5.1 1.9 5.3 1.7 5.7L1.4 6.2C1.2 6.7 1.3 7.2 1.7 7.5L7 11L5 14H2L1 15L4 17L6 20L7 19V16L10 14L13.5 19.3C13.8 19.7 14.3 19.8 14.8 19.6L15.3 19.4C15.7 19.1 15.9 18.7 15.8 18.2Z'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'arrow-pointer':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 14 14'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10.586 5.65692L6.636 1.70692C6.45384 1.51832 6.35305 1.26571 6.35533 1.00352C6.3576 0.741321 6.46277 0.490508 6.64818 0.3051C6.83359 0.119692 7.0844 0.0145233 7.3466 0.0122448C7.6088 0.00996641 7.8614 0.110761 8.05 0.292919L13.707 5.94992C13.8002 6.04257 13.8741 6.15273 13.9246 6.27407C13.9751 6.3954 14.001 6.52551 14.001 6.65692C14.001 6.78833 13.9751 6.91844 13.9246 7.03977C13.8741 7.16111 13.8002 7.27127 13.707 7.36392L8.05 13.0209C7.95775 13.1164 7.84741 13.1926 7.7254 13.245C7.6034 13.2974 7.47218 13.325 7.3394 13.3262C7.20662 13.3273 7.07494 13.302 6.95205 13.2517C6.82915 13.2015 6.7175 13.1272 6.62361 13.0333C6.52971 12.9394 6.45546 12.8278 6.40518 12.7049C6.3549 12.582 6.3296 12.4503 6.33075 12.3175C6.3319 12.1847 6.35949 12.0535 6.4119 11.9315C6.46431 11.8095 6.54049 11.6992 6.636 11.6069L10.586 7.65692H1C0.734784 7.65692 0.48043 7.55156 0.292893 7.36403C0.105357 7.17649 0 6.92214 0 6.65692C0 6.3917 0.105357 6.13735 0.292893 5.94981C0.48043 5.76228 0.734784 5.65692 1 5.65692H10.586Z'
            fill={color ? color : '#000'}
          />
        </svg>
      );
    case 'bell':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M5 6.6665C5 5.34042 5.52678 4.06865 6.46447 3.13097C7.40215 2.19329 8.67392 1.6665 10 1.6665C11.3261 1.6665 12.5979 2.19329 13.5355 3.13097C14.4732 4.06865 15 5.34042 15 6.6665C15 12.4998 17.5 14.1665 17.5 14.1665H2.5C2.5 14.1665 5 12.4998 5 6.6665Z'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M8.5835 17.5C8.72298 17.7537 8.92804 17.9653 9.17724 18.1127C9.42644 18.26 9.71065 18.3378 10.0002 18.3378C10.2897 18.3378 10.5739 18.26 10.8231 18.1127C11.0723 17.9653 11.2773 17.7537 11.4168 17.5'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'calendar':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 28 28'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.9165 7.58333C9.9165 7.42862 9.97796 7.28025 10.0874 7.17085C10.1968 7.06146 10.3451 7 10.4998 7H17.4998C17.6545 7 17.8029 7.06146 17.9123 7.17085C18.0217 7.28025 18.0832 7.42862 18.0832 7.58333C18.0832 7.73804 18.0217 7.88642 17.9123 7.99581C17.8029 8.10521 17.6545 8.16667 17.4998 8.16667H10.4998C10.3451 8.16667 10.1968 8.10521 10.0874 7.99581C9.97796 7.88642 9.9165 7.73804 9.9165 7.58333ZM9.33317 14C9.02375 14 8.72701 14.1229 8.50821 14.3417C8.28942 14.5605 8.1665 14.8572 8.1665 15.1667C8.1665 15.4761 8.28942 15.7728 8.50821 15.9916C8.72701 16.2104 9.02375 16.3333 9.33317 16.3333C9.64259 16.3333 9.93934 16.2104 10.1581 15.9916C10.3769 15.7728 10.4998 15.4761 10.4998 15.1667C10.4998 14.8572 10.3769 14.5605 10.1581 14.3417C9.93934 14.1229 9.64259 14 9.33317 14ZM18.6665 14C18.3571 14 18.0603 14.1229 17.8415 14.3417C17.6228 14.5605 17.4998 14.8572 17.4998 15.1667C17.4998 15.4761 17.6228 15.7728 17.8415 15.9916C18.0603 16.2104 18.3571 16.3333 18.6665 16.3333C18.9759 16.3333 19.2727 16.2104 19.4915 15.9916C19.7103 15.7728 19.8332 15.4761 19.8332 15.1667C19.8332 14.8572 19.7103 14.5605 19.4915 14.3417C19.2727 14.1229 18.9759 14 18.6665 14ZM12.8332 15.1667C12.8332 14.8572 12.9561 14.5605 13.1749 14.3417C13.3937 14.1229 13.6904 14 13.9998 14C14.3093 14 14.606 14.1229 14.8248 14.3417C15.0436 14.5605 15.1665 14.8572 15.1665 15.1667C15.1665 15.4761 15.0436 15.7728 14.8248 15.9916C14.606 16.2104 14.3093 16.3333 13.9998 16.3333C13.6904 16.3333 13.3937 16.2104 13.1749 15.9916C12.9561 15.7728 12.8332 15.4761 12.8332 15.1667ZM9.33317 18.6667C9.02375 18.6667 8.72701 18.7896 8.50821 19.0084C8.28942 19.2272 8.1665 19.5239 8.1665 19.8333C8.1665 20.1428 8.28942 20.4395 8.50821 20.6583C8.72701 20.8771 9.02375 21 9.33317 21C9.64259 21 9.93934 20.8771 10.1581 20.6583C10.3769 20.4395 10.4998 20.1428 10.4998 19.8333C10.4998 19.5239 10.3769 19.2272 10.1581 19.0084C9.93934 18.7896 9.64259 18.6667 9.33317 18.6667ZM12.8332 19.8333C12.8332 19.5239 12.9561 19.2272 13.1749 19.0084C13.3937 18.7896 13.6904 18.6667 13.9998 18.6667C14.3093 18.6667 14.606 18.7896 14.8248 19.0084C15.0436 19.2272 15.1665 19.5239 15.1665 19.8333C15.1665 20.1428 15.0436 20.4395 14.8248 20.6583C14.606 20.8771 14.3093 21 13.9998 21C13.6904 21 13.3937 20.8771 13.1749 20.6583C12.9561 20.4395 12.8332 20.1428 12.8332 19.8333Z'
            fill={color ? color : '#000'}
          />
          <path
            d='M15.8937 3.5H12.1067C10.8233 3.5 9.82233 3.5 9.02083 3.56533C8.2065 3.63183 7.545 3.7695 6.95 4.07167C5.96188 4.57505 5.15854 5.37839 4.65516 6.3665C4.35183 6.9615 4.21533 7.623 4.14883 8.43733C4.0835 9.24 4.0835 10.2387 4.0835 11.5232V16.4768C4.0835 17.7602 4.0835 18.7612 4.14883 19.5627C4.21533 20.377 4.353 21.0385 4.65516 21.6335C5.15854 22.6216 5.96188 23.425 6.95 23.9283C7.545 24.2317 8.2065 24.3682 9.02083 24.4347C9.8235 24.5 10.8222 24.5 12.1067 24.5H15.8937C17.177 24.5 18.178 24.5 18.9795 24.4347C19.7938 24.3682 20.4553 24.2305 21.0503 23.9283C22.0384 23.425 22.8418 22.6216 23.3452 21.6335C23.6485 21.0385 23.785 20.377 23.8515 19.5627C23.9168 18.7612 23.9168 17.7613 23.9168 16.4768V11.5232C23.9168 10.2398 23.9168 9.23883 23.8515 8.43733C23.785 7.623 23.6473 6.9615 23.3452 6.3665C22.8418 5.37839 22.0384 4.57505 21.0503 4.07167C20.4553 3.76833 19.7938 3.63183 18.9795 3.56533C18.1768 3.5 17.1782 3.5 15.8937 3.5ZM7.4785 5.11117C7.88216 4.90583 8.37216 4.78917 9.11533 4.7285C9.86433 4.66667 10.8175 4.66667 12.1335 4.66667H15.8668C17.1828 4.66667 18.136 4.66667 18.8838 4.7285C19.627 4.78917 20.117 4.90583 20.5207 5.11117C21.2893 5.5027 21.9141 6.12757 22.3057 6.89617C22.511 7.29983 22.6277 7.78983 22.6883 8.533C22.7327 9.06617 22.7455 9.702 22.749 10.5H5.25016C5.25483 9.702 5.2665 9.065 5.31083 8.533C5.3715 7.78983 5.48816 7.29983 5.6935 6.89617C6.08503 6.12757 6.7099 5.5027 7.4785 5.11117ZM5.25016 11.6667H22.7502V16.45C22.7502 17.766 22.7502 18.7192 22.6883 19.467C22.6277 20.2102 22.511 20.7002 22.3057 21.1038C21.9141 21.8724 21.2893 22.4973 20.5207 22.8888C20.117 23.0942 19.627 23.2108 18.885 23.2715C18.136 23.3333 17.1828 23.3333 15.8668 23.3333H12.1335C10.8175 23.3333 9.86433 23.3333 9.1165 23.2715C8.37333 23.2108 7.88333 23.0942 7.47966 22.8888C6.71106 22.4973 6.08619 21.8724 5.69466 21.1038C5.48933 20.7002 5.37266 20.2102 5.312 19.4682C5.25016 18.7192 5.25016 17.766 5.25016 16.45V11.6667Z'
            fill={color ? color : '#000'}
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M9.62484 7.5835C9.62484 7.35143 9.71702 7.12887 9.88112 6.96478C10.0452 6.80068 10.2678 6.7085 10.4998 6.7085H17.4998C17.7319 6.7085 17.9545 6.80068 18.1186 6.96478C18.2826 7.12887 18.3748 7.35143 18.3748 7.5835C18.3748 7.81556 18.2826 8.03812 18.1186 8.20222C17.9545 8.36631 17.7319 8.4585 17.4998 8.4585H10.4998C10.2678 8.4585 10.0452 8.36631 9.88112 8.20222C9.71702 8.03812 9.62484 7.81556 9.62484 7.5835ZM7.87484 15.1668C7.87484 14.7801 8.02848 14.4091 8.30197 14.1356C8.57546 13.8621 8.9464 13.7085 9.33317 13.7085C9.71994 13.7085 10.0909 13.8621 10.3644 14.1356C10.6379 14.4091 10.7915 14.7801 10.7915 15.1668C10.7915 15.5536 10.6379 15.9245 10.3644 16.198C10.0909 16.4715 9.71994 16.6252 9.33317 16.6252C8.9464 16.6252 8.57546 16.4715 8.30197 16.198C8.02848 15.9245 7.87484 15.5536 7.87484 15.1668ZM17.2082 15.1668C17.2082 14.7801 17.3618 14.4091 17.6353 14.1356C17.9088 13.8621 18.2797 13.7085 18.6665 13.7085C19.0533 13.7085 19.4242 13.8621 19.6977 14.1356C19.9712 14.4091 20.1248 14.7801 20.1248 15.1668C20.1248 15.5536 19.9712 15.9245 19.6977 16.198C19.4242 16.4715 19.0533 16.6252 18.6665 16.6252C18.2797 16.6252 17.9088 16.4715 17.6353 16.198C17.3618 15.9245 17.2082 15.5536 17.2082 15.1668ZM12.5415 15.1668C12.5415 14.7801 12.6951 14.4091 12.9686 14.1356C13.2421 13.8621 13.6131 13.7085 13.9998 13.7085C14.3866 13.7085 14.7575 13.8621 15.031 14.1356C15.3045 14.4091 15.4582 14.7801 15.4582 15.1668C15.4582 15.5536 15.3045 15.9245 15.031 16.198C14.7575 16.4715 14.3866 16.6252 13.9998 16.6252C13.6131 16.6252 13.2421 16.4715 12.9686 16.198C12.6951 15.9245 12.5415 15.5536 12.5415 15.1668ZM7.87484 19.8335C7.87484 19.4467 8.02848 19.0758 8.30197 18.8023C8.57546 18.5288 8.9464 18.3752 9.33317 18.3752C9.71994 18.3752 10.0909 18.5288 10.3644 18.8023C10.6379 19.0758 10.7915 19.4467 10.7915 19.8335C10.7915 20.2203 10.6379 20.5912 10.3644 20.8647C10.0909 21.1382 9.71994 21.2918 9.33317 21.2918C8.9464 21.2918 8.57546 21.1382 8.30197 20.8647C8.02848 20.5912 7.87484 20.2203 7.87484 19.8335ZM12.5415 19.8335C12.5415 19.4467 12.6951 19.0758 12.9686 18.8023C13.2421 18.5288 13.6131 18.3752 13.9998 18.3752C14.3866 18.3752 14.7575 18.5288 15.031 18.8023C15.3045 19.0758 15.4582 19.4467 15.4582 19.8335C15.4582 20.2203 15.3045 20.5912 15.031 20.8647C14.7575 21.1382 14.3866 21.2918 13.9998 21.2918C13.6131 21.2918 13.2421 21.1382 12.9686 20.8647C12.6951 20.5912 12.5415 20.2203 12.5415 19.8335ZM15.9062 3.2085C17.179 3.2085 18.1893 3.2085 19.0025 3.275C19.8355 3.34266 20.539 3.485 21.183 3.81166C22.2256 4.34348 23.073 5.19174 23.6038 6.23483C23.9317 6.8765 24.074 7.58116 24.1417 8.41416C24.2082 9.22733 24.2082 10.2377 24.2082 11.5105V16.4898C24.2082 17.7627 24.2082 18.773 24.1417 19.5862C24.074 20.4192 23.9317 21.1227 23.605 21.7667C23.0735 22.8091 22.2257 23.6565 21.183 24.1875C20.539 24.5153 19.8355 24.6577 19.0025 24.7253C18.1893 24.7918 17.179 24.7918 15.9062 24.7918H12.0935C10.8207 24.7918 9.81034 24.7918 8.99717 24.7253C8.16417 24.6577 7.46067 24.5153 6.81784 24.1887C5.775 23.6573 4.92715 22.8095 4.39584 21.7667C4.068 21.1227 3.92567 20.4192 3.858 19.5862C3.7915 18.773 3.7915 17.7627 3.7915 16.4898V11.5105C3.7915 10.2377 3.7915 9.22733 3.858 8.41416C3.92567 7.58116 4.068 6.87766 4.39467 6.23483C4.92629 5.19181 5.77457 4.34395 6.81784 3.81283C7.4595 3.485 8.16417 3.34266 8.99717 3.275C9.81034 3.2085 10.8207 3.2085 12.0947 3.2085H15.9062ZM9.1395 5.01916C8.41617 5.0775 7.967 5.19066 7.61117 5.3715C6.89791 5.73498 6.31799 6.3149 5.9545 7.02816C5.77367 7.384 5.66167 7.83316 5.60217 8.5565C5.56484 9.0115 5.55084 9.54816 5.54384 10.2085H22.4547C22.4551 9.65733 22.4361 9.10632 22.3975 8.5565C22.3392 7.83316 22.226 7.384 22.0452 7.02816C21.6817 6.3149 21.1018 5.73498 20.3885 5.3715C20.0327 5.19066 19.5835 5.07866 18.8602 5.01916C18.1252 4.95966 17.1872 4.9585 15.8665 4.9585H12.1332C10.8113 4.9585 9.87334 4.9585 9.1395 5.01916ZM22.7463 10.2085C22.747 9.64953 22.7275 9.09073 22.688 8.53316C22.6273 7.79 22.5107 7.3 22.3053 6.89633C21.9138 6.12773 21.2889 5.50286 20.5203 5.11133C20.1167 4.906 19.6267 4.78933 18.8847 4.72866C18.1357 4.66683 17.1825 4.66683 15.8665 4.66683H12.1332C10.8172 4.66683 9.864 4.66683 9.11617 4.72866C8.373 4.78933 7.883 4.906 7.47934 5.11133C6.71074 5.50286 6.08587 6.12773 5.69434 6.89633C5.489 7.3 5.37234 7.79 5.31167 8.53316C5.27317 8.99983 5.25917 9.54466 5.25334 10.2085L5.24984 10.5002H22.7498L22.7463 10.2085ZM22.4582 11.9585H5.5415V16.4502C5.5415 17.772 5.5415 18.71 5.60217 19.4438C5.6605 20.1672 5.77367 20.6163 5.9545 20.9722C6.31799 21.6854 6.89791 22.2653 7.61117 22.6288C7.967 22.8097 8.41617 22.9217 9.1395 22.9812C9.8745 23.0407 10.8113 23.0418 12.1332 23.0418H15.8665C17.1883 23.0418 18.1263 23.0418 18.8602 22.9812C19.5835 22.9228 20.0327 22.8097 20.3885 22.6288C21.1018 22.2653 21.6817 21.6854 22.0452 20.9722C22.226 20.6163 22.338 20.1672 22.3975 19.4438C22.457 18.7088 22.4582 17.7708 22.4582 16.4502V11.9585ZM12.1063 3.50016H15.8933C17.1767 3.50016 18.1777 3.50016 18.9792 3.5655C19.7935 3.632 20.455 3.76966 21.05 4.07183C22.0381 4.57521 22.8415 5.37855 23.3448 6.36666C23.6482 6.96166 23.7847 7.62316 23.8512 8.4375C23.9165 9.239 23.9165 10.2388 23.9165 11.5233V16.477C23.9165 17.7603 23.9165 18.7613 23.8512 19.5628C23.7847 20.3772 23.647 21.0387 23.3448 21.6337C22.8415 22.6218 22.0381 23.4251 21.05 23.9285C20.455 24.2318 19.7935 24.3683 18.9792 24.4348C18.1777 24.5002 17.1778 24.5002 15.8933 24.5002H12.1063C10.823 24.5002 9.822 24.5002 9.0205 24.4348C8.20617 24.3683 7.54467 24.2307 6.94967 23.9285C5.96156 23.4251 5.15822 22.6218 4.65484 21.6337C4.3515 21.0387 4.215 20.3772 4.1485 19.5628C4.08317 18.7613 4.08317 17.7615 4.08317 16.477V11.5233C4.08317 10.24 4.08317 9.239 4.1485 8.4375C4.215 7.62316 4.35267 6.96166 4.65484 6.36666C5.15822 5.37855 5.96156 4.57521 6.94967 4.07183C7.54467 3.7685 8.20617 3.632 9.0205 3.5655C9.82317 3.50016 10.8218 3.50016 12.1063 3.50016ZM5.24984 11.6668V16.4502C5.24984 17.7662 5.24984 18.7193 5.31167 19.4672C5.37234 20.2103 5.489 20.7003 5.69434 21.104C6.08587 21.8726 6.71074 22.4975 7.47934 22.889C7.883 23.0943 8.373 23.211 9.11617 23.2717C9.864 23.3335 10.8172 23.3335 12.1332 23.3335H15.8665C17.1825 23.3335 18.1357 23.3335 18.8835 23.2717C19.6267 23.211 20.1167 23.0943 20.5203 22.889C21.2889 22.4975 21.9138 21.8726 22.3053 21.104C22.5107 20.7003 22.6273 20.2103 22.688 19.4683C22.7498 18.7193 22.7498 17.7662 22.7498 16.4502V11.6668H5.24984ZM9.9165 7.5835C9.9165 7.42879 9.97796 7.28041 10.0874 7.17102C10.1968 7.06162 10.3451 7.00016 10.4998 7.00016H17.4998C17.6545 7.00016 17.8029 7.06162 17.9123 7.17102C18.0217 7.28041 18.0832 7.42879 18.0832 7.5835C18.0832 7.73821 18.0217 7.88658 17.9123 7.99598C17.8029 8.10537 17.6545 8.16683 17.4998 8.16683H10.4998C10.3451 8.16683 10.1968 8.10537 10.0874 7.99598C9.97796 7.88658 9.9165 7.73821 9.9165 7.5835ZM9.33317 14.0002C9.02375 14.0002 8.72701 14.1231 8.50821 14.3419C8.28942 14.5607 8.1665 14.8574 8.1665 15.1668C8.1665 15.4762 8.28942 15.773 8.50821 15.9918C8.72701 16.2106 9.02375 16.3335 9.33317 16.3335C9.64259 16.3335 9.93934 16.2106 10.1581 15.9918C10.3769 15.773 10.4998 15.4762 10.4998 15.1668C10.4998 14.8574 10.3769 14.5607 10.1581 14.3419C9.93934 14.1231 9.64259 14.0002 9.33317 14.0002ZM17.4998 15.1668C17.4998 14.8574 17.6228 14.5607 17.8415 14.3419C18.0603 14.1231 18.3571 14.0002 18.6665 14.0002C18.9759 14.0002 19.2727 14.1231 19.4915 14.3419C19.7103 14.5607 19.8332 14.8574 19.8332 15.1668C19.8332 15.4762 19.7103 15.773 19.4915 15.9918C19.2727 16.2106 18.9759 16.3335 18.6665 16.3335C18.3571 16.3335 18.0603 16.2106 17.8415 15.9918C17.6228 15.773 17.4998 15.4762 17.4998 15.1668ZM12.8332 15.1668C12.8332 14.8574 12.9561 14.5607 13.1749 14.3419C13.3937 14.1231 13.6904 14.0002 13.9998 14.0002C14.3093 14.0002 14.606 14.1231 14.8248 14.3419C15.0436 14.5607 15.1665 14.8574 15.1665 15.1668C15.1665 15.4762 15.0436 15.773 14.8248 15.9918C14.606 16.2106 14.3093 16.3335 13.9998 16.3335C13.6904 16.3335 13.3937 16.2106 13.1749 15.9918C12.9561 15.773 12.8332 15.4762 12.8332 15.1668ZM8.1665 19.8335C8.1665 19.5241 8.28942 19.2273 8.50821 19.0085C8.72701 18.7897 9.02375 18.6668 9.33317 18.6668C9.64259 18.6668 9.93934 18.7897 10.1581 19.0085C10.3769 19.2273 10.4998 19.5241 10.4998 19.8335C10.4998 20.1429 10.3769 20.4397 10.1581 20.6585C9.93934 20.8772 9.64259 21.0002 9.33317 21.0002C9.02375 21.0002 8.72701 20.8772 8.50821 20.6585C8.28942 20.4397 8.1665 20.1429 8.1665 19.8335ZM12.8332 19.8335C12.8332 19.5241 12.9561 19.2273 13.1749 19.0085C13.3937 18.7897 13.6904 18.6668 13.9998 18.6668C14.3093 18.6668 14.606 18.7897 14.8248 19.0085C15.0436 19.2273 15.1665 19.5241 15.1665 19.8335C15.1665 20.1429 15.0436 20.4397 14.8248 20.6585C14.606 20.8772 14.3093 21.0002 13.9998 21.0002C13.6904 21.0002 13.3937 20.8772 13.1749 20.6585C12.9561 20.4397 12.8332 20.1429 12.8332 19.8335Z'
            fill={color ? color : '#000'}
          />
        </svg>
      );
    case 'firecracker':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M5.8 11.3L2 22L12.7 18.21'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M4 3H4.01'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M22 8H22.01'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M15 2H15.01'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M22 20H22.01'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M22 2L19.76 2.75C19.1224 2.96239 18.5783 3.38964 18.2208 3.95872C17.8633 4.52781 17.7146 5.20339 17.8 5.87C17.9 6.73 17.23 7.5 16.35 7.5H15.97C15.11 7.5 14.37 8.1 14.21 8.94L14 10'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M22 13.0001L21.18 12.6701C20.32 12.3301 19.36 12.8701 19.2 13.7801C19.09 14.4801 18.48 15.0001 17.77 15.0001H17'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M11 2L11.33 2.82C11.67 3.68 11.13 4.64 10.22 4.8C9.52 4.9 9 5.52 9 6.23V7'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M11.0005 13C12.9305 14.93 13.8305 17.17 13.0005 18C12.1705 18.83 9.93051 17.93 8.00051 16C6.07051 14.07 5.17051 11.83 6.00051 11C6.83051 10.17 9.07051 11.07 11.0005 13Z'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'waves':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 33 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M3.16602 7.99996C3.96602 8.66663 4.76602 9.33329 6.49935 9.33329C9.83268 9.33329 9.83268 6.66663 13.166 6.66663C16.6327 6.66663 16.366 9.33329 19.8327 9.33329C23.166 9.33329 23.166 6.66663 26.4993 6.66663C28.2327 6.66663 29.0327 7.33329 29.8327 7.99996'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M3.16602 16C3.96602 16.6666 4.76602 17.3333 6.49935 17.3333C9.83268 17.3333 9.83268 14.6666 13.166 14.6666C16.6327 14.6666 16.366 17.3333 19.8327 17.3333C23.166 17.3333 23.166 14.6666 26.4993 14.6666C28.2327 14.6666 29.0327 15.3333 29.8327 16'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M3.16602 24C3.96602 24.6666 4.76602 25.3333 6.49935 25.3333C9.83268 25.3333 9.83268 22.6666 13.166 22.6666C16.6327 22.6666 16.366 25.3333 19.8327 25.3333C23.166 25.3333 23.166 22.6666 26.4993 22.6666C28.2327 22.6666 29.0327 23.3333 29.8327 24'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'warning':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 25 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M22.2304 18L14.2304 3.99998C14.056 3.69218 13.803 3.43617 13.4973 3.25805C13.1917 3.07993 12.8442 2.98608 12.4904 2.98608C12.1366 2.98608 11.7892 3.07993 11.4835 3.25805C11.1778 3.43617 10.9249 3.69218 10.7504 3.99998L2.75042 18C2.5741 18.3053 2.48165 18.6519 2.48243 19.0045C2.48321 19.3571 2.5772 19.7032 2.75486 20.0078C2.93253 20.3124 3.18757 20.5646 3.49411 20.7388C3.80066 20.9131 4.14783 21.0032 4.50042 21H20.5004C20.8513 20.9996 21.1959 20.9069 21.4997 20.7313C21.8035 20.5556 22.0556 20.3031 22.2309 19.9991C22.4062 19.6951 22.4985 19.3504 22.4984 18.9995C22.4983 18.6486 22.4059 18.3039 22.2304 18Z'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12.5 9V13'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12.5 17H12.51'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'user':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M20 21C20 18.8783 19.1571 16.8434 17.6569 15.3431C16.1566 13.8429 14.1217 13 12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'telegram':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 18 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M16.6687 0.394658C16.4748 0.402673 16.2861 0.453521 16.116 0.517741C15.9476 0.581532 14.978 0.971582 13.5461 1.54856C12.1142 2.12554 10.2529 2.87689 8.40786 3.62192C4.71772 5.11199 1.09151 6.57811 1.09151 6.57811L1.11794 6.56858C1.11794 6.56858 0.899085 6.63753 0.677191 6.78325C0.566245 6.8561 0.446884 6.95016 0.349153 7.08729C0.251422 7.22442 0.179974 7.41876 0.206899 7.62431C0.301473 8.3463 1.0954 8.5511 1.0954 8.5511L1.09851 8.55256L4.64164 9.69548C4.73197 9.9795 5.71628 13.0758 5.9328 13.7316C6.05238 14.0941 6.16431 14.3032 6.28105 14.4459C6.33948 14.5173 6.4007 14.5725 6.46839 14.6129C6.49529 14.629 6.52358 14.641 6.55157 14.6518H6.55312C6.55656 14.6532 6.5598 14.6533 6.56323 14.6547L6.5539 14.6525C6.5604 14.655 6.56682 14.6591 6.57333 14.6613C6.58597 14.6655 6.59371 14.6653 6.60987 14.6686C7.01565 14.8021 7.35145 14.5543 7.35145 14.5543L7.36545 14.5441L9.542 12.6414L13.0742 15.2371L13.1186 15.2562C13.7368 15.5149 14.296 15.3706 14.6056 15.1331C14.9153 14.8956 15.037 14.5895 15.037 14.5895L15.0503 14.5573L17.6458 1.80718C17.7122 1.52193 17.7216 1.27537 17.659 1.05257C17.5964 0.829763 17.4442 0.636082 17.2532 0.528731C17.0623 0.421379 16.8625 0.386643 16.6687 0.394658ZM16.6897 1.15733C16.7684 1.1539 16.8267 1.16238 16.8451 1.17272C16.8635 1.18306 16.8718 1.1817 16.8894 1.24452C16.9071 1.30734 16.9167 1.43965 16.8685 1.64673L16.8669 1.65113L14.2861 14.3272C14.28 14.34 14.2262 14.4572 14.1034 14.5514C13.9782 14.6475 13.8389 14.7224 13.4691 14.5763L9.60652 11.7373L9.4977 11.6567L9.49536 11.6589L8.34023 10.8421L14.8318 3.6439C14.8817 3.58873 14.9136 3.52113 14.9235 3.44926C14.9335 3.37739 14.9212 3.30434 14.8881 3.23893C14.8549 3.17352 14.8024 3.11856 14.7368 3.0807C14.6712 3.04283 14.5954 3.02368 14.5185 3.02556C14.4434 3.02739 14.3704 3.04924 14.3079 3.08856L4.91448 8.99068L1.36592 7.84557C1.36592 7.84557 1.01355 7.66076 0.996679 7.532C0.995744 7.52487 0.991583 7.53132 1.00989 7.50563C1.0282 7.47993 1.07423 7.43656 1.13194 7.39866C1.24735 7.32287 1.37913 7.27704 1.37913 7.27704L1.39235 7.27265L1.40556 7.26752C1.40556 7.26752 5.03195 5.80132 8.72191 4.31133C10.5669 3.56634 12.4279 2.81554 13.8594 2.2387C15.2905 1.66202 16.3246 1.24692 16.4122 1.21375C16.5118 1.17612 16.6109 1.16077 16.6897 1.15733ZM12.3847 5.19855L7.46184 10.6574L7.4595 10.6596C7.45182 10.6683 7.44456 10.6774 7.43774 10.6867C7.42993 10.6969 7.42267 10.7074 7.41597 10.7182C7.38831 10.7625 7.37059 10.8116 7.36389 10.8626C7.36389 10.8635 7.36389 10.8645 7.36389 10.8655L6.72258 13.5836C6.71192 13.5542 6.70446 13.5435 6.69304 13.5088V13.5081C6.48935 12.8913 5.56068 9.97113 5.4322 9.56726L12.3847 5.19855ZM8.01764 11.552L8.90225 12.1776L7.60254 13.3132L8.01764 11.552Z'
            fill={color ? color : '#000'}
          />
        </svg>
      );
    case 'star':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 36 36'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M18 3.23607L20.8657 12.0557C21.1334 12.8798 21.9013 13.4377 22.7678 13.4377H32.0413L24.5389 18.8885C23.8379 19.3978 23.5446 20.3006 23.8123 21.1246L26.678 29.9443L19.1756 24.4934C18.4746 23.9841 17.5254 23.9841 16.8244 24.4934L9.32198 29.9443L12.1877 21.1246C12.4554 20.3006 12.1621 19.3978 11.4611 18.8885L3.95867 13.4377H13.2322C14.0987 13.4377 14.8666 12.8798 15.1343 12.0557L18 3.23607Z'
            stroke={color ? color : '#3440CE'}
            strokeWidth='2'
          />
        </svg>
      );
    case 'star-full':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 36 36'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M17.0489 2.92705C17.3483 2.00574 18.6517 2.00574 18.9511 2.92705L21.8167 11.7467C21.9506 12.1587 22.3346 12.4377 22.7678 12.4377H32.0413C33.0101 12.4377 33.4128 13.6773 32.6291 14.2467L25.1267 19.6976C24.7762 19.9522 24.6295 20.4036 24.7634 20.8156L27.6291 29.6353C27.9284 30.5566 26.874 31.3227 26.0902 30.7533L18.5878 25.3024C18.2373 25.0478 17.7627 25.0478 17.4122 25.3024L9.90976 30.7533C9.12605 31.3227 8.07157 30.5566 8.37092 29.6353L11.2366 20.8156C11.3705 20.4036 11.2238 19.9522 10.8733 19.6976L3.37088 14.2467C2.58717 13.6773 2.98994 12.4377 3.95867 12.4377H13.2322C13.6654 12.4377 14.0494 12.1587 14.1833 11.7467L17.0489 2.92705Z'
            fill={color ? color : '#3440CE'}
          />
        </svg>
      );
    case 'sofa':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2 20V12C2 11.4696 2.21071 10.9609 2.58579 10.5858C2.96086 10.2107 3.46957 10 4 10H20C20.5304 10 21.0391 10.2107 21.4142 10.5858C21.7893 10.9609 22 11.4696 22 12V20'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M4 10V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V10'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12 4V10'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M2 18H22'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'phone':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7.27223 4.00053L4.71305 4.00053C4.47547 3.99956 4.24031 4.04832 4.02262 4.14369C3.80494 4.23906 3.60954 4.37893 3.44893 4.55434C3.28832 4.72976 3.16603 4.93685 3.08992 5.16235C3.01381 5.38786 2.98554 5.62681 3.00693 5.86389C3.29215 8.49412 4.18914 11.0206 5.62582 13.2404C6.93556 15.3057 8.68305 17.0566 10.7442 18.369C12.9697 19.8135 15.5034 20.7125 18.1402 20.9931C18.3761 21.0144 18.6139 20.9863 18.8384 20.9106C19.0628 20.8348 19.2691 20.7131 19.444 20.5531C19.619 20.3931 19.7587 20.1983 19.8545 19.9812C19.9502 19.7641 19.9997 19.5294 19.9999 19.2921V16.7278C20.004 16.313 19.8574 15.9109 19.5874 15.5963C19.3175 15.2818 18.9426 15.0764 18.5327 15.0183C17.7137 14.9101 16.9095 14.7094 16.1355 14.42C15.8302 14.305 15.4984 14.2801 15.1794 14.3483C14.8604 14.4164 14.5675 14.5748 14.3356 14.8046L13.2522 15.8902C11.1165 14.6734 9.34821 12.9016 8.13383 10.7616L9.21721 9.6761C9.44657 9.4437 9.60463 9.1503 9.67267 8.83065C9.74071 8.511 9.71587 8.17851 9.60109 7.87257C9.31229 7.09707 9.11197 6.29133 9.00395 5.47071C8.94549 5.0555 8.73677 4.6763 8.41747 4.40523C8.09818 4.13416 7.6906 3.99013 7.27223 4.00053Z'
            stroke={color ? color : '#000'}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'ru':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 22 15'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_915_6377)'>
            <mask
              id='mask0_915_6377'
              maskUnits='userSpaceOnUse'
              x='0'
              y='0'
              width='22'
              height='15'
            >
              <path
                d='M19.5 0H2.5C1.39543 0 0.5 0.89543 0.5 2V13C0.5 14.1046 1.39543 15 2.5 15H19.5C20.6046 15 21.5 14.1046 21.5 13V2C21.5 0.89543 20.6046 0 19.5 0Z'
                fill='white'
              />
            </mask>
            <g mask='url(#mask0_915_6377)'>
              <path
                d='M19.5 0H2.5C1.39543 0 0.5 0.89543 0.5 2V13C0.5 14.1046 1.39543 15 2.5 15H19.5C20.6046 15 21.5 14.1046 21.5 13V2C21.5 0.89543 20.6046 0 19.5 0Z'
                fill='#0034A9'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0.5 10H21.5V15H0.5V10Z'
                fill='#D7280F'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0.5 0H21.5V5H0.5V0Z'
                fill='white'
              />
              <path
                d='M19.5 0.5H2.5C1.67157 0.5 1 1.17157 1 2V13C1 13.8284 1.67157 14.5 2.5 14.5H19.5C20.3284 14.5 21 13.8284 21 13V2C21 1.17157 20.3284 0.5 19.5 0.5Z'
                stroke='black'
                strokeOpacity='0.1'
              />
            </g>
          </g>
          <defs>
            <clipPath id='clip0_915_6377'>
              <rect width='21' height='15' fill='white' transform='translate(0.5)' />
            </clipPath>
          </defs>
        </svg>
      );
    case 'gb':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 22 15'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_915_6385)'>
            <mask
              id='mask0_915_6385'
              maskUnits='userSpaceOnUse'
              x='0'
              y='0'
              width='22'
              height='15'
            >
              <path
                d='M19.5 0H2.5C1.39543 0 0.5 0.89543 0.5 2V13C0.5 14.1046 1.39543 15 2.5 15H19.5C20.6046 15 21.5 14.1046 21.5 13V2C21.5 0.89543 20.6046 0 19.5 0Z'
                fill='white'
              />
            </mask>
            <g mask='url(#mask0_915_6385)'>
              <path
                d='M19.5 0H2.5C1.39543 0 0.5 0.89543 0.5 2V13C0.5 14.1046 1.39543 15 2.5 15H19.5C20.6046 15 21.5 14.1046 21.5 13V2C21.5 0.89543 20.6046 0 19.5 0Z'
                fill='#22438B'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.50061 1L1.47461 1.026L1.50061 3L18.4826 14.028L20.5196 13.991L20.4816 12.029L3.50061 1Z'
                fill='white'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M2.5 1L1.5 2L19.5 14L20.5 13L2.5 1Z'
                fill='#C7152A'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M18.5002 1H20.5002V3C20.5002 3 8.75023 10.396 3.51823 14.028C3.45523 14.072 1.52023 14.031 1.52023 14.031L1.36523 12.13L18.5002 1Z'
                fill='white'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M19.543 0.972046L20.5 2.00005L2.5 14L1.5 13L19.543 0.972046Z'
                fill='#C7152A'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.5 1H13.5V5H20.5V10H13.5V14H8.5V10H1.5V5H8.5V1Z'
                fill='white'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M9.5 1H12.5V6H20.5V9H12.5V14H9.5V9H1.5V6H9.5V1Z'
                fill='#C7152A'
              />
              <path
                d='M19.5 0.5H2.5C1.67157 0.5 1 1.17157 1 2V13C1 13.8284 1.67157 14.5 2.5 14.5H19.5C20.3284 14.5 21 13.8284 21 13V2C21 1.17157 20.3284 0.5 19.5 0.5Z'
                stroke='black'
                strokeOpacity='0.1'
              />
            </g>
          </g>
          <defs>
            <clipPath id='clip0_915_6385'>
              <rect width='21' height='15' fill='white' transform='translate(0.5)' />
            </clipPath>
          </defs>
        </svg>
      );
    case 'like-bold':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M20.2692 16.265L20.9742 12.185C21.0156 11.9458 21.0042 11.7005 20.9409 11.4663C20.8776 11.232 20.7638 11.0144 20.6076 10.8286C20.4514 10.6429 20.2565 10.4935 20.0366 10.391C19.8166 10.2884 19.5769 10.2352 19.3342 10.235H14.1532C14.0323 10.235 13.9128 10.2087 13.8031 10.1579C13.6934 10.1071 13.596 10.033 13.5178 9.94082C13.4396 9.84861 13.3824 9.74049 13.3502 9.62395C13.3179 9.50741 13.3115 9.38525 13.3312 9.26596L13.9942 5.22096C14.1013 4.56416 14.0707 3.89227 13.9042 3.24796C13.8324 2.98196 13.6947 2.73836 13.5038 2.53964C13.3129 2.34092 13.0751 2.19349 12.8122 2.11096L12.6672 2.06396C12.3393 1.95906 11.9838 1.98338 11.6732 2.13196C11.3332 2.29596 11.0852 2.59496 10.9932 2.94996L10.5172 4.78396C10.3659 5.36767 10.1457 5.9313 9.86123 6.46296C9.44623 7.23996 8.80423 7.86296 8.13623 8.43796L6.69723 9.67796C6.49759 9.85047 6.34168 10.0678 6.24225 10.3122C6.14283 10.5566 6.10272 10.8211 6.12523 11.084L6.93723 20.477C6.97301 20.8924 7.16327 21.2793 7.47042 21.5612C7.77756 21.8432 8.17928 21.9997 8.59623 22H13.2442C16.7262 22 19.6972 19.574 20.2692 16.265Z'
            fill={color ? color : '#000'}
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M2.96808 9.48497C3.16134 9.47652 3.35039 9.54307 3.49574 9.67072C3.64109 9.79837 3.7315 9.97724 3.74808 10.17L4.71808 21.406C4.73451 21.5733 4.71666 21.7422 4.66562 21.9024C4.61458 22.0626 4.53142 22.2107 4.42122 22.3377C4.31102 22.4646 4.17609 22.5678 4.02468 22.6409C3.87327 22.714 3.70855 22.7554 3.54058 22.7627C3.37261 22.77 3.20492 22.743 3.04775 22.6833C2.89058 22.6236 2.74723 22.5324 2.62646 22.4155C2.50568 22.2985 2.41002 22.1582 2.3453 22.003C2.28059 21.8478 2.24819 21.6811 2.25008 21.513V10.234C2.25016 10.0407 2.32488 9.85483 2.45866 9.71528C2.59244 9.57573 2.77494 9.49322 2.96808 9.48497Z'
            fill={color ? color : '#000'}
          />
        </svg>
      );
    case 'location':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 25 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M20.5 10C20.5 14.993 14.961 20.193 13.101 21.799C12.9277 21.9293 12.7168 21.9998 12.5 21.9998C12.2832 21.9998 12.0723 21.9293 11.899 21.799C10.039 20.193 4.5 14.993 4.5 10C4.5 7.87827 5.34285 5.84344 6.84315 4.34315C8.34344 2.84285 10.3783 2 12.5 2C14.6217 2 16.6566 2.84285 18.1569 4.34315C19.6571 5.84344 20.5 7.87827 20.5 10Z'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12.5 13C14.1569 13 15.5 11.6569 15.5 10C15.5 8.34315 14.1569 7 12.5 7C10.8431 7 9.5 8.34315 9.5 10C9.5 11.6569 10.8431 13 12.5 13Z'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'magic-wand':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 31 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10.4986 25.0001L19.2486 16.2463C19.9105 15.5849 20.2826 14.6877 20.2829 13.752C20.2833 12.8163 19.9119 11.9188 19.2505 11.2569C18.5891 10.595 17.6919 10.223 16.7562 10.2227C15.8205 10.2223 14.923 10.5937 14.2611 11.2551L5.50239 20.0013C5.17409 20.3294 4.91361 20.7189 4.73584 21.1476C4.55807 21.5763 4.46648 22.0359 4.46631 22.5C4.46613 22.9641 4.55738 23.4237 4.73483 23.8526C4.91228 24.2814 5.17246 24.6711 5.50052 24.9994C5.82857 25.3277 6.21809 25.5882 6.64681 25.766C7.07553 25.9437 7.53507 26.0353 7.99919 26.0355C8.46331 26.0357 8.92292 25.9444 9.35177 25.767C9.78063 25.5895 10.1703 25.3281 10.4986 25.0001ZM14.2499 13.7501L16.7499 16.2501L17.9999 15.0001C18.164 14.8359 18.2943 14.641 18.3831 14.4265C18.4719 14.2121 18.5177 13.9822 18.5177 13.7501C18.5177 13.5179 18.4719 13.288 18.3831 13.0736C18.2943 12.8591 18.164 12.6642 17.9999 12.5001C17.8357 12.3359 17.6409 12.2057 17.4264 12.1168C17.2119 12.028 16.982 11.9823 16.7499 11.9823C16.5177 11.9823 16.2879 12.028 16.0734 12.1168C15.8589 12.2057 15.664 12.3359 15.4999 12.5001L14.2499 13.7501Z'
            fill={color ? color : '#000'}
          />
          <path
            d='M8.84383 6.12121C8.92633 5.81246 9.36383 5.81246 9.44633 6.12121L9.89508 7.78121C9.90934 7.8339 9.93715 7.88194 9.97575 7.92054C10.0144 7.95913 10.0624 7.98695 10.1151 8.00121L11.7751 8.44871C12.0838 8.53121 12.0838 8.96871 11.7751 9.05121L10.1138 9.49996C10.0611 9.51422 10.0131 9.54204 9.9745 9.58064C9.9359 9.61923 9.90809 9.66727 9.89383 9.71996L9.44508 11.3787C9.36258 11.6875 8.92508 11.6875 8.84258 11.3787L8.39508 9.71871C8.38082 9.66602 8.353 9.61798 8.3144 9.57939C8.2758 9.54079 8.22777 9.51297 8.17508 9.49871L6.51383 9.05121C6.20633 8.96871 6.20633 8.53121 6.51383 8.44871L8.17633 7.99996C8.22902 7.9857 8.27705 7.95788 8.31565 7.91929C8.35425 7.88069 8.38207 7.83265 8.39633 7.77996L8.84383 6.12121ZM21.3438 4.87121C21.4263 4.56246 21.8638 4.56246 21.9463 4.87121L22.3938 6.53121C22.4081 6.5839 22.4359 6.63194 22.4745 6.67054C22.5131 6.70913 22.5611 6.73695 22.6138 6.75121L24.2738 7.19871C24.5826 7.28121 24.5826 7.71871 24.2738 7.80121L22.6138 8.24871C22.5611 8.26297 22.5131 8.29079 22.4745 8.32939C22.4359 8.36798 22.4081 8.41602 22.3938 8.46871L21.9463 10.1287C21.8638 10.4375 21.4263 10.4375 21.3438 10.1287L20.8951 8.46871C20.8807 8.41587 20.8527 8.36773 20.8139 8.32912C20.775 8.29051 20.7268 8.26278 20.6738 8.24871L19.0138 7.80121C18.7063 7.71871 18.7063 7.28121 19.0138 7.19871L20.6738 6.75121C20.7268 6.73714 20.775 6.70941 20.8139 6.6708C20.8527 6.63219 20.8807 6.58405 20.8951 6.53121L21.3438 4.87121ZM22.5938 16.1212C22.6763 15.8125 23.1138 15.8125 23.1963 16.1212L23.6438 17.7812C23.6581 17.8339 23.6859 17.8819 23.7245 17.9205C23.7631 17.9591 23.8111 17.9869 23.8638 18.0012L25.5238 18.4487C25.8326 18.5312 25.8326 18.9687 25.5238 19.0512L23.8638 19.4987C23.8111 19.513 23.7631 19.5408 23.7245 19.5794C23.6859 19.618 23.6581 19.666 23.6438 19.7187L23.1963 21.3787C23.1138 21.6875 22.6763 21.6875 22.5938 21.3787L22.1463 19.7187C22.132 19.6659 22.104 19.6177 22.0651 19.5791C22.0263 19.5405 21.978 19.5128 21.9251 19.4987L20.2651 19.0512C19.9576 18.9687 19.9576 18.5312 20.2651 18.4487L21.9251 18.0012C21.978 17.9871 22.0263 17.9594 22.0651 17.9208C22.104 17.8822 22.132 17.8341 22.1463 17.7812L22.5938 16.1212Z'
            fill={color ? color : '#000'}
          />
        </svg>
      );
    case 'mail':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M16.6665 3.33301H3.33317C2.4127 3.33301 1.6665 4.0792 1.6665 4.99967V14.9997C1.6665 15.9201 2.4127 16.6663 3.33317 16.6663H16.6665C17.587 16.6663 18.3332 15.9201 18.3332 14.9997V4.99967C18.3332 4.0792 17.587 3.33301 16.6665 3.33301Z'
            stroke={color ? color : '#000'}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M18.3332 5.83301L10.8582 10.583C10.6009 10.7442 10.3034 10.8297 9.99984 10.8297C9.69624 10.8297 9.39878 10.7442 9.1415 10.583L1.6665 5.83301'
            stroke={color ? color : '#000'}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'arrow':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          strokeWidth={strokeWidth}
          viewBox='0 0 25 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          onClick={onClick}
        >
          <path
            d='M9.5 18L15.5 12L9.5 6'
            stroke={color ? color : '#000'}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'cross':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          onClick={onClick}
        >
          <path
            d='M1.46289 14.5326L14.6622 1.33327'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M1.4668 1.3335L14.6661 14.5328'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'fire':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 17 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M6.16732 9.66667C6.60935 9.66667 7.03327 9.49107 7.34583 9.17851C7.65839 8.86595 7.83398 8.44203 7.83398 8C7.83398 7.08 7.50065 6.66667 7.16732 6C6.45265 4.57133 7.01798 3.29733 8.50065 2C8.83398 3.66667 9.83398 5.26667 11.1673 6.33333C12.5007 7.4 13.1673 8.66667 13.1673 10C13.1673 10.6128 13.0466 11.2197 12.8121 11.7859C12.5776 12.352 12.2338 12.8665 11.8005 13.2998C11.3671 13.7332 10.8527 14.0769 10.2865 14.3114C9.72032 14.546 9.11349 14.6667 8.50065 14.6667C7.88782 14.6667 7.28098 14.546 6.71479 14.3114C6.14861 14.0769 5.63416 13.7332 5.20082 13.2998C4.76748 12.8665 4.42374 12.352 4.18921 11.7859C3.95469 11.2197 3.83398 10.6128 3.83398 10C3.83398 9.23133 4.12265 8.47067 4.50065 8C4.50065 8.44203 4.67625 8.86595 4.98881 9.17851C5.30137 9.49107 5.72529 9.66667 6.16732 9.66667Z'
            stroke={color ? color : '#000'}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'image':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M9 11C10.1046 11 11 10.1046 11 9C11 7.89543 10.1046 7 9 7C7.89543 7 7 7.89543 7 9C7 10.1046 7.89543 11 9 11Z'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M21 14.9999L17.914 11.9139C17.5389 11.539 17.0303 11.3284 16.5 11.3284C15.9697 11.3284 15.4611 11.539 15.086 11.9139L6 20.9999'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'lightning':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2.66699 9.33328C2.54083 9.33371 2.41714 9.29833 2.31029 9.23126C2.20344 9.1642 2.11781 9.06818 2.06335 8.95438C2.0089 8.84059 1.98785 8.71367 2.00265 8.58838C2.01746 8.4631 2.06751 8.34459 2.14699 8.24661L8.74699 1.44661C8.7965 1.38947 8.86396 1.35085 8.93831 1.3371C9.01266 1.32335 9.08947 1.33529 9.15614 1.37095C9.22281 1.40661 9.27538 1.46388 9.30521 1.53335C9.33504 1.60283 9.34037 1.68038 9.32032 1.75328L8.04032 5.76661C8.00258 5.86763 7.9899 5.97629 8.00338 6.08328C8.01686 6.19028 8.05609 6.2924 8.11771 6.3809C8.17933 6.46939 8.2615 6.54162 8.35717 6.59139C8.45284 6.64115 8.55915 6.66696 8.66699 6.66661H13.3337C13.4598 6.66618 13.5835 6.70156 13.6904 6.76863C13.7972 6.8357 13.8828 6.93171 13.9373 7.04551C13.9917 7.15931 14.0128 7.28622 13.998 7.41151C13.9832 7.53679 13.9331 7.65531 13.8537 7.75328L7.25365 14.5533C7.20415 14.6104 7.13668 14.649 7.06233 14.6628C6.98798 14.6765 6.91117 14.6646 6.8445 14.6289C6.77783 14.5933 6.72526 14.536 6.69543 14.4665C6.6656 14.3971 6.66027 14.3195 6.68032 14.2466L7.96032 10.2333C7.99806 10.1323 8.01074 10.0236 7.99726 9.91661C7.98378 9.80962 7.94455 9.70749 7.88293 9.619C7.82131 9.5305 7.73914 9.45827 7.64347 9.40851C7.5478 9.35874 7.44149 9.33293 7.33365 9.33328H2.66699Z'
            stroke={color ? color : '#000'}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'list':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M3 12H3.01'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M3 18H3.01'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M3 6H3.01'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M8 12H21'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M8 18H21'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M8 6H21'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'logo':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 65 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          onClick={onClick}
        >
          <path
            d='M9.25159 8.615C9.28093 8.659 9.29559 8.70667 9.29559 8.758C9.29559 8.824 9.26993 8.88267 9.21859 8.934C9.17459 8.978 9.11959 9 9.05359 9H6.21559C6.04693 9 5.91493 8.94133 5.81959 8.824L4.12559 6.371H3.79559V8.703C3.79559 8.78367 3.76626 8.85333 3.70759 8.912C3.64893 8.97067 3.57926 9 3.49859 9H1.23259C1.15193 9 1.08226 8.97067 1.02359 8.912C0.964927 8.85333 0.935594 8.78367 0.935594 8.703V1.597C0.935594 1.51633 0.964927 1.44667 1.02359 1.388C1.08226 1.32933 1.15193 1.3 1.23259 1.3H3.49859C3.57926 1.3 3.64893 1.32933 3.70759 1.388C3.76626 1.44667 3.79559 1.51633 3.79559 1.597V3.863H4.03759L5.64359 1.487C5.75359 1.36233 5.88926 1.3 6.05059 1.3H8.70159C8.76759 1.3 8.82259 1.32567 8.86659 1.377C8.91793 1.421 8.94359 1.476 8.94359 1.542C8.94359 1.60067 8.92526 1.652 8.88859 1.696L6.28159 4.875L9.25159 8.615ZM21.8533 1.3C21.9266 1.3 21.9853 1.32567 22.0293 1.377C22.0806 1.421 22.1063 1.47233 22.1063 1.531C22.1063 1.597 22.0843 1.68133 22.0403 1.784L19.6643 6.756C19.371 7.372 19.0996 7.834 18.8503 8.142C18.601 8.45 18.293 8.67 17.9263 8.802C17.567 8.934 17.072 9 16.4413 9H15.1763C15.0956 9 15.026 8.97067 14.9673 8.912C14.9086 8.85333 14.8793 8.78367 14.8793 8.703V6.943C14.8793 6.86233 14.9086 6.79267 14.9673 6.734C15.026 6.67533 15.0956 6.646 15.1763 6.646H16.0673C16.258 6.646 16.423 6.61667 16.5623 6.558L13.8783 1.641C13.8563 1.60433 13.8453 1.56767 13.8453 1.531C13.8453 1.465 13.871 1.41 13.9223 1.366C13.981 1.322 14.0543 1.3 14.1423 1.3H16.5513C16.6393 1.3 16.709 1.322 16.7603 1.366C16.8116 1.41 16.8593 1.476 16.9033 1.564L17.9813 3.907L19.0703 1.564C19.151 1.388 19.2756 1.3 19.4443 1.3H21.8533ZM34.191 1.3C34.2717 1.3 34.3413 1.32933 34.4 1.388C34.4587 1.44667 34.488 1.51633 34.488 1.597V6.635H35.049C35.1297 6.635 35.1993 6.66433 35.258 6.723C35.3167 6.78167 35.346 6.85133 35.346 6.932V10.067C35.346 10.1477 35.3167 10.2173 35.258 10.276C35.1993 10.3347 35.1297 10.364 35.049 10.364H33.267C33.1863 10.364 33.1167 10.3347 33.058 10.276C32.9993 10.2173 32.97 10.1477 32.97 10.067V9H29.219V10.067C29.219 10.1477 29.1897 10.2173 29.131 10.276C29.0723 10.3347 29.0027 10.364 28.922 10.364H27.151C27.0703 10.364 27.0007 10.3347 26.942 10.276C26.8833 10.2247 26.854 10.155 26.854 10.067V6.932C26.854 6.85133 26.8833 6.78167 26.942 6.723C27.0007 6.66433 27.0703 6.635 27.151 6.635H27.327C27.569 6.635 27.756 6.426 27.888 6.008C28.02 5.59 28.086 4.82367 28.086 3.709V1.597C28.086 1.51633 28.1153 1.44667 28.174 1.388C28.2327 1.32933 28.3023 1.3 28.383 1.3H34.191ZM30.726 3.929C30.726 4.53033 30.693 5.04733 30.627 5.48C30.561 5.90533 30.451 6.29033 30.297 6.635H31.848V3.555H30.726V3.929ZM42.7117 8.626C42.6164 8.87533 42.4514 9 42.2167 9H40.1377C40.0717 9 40.013 8.978 39.9617 8.934C39.9177 8.88267 39.8957 8.824 39.8957 8.758L39.9067 8.692L42.3047 1.663C42.334 1.56767 42.389 1.48333 42.4697 1.41C42.5504 1.33667 42.6604 1.3 42.7997 1.3H45.8577C45.997 1.3 46.107 1.33667 46.1877 1.41C46.2684 1.48333 46.3234 1.56767 46.3527 1.663L48.7507 8.692L48.7617 8.758C48.7617 8.824 48.736 8.88267 48.6847 8.934C48.6407 8.978 48.5857 9 48.5197 9H46.4407C46.206 9 46.041 8.87533 45.9457 8.626L45.6707 7.856H42.9867L42.7117 8.626ZM44.3287 3.423L43.5477 5.711H45.1097L44.3287 3.423Z'
            fill={color ? color : '#1A1F4C'}
          />
          <path
            d='M8.96189 13.3C9.03522 13.3 9.09389 13.3257 9.13789 13.377C9.18922 13.421 9.21489 13.4723 9.21489 13.531C9.21489 13.597 9.19289 13.6813 9.14889 13.784L6.77289 18.756C6.47956 19.372 6.20822 19.834 5.95889 20.142C5.70956 20.45 5.40156 20.67 5.03489 20.802C4.67556 20.934 4.18056 21 3.54989 21H2.28489C2.20422 21 2.13456 20.9707 2.07589 20.912C2.01722 20.8533 1.98789 20.7837 1.98789 20.703V18.943C1.98789 18.8623 2.01722 18.7927 2.07589 18.734C2.13456 18.6753 2.20422 18.646 2.28489 18.646H3.17589C3.36656 18.646 3.53156 18.6167 3.67089 18.558L0.986891 13.641C0.964891 13.6043 0.953891 13.5677 0.953891 13.531C0.953891 13.465 0.979557 13.41 1.03089 13.366C1.08956 13.322 1.16289 13.3 1.25089 13.3H3.65989C3.74789 13.3 3.81756 13.322 3.86889 13.366C3.92022 13.41 3.96789 13.476 4.01189 13.564L5.08989 15.907L6.17889 13.564C6.25956 13.388 6.38422 13.3 6.55289 13.3H8.96189ZM16.3166 20.703C16.3166 20.7837 16.2873 20.8533 16.2286 20.912C16.1699 20.9707 16.1003 21 16.0196 21H13.7536C13.6729 21 13.6033 20.9707 13.5446 20.912C13.4859 20.8533 13.4566 20.7837 13.4566 20.703V13.597C13.4566 13.5163 13.4859 13.4467 13.5446 13.388C13.6033 13.3293 13.6729 13.3 13.7536 13.3H19.7266C19.8073 13.3 19.8769 13.3293 19.9356 13.388C19.9943 13.4467 20.0236 13.5163 20.0236 13.597V15.368C20.0236 15.4487 19.9943 15.5183 19.9356 15.577C19.8769 15.6357 19.8073 15.665 19.7266 15.665H16.3056L16.3166 20.703ZM31.0963 17.821C31.0963 18.943 30.7223 19.7717 29.9743 20.307C29.2336 20.8423 28.2436 21.11 27.0043 21.11C25.765 21.11 24.7713 20.8423 24.0233 20.307C23.2826 19.7717 22.9123 18.9357 22.9123 17.799V16.501C22.9123 15.753 23.0883 15.1333 23.4403 14.642C23.7996 14.1433 24.2873 13.7767 24.9033 13.542C25.5193 13.3073 26.2196 13.19 27.0043 13.19C27.789 13.19 28.4856 13.3073 29.0943 13.542C29.7103 13.7767 30.198 14.1397 30.5573 14.631C30.9166 15.1223 31.0963 15.7383 31.0963 16.479V17.821ZM25.8823 18.03C25.8823 18.3307 25.9813 18.5617 26.1793 18.723C26.3846 18.8843 26.6596 18.965 27.0043 18.965C27.349 18.965 27.6203 18.8843 27.8183 18.723C28.0236 18.5543 28.1263 18.3197 28.1263 18.019V16.281C28.1263 15.9803 28.0236 15.7493 27.8183 15.588C27.6203 15.4193 27.349 15.335 27.0043 15.335C26.6596 15.335 26.3846 15.4157 26.1793 15.577C25.9813 15.7383 25.8823 15.9693 25.8823 16.27V18.03ZM41.091 13.3C41.1717 13.3 41.2413 13.3293 41.3 13.388C41.3587 13.4467 41.388 13.5163 41.388 13.597V18.635H41.949C42.0297 18.635 42.0993 18.6643 42.158 18.723C42.2167 18.7817 42.246 18.8513 42.246 18.932V22.067C42.246 22.1477 42.2167 22.2173 42.158 22.276C42.0993 22.3347 42.0297 22.364 41.949 22.364H40.167C40.0863 22.364 40.0167 22.3347 39.958 22.276C39.8993 22.2173 39.87 22.1477 39.87 22.067V21H36.119V22.067C36.119 22.1477 36.0897 22.2173 36.031 22.276C35.9723 22.3347 35.9027 22.364 35.822 22.364H34.051C33.9703 22.364 33.9007 22.3347 33.842 22.276C33.7833 22.2247 33.754 22.155 33.754 22.067V18.932C33.754 18.8513 33.7833 18.7817 33.842 18.723C33.9007 18.6643 33.9703 18.635 34.051 18.635H34.227C34.469 18.635 34.656 18.426 34.788 18.008C34.92 17.59 34.986 16.8237 34.986 15.709V13.597C34.986 13.5163 35.0153 13.4467 35.074 13.388C35.1327 13.3293 35.2023 13.3 35.283 13.3H41.091ZM37.626 15.929C37.626 16.5303 37.593 17.0473 37.527 17.48C37.461 17.9053 37.351 18.2903 37.197 18.635H38.748V15.555H37.626V15.929ZM52.6587 13.3C52.7394 13.3 52.809 13.3293 52.8677 13.388C52.9264 13.4467 52.9557 13.5163 52.9557 13.597V20.703C52.9557 20.7837 52.9264 20.8533 52.8677 20.912C52.809 20.9707 52.7394 21 52.6587 21H50.3927C50.312 21 50.2424 20.9707 50.1837 20.912C50.125 20.8533 50.0957 20.7837 50.0957 20.703V18.36H47.8957V20.703C47.8957 20.7837 47.8664 20.8533 47.8077 20.912C47.749 20.9707 47.6794 21 47.5987 21H45.3327C45.252 21 45.1824 20.9743 45.1237 20.923C45.065 20.8643 45.0357 20.791 45.0357 20.703V13.597C45.0357 13.5163 45.065 13.4467 45.1237 13.388C45.1824 13.3293 45.252 13.3 45.3327 13.3H47.5987C47.6794 13.3 47.749 13.3293 47.8077 13.388C47.8664 13.4467 47.8957 13.5163 47.8957 13.597V15.852H50.0957V13.597C50.0957 13.5163 50.125 13.4467 50.1837 13.388C50.2424 13.3293 50.312 13.3 50.3927 13.3H52.6587ZM64.0834 17.821C64.0834 18.943 63.7094 19.7717 62.9614 20.307C62.2207 20.8423 61.2307 21.11 59.9914 21.11C58.7521 21.11 57.7584 20.8423 57.0104 20.307C56.2697 19.7717 55.8994 18.9357 55.8994 17.799V16.501C55.8994 15.753 56.0754 15.1333 56.4274 14.642C56.7867 14.1433 57.2744 13.7767 57.8904 13.542C58.5064 13.3073 59.2067 13.19 59.9914 13.19C60.7761 13.19 61.4727 13.3073 62.0814 13.542C62.6974 13.7767 63.1851 14.1397 63.5444 14.631C63.9037 15.1223 64.0834 15.7383 64.0834 16.479V17.821ZM58.8694 18.03C58.8694 18.3307 58.9684 18.5617 59.1664 18.723C59.3717 18.8843 59.6467 18.965 59.9914 18.965C60.3361 18.965 60.6074 18.8843 60.8054 18.723C61.0107 18.5543 61.1134 18.3197 61.1134 18.019V16.281C61.1134 15.9803 61.0107 15.7493 60.8054 15.588C60.6074 15.4193 60.3361 15.335 59.9914 15.335C59.6467 15.335 59.3717 15.4157 59.1664 15.577C58.9684 15.7383 58.8694 15.9693 58.8694 16.27V18.03Z'
            fill={color ? color : '#1A1F4C'}
          />
        </svg>
      );
    case 'heart-outline':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M2.25003 8.28028C2.27927 5.42838 4.54489 3 7.45687 3C9.24426 3 10.559 3.88475 11.398 4.71777C11.6316 4.94972 11.8321 5.18108 12 5.39441C12.1679 5.18108 12.3683 4.94972 12.602 4.71777C13.441 3.88475 14.7557 3 16.5431 3C19.4551 3 21.7207 5.42838 21.75 8.28028L21.75 8.28049C21.8054 13.8427 17.3361 17.6908 12.8437 20.7403C12.5949 20.9095 12.3009 21.0001 12 21.0001C11.699 21.0001 11.4051 20.9095 11.1562 20.7403C6.66343 17.6908 2.19407 13.8427 2.25003 8.28042L2.25003 8.28028ZM12.6699 7.08725C12.5425 7.34027 12.2834 7.5 12 7.5C11.7166 7.5 11.4575 7.34029 11.3301 7.08729C11.33 7.08698 11.3296 7.08638 11.3292 7.0855C11.3283 7.08372 11.3268 7.08081 11.3246 7.0768C11.3235 7.07467 11.3222 7.07223 11.3208 7.0695C11.3123 7.0537 11.2983 7.02796 11.2787 6.9937C11.2394 6.92508 11.1781 6.82288 11.0947 6.69831C10.9272 6.44793 10.6755 6.11413 10.3412 5.78223C9.66941 5.11525 8.71261 4.5 7.45687 4.5C5.42265 4.5 3.77142 6.20966 3.74996 8.29551M12.6699 7.08725C12.6701 7.08694 12.6704 7.08635 12.6708 7.0855C12.6722 7.08278 12.675 7.07739 12.6792 7.0695C12.6876 7.0537 12.7017 7.02796 12.7213 6.9937C12.7606 6.92508 12.8219 6.82288 12.9053 6.69831C13.0728 6.44793 13.3245 6.11413 13.6588 5.78223C14.3306 5.11525 15.2874 4.5 16.5431 4.5C18.5773 4.5 20.2285 6.20963 20.25 8.29545C20.2968 12.9826 16.5324 16.4235 12.0007 19.4996L12 19.5001L11.9993 19.4996C7.46709 16.4235 3.70287 12.9827 3.74995 8.29566'
            fill={color ? color : '#4757EA'}
          />
        </svg>
      );
    case 'search':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z'
            stroke={color ? color : '#C8C8C8'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M21.0031 21.0002L16.7031 16.7002'
            stroke={color ? color : '#C8C8C8'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'amenity-animals-allowed':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M14.6667 7.99935C16.1394 7.99935 17.3333 6.80544 17.3333 5.33268C17.3333 3.85992 16.1394 2.66602 14.6667 2.66602C13.1939 2.66602 12 3.85992 12 5.33268C12 6.80544 13.1939 7.99935 14.6667 7.99935Z'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M24.0007 13.3333C25.4734 13.3333 26.6673 12.1394 26.6673 10.6667C26.6673 9.19391 25.4734 8 24.0007 8C22.5279 8 21.334 9.19391 21.334 10.6667C21.334 12.1394 22.5279 13.3333 24.0007 13.3333Z'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M26.6667 23.9993C28.1394 23.9993 29.3333 22.8054 29.3333 21.3327C29.3333 19.8599 28.1394 18.666 26.6667 18.666C25.1939 18.666 24 19.8599 24 21.3327C24 22.8054 25.1939 23.9993 26.6667 23.9993Z'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12.001 13.334C12.8764 13.334 13.7434 13.5064 14.5522 13.8415C15.361 14.1765 16.096 14.6675 16.715 15.2866C17.3341 15.9057 17.8251 16.6406 18.1602 17.4494C18.4952 18.2583 18.6676 19.1252 18.6676 20.0007V24.6673C18.6673 25.7826 18.2675 26.8609 17.5407 27.7068C16.814 28.5528 15.8082 29.1105 14.7058 29.2789C13.6033 29.4474 12.4769 29.2154 11.5307 28.625C10.5845 28.0347 9.88099 27.1249 9.54763 26.0607C8.97874 24.2251 7.77874 23.0229 5.94763 22.454C4.88388 22.1208 3.97452 21.4179 3.38412 20.4723C2.79371 19.5268 2.56125 18.4012 2.72882 17.2992C2.89638 16.1971 3.45289 15.1914 4.29764 14.4641C5.1424 13.7368 6.21959 13.3359 7.3343 13.334H12.001Z'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'amenity-cart-restaurant':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M16 3.99935V2.66602'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M6.66602 13.3326C7.04001 11.1279 8.1824 9.12678 9.89076 7.68381C11.5991 6.24084 13.7631 5.44922 15.9993 5.44922C18.2356 5.44922 20.3996 6.24084 22.1079 7.68381C23.8163 9.12678 24.9587 11.1279 25.3327 13.3326'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M5.33398 13.334H26.6673'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M2.66602 18.666H18.666C19.3733 18.666 20.0515 18.947 20.5516 19.4471C21.0517 19.9472 21.3327 20.6254 21.3327 21.3327C21.3327 22.0399 21.0517 22.7182 20.5516 23.2183C20.0515 23.7184 19.3733 23.9993 18.666 23.9993H15.9993'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M20.5327 23.2003L24.7994 19.467C25.3121 18.9719 26.0005 18.7008 26.7132 18.7133C27.4258 18.7258 28.1043 19.0209 28.5994 19.5336C29.0944 20.0464 29.3655 20.7348 29.353 21.4475C29.3405 22.1601 29.0454 22.8386 28.5327 23.3336L23.7327 27.7336C22.7993 28.8003 21.466 29.3336 19.9993 29.3336H14.666C13.1993 29.3336 11.866 28.8003 10.9327 27.7336L6.66602 24.0003'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M6.66602 18.666V27.9993H2.66602'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'amenity-check-in':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M21.334 13.334H24.0007'
            stroke={color ? color : '#3440CE'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M21.334 18.666H24.0007'
            stroke={color ? color : '#3440CE'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M8.22656 20.0007C8.50142 19.2194 9.01203 18.5427 9.68792 18.064C10.3638 17.5852 11.1716 17.3281 11.9999 17.3281C12.8282 17.3281 13.636 17.5852 14.3119 18.064C14.9878 18.5427 15.4984 19.2194 15.7732 20.0007'
            stroke={color ? color : '#3440CE'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12.0007 17.3333C13.4734 17.3333 14.6673 16.1394 14.6673 14.6667C14.6673 13.1939 13.4734 12 12.0007 12C10.5279 12 9.33398 13.1939 9.33398 14.6667C9.33398 16.1394 10.5279 17.3333 12.0007 17.3333Z'
            stroke={color ? color : '#3440CE'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M26.666 6.66602H5.33268C3.85992 6.66602 2.66602 7.85992 2.66602 9.33268V22.666C2.66602 24.1388 3.85992 25.3327 5.33268 25.3327H26.666C28.1388 25.3327 29.3327 24.1388 29.3327 22.666V9.33268C29.3327 7.85992 28.1388 6.66602 26.666 6.66602Z'
            stroke={color ? color : '#3440CE'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'amenity-family-room':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 33 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M20.5 30H17.5C16.9696 30 16.4609 29.7893 16.0858 29.4142C15.7107 29.0391 15.5 28.5304 15.5 28V23H17.5V28H20.5V23H22.5V19C22.5 18.7348 22.3946 18.4804 22.2071 18.2929C22.0196 18.1054 21.7652 18 21.5 18H12.78L10.78 12H4.5C4.23478 12 3.98043 12.1054 3.79289 12.2929C3.60536 12.4804 3.5 12.7348 3.5 13V19H5.5V28H9.5V21H11.5V28C11.5 28.5304 11.2893 29.0391 10.9142 29.4142C10.5391 29.7893 10.0304 30 9.5 30H5.5C4.96957 30 4.46086 29.7893 4.08579 29.4142C3.71071 29.0391 3.5 28.5304 3.5 28V21C2.96957 21 2.46086 20.7893 2.08579 20.4142C1.71071 20.0391 1.5 19.5304 1.5 19V13C1.50079 12.2046 1.81712 11.442 2.37956 10.8796C2.94199 10.3171 3.70459 10.0008 4.5 10H10.78C11.1996 10 11.6086 10.1321 11.9491 10.3774C12.2895 10.6227 12.5442 10.9689 12.677 11.367L14.22 16H21.5C22.2954 16.0008 23.058 16.3171 23.6204 16.8796C24.1829 17.442 24.4992 18.2046 24.5 19V23C24.5 23.5304 24.2893 24.0391 23.9142 24.4142C23.5391 24.7893 23.0304 25 22.5 25V28C22.5 28.5304 22.2893 29.0391 21.9142 29.4142C21.5391 29.7893 21.0304 30 20.5 30ZM28.5 30H26.5V19H29.5V13C29.5 12.7348 29.3946 12.4804 29.2071 12.2929C29.0196 12.1054 28.7652 12 28.5 12H24.5V10H28.5C29.2954 10.0008 30.058 10.3171 30.6204 10.8796C31.1829 11.442 31.4992 12.2046 31.5 13V19C31.5 19.5304 31.2893 20.0391 30.9142 20.4142C30.5391 20.7893 30.0304 21 29.5 21H28.5V30ZM7.5 9C6.70887 9 5.93552 8.76541 5.27772 8.32588C4.61992 7.88635 4.10723 7.26164 3.80448 6.53074C3.50173 5.79983 3.42252 4.99556 3.57686 4.21964C3.7312 3.44372 4.11216 2.73098 4.67157 2.17157C5.23098 1.61216 5.94371 1.2312 6.71964 1.07686C7.49556 0.92252 8.29983 1.00173 9.03073 1.30448C9.76164 1.60723 10.3864 2.11992 10.8259 2.77772C11.2654 3.43552 11.5 4.20888 11.5 5C11.4987 6.06046 11.0768 7.07711 10.327 7.82697C9.57711 8.57683 8.56046 8.99868 7.5 9ZM7.5 3C7.10444 3 6.71776 3.1173 6.38886 3.33706C6.05996 3.55683 5.80362 3.86918 5.65224 4.23463C5.50087 4.60009 5.46126 5.00222 5.53843 5.39018C5.6156 5.77814 5.80608 6.13451 6.08579 6.41422C6.36549 6.69392 6.72186 6.8844 7.10982 6.96157C7.49778 7.03874 7.89991 6.99914 8.26537 6.84776C8.63082 6.69639 8.94318 6.44004 9.16294 6.11114C9.3827 5.78224 9.5 5.39556 9.5 5C9.5 4.46957 9.28929 3.96086 8.91421 3.58579C8.53914 3.21072 8.03043 3 7.5 3ZM25.5 9C24.7089 9 23.9355 8.76541 23.2777 8.32588C22.6199 7.88635 22.1072 7.26164 21.8045 6.53074C21.5017 5.79983 21.4225 4.99556 21.5769 4.21964C21.7312 3.44372 22.1122 2.73098 22.6716 2.17157C23.231 1.61216 23.9437 1.2312 24.7196 1.07686C25.4956 0.92252 26.2998 1.00173 27.0307 1.30448C27.7616 1.60723 28.3864 2.11992 28.8259 2.77772C29.2654 3.43552 29.5 4.20888 29.5 5C29.4987 6.06046 29.0768 7.07711 28.327 7.82697C27.5771 8.57683 26.5605 8.99868 25.5 9ZM25.5 3C25.1044 3 24.7178 3.1173 24.3889 3.33706C24.06 3.55683 23.8036 3.86918 23.6522 4.23463C23.5009 4.60009 23.4613 5.00222 23.5384 5.39018C23.6156 5.77814 23.8061 6.13451 24.0858 6.41422C24.3655 6.69392 24.7219 6.8844 25.1098 6.96157C25.4978 7.03874 25.8999 6.99914 26.2654 6.84776C26.6308 6.69639 26.9432 6.44004 27.1629 6.11114C27.3827 5.78224 27.5 5.39556 27.5 5C27.5 4.46957 27.2893 3.96086 26.9142 3.58579C26.5391 3.21072 26.0304 3 25.5 3Z'
            fill={color ? color : '#1A1F4C'}
          />
          <path
            d='M19 15C18.3078 15 17.6311 14.7947 17.0555 14.4101C16.4799 14.0256 16.0313 13.4789 15.7664 12.8394C15.5015 12.1999 15.4322 11.4961 15.5673 10.8172C15.7023 10.1383 16.0356 9.51461 16.5251 9.02513C17.0146 8.53564 17.6383 8.2023 18.3172 8.06725C18.9961 7.9322 19.6999 8.00152 20.3394 8.26642C20.9789 8.53133 21.5256 8.97993 21.9101 9.55551C22.2947 10.1311 22.5 10.8078 22.5 11.5C22.4989 12.4279 22.1299 13.3176 21.4737 13.9737C20.8176 14.6299 19.9279 14.9989 19 15ZM19 10C18.7033 10 18.4133 10.088 18.1666 10.2528C17.92 10.4176 17.7277 10.6519 17.6142 10.926C17.5007 11.2001 17.4709 11.5017 17.5288 11.7926C17.5867 12.0836 17.7296 12.3509 17.9393 12.5607C18.1491 12.7704 18.4164 12.9133 18.7074 12.9712C18.9983 13.0291 19.2999 12.9994 19.574 12.8858C19.8481 12.7723 20.0824 12.58 20.2472 12.3334C20.412 12.0867 20.5 11.7967 20.5 11.5C20.5 11.1022 20.342 10.7206 20.0607 10.4393C19.7794 10.158 19.3978 10 19 10Z'
            fill={color ? color : '#1A1F4C'}
          />
        </svg>
      );
    case 'amenity-pool':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 33 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M4.5 20C7.81067 20 10.2933 16 10.2933 16C10.2933 16 12.776 20 16.0867 20C19.3973 20 22.7067 16 22.7067 16C22.7067 16 26.0173 20 28.5 20M4.5 26.6667C7.81067 26.6667 10.2933 22.6667 10.2933 22.6667C10.2933 22.6667 12.776 26.6667 16.0867 26.6667C19.3973 26.6667 22.7067 22.6667 22.7067 22.6667C22.7067 22.6667 26.0173 26.6667 28.5 26.6667M7.16667 14L12.5 10.6667L10.9173 8.688C10.7764 8.5122 10.6722 8.30984 10.611 8.09295C10.5499 7.87607 10.533 7.6491 10.5613 7.42555C10.5897 7.202 10.6628 6.98644 10.7761 6.7917C10.8895 6.59696 11.0409 6.42702 11.2213 6.292C11.5662 6.03288 11.9974 5.91632 12.4259 5.96646C12.8543 6.01659 13.247 6.22959 13.5227 6.56133L19.1667 13.3333M22.5 10.6667C23.3841 10.6667 24.2319 10.3155 24.857 9.69036C25.4821 9.06523 25.8333 8.21739 25.8333 7.33333C25.8333 6.44928 25.4821 5.60143 24.857 4.97631C24.2319 4.35119 23.3841 4 22.5 4C21.6159 4 20.7681 4.35119 20.143 4.97631C19.5179 5.60143 19.1667 6.44928 19.1667 7.33333C19.1667 8.21739 19.5179 9.06523 20.143 9.69036C20.7681 10.3155 21.6159 10.6667 22.5 10.6667Z'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'amenity-spa':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 33 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M16.5 20C18.7091 20 20.5 18.2091 20.5 16C20.5 13.7909 18.7091 12 16.5 12C14.2909 12 12.5 13.7909 12.5 16C12.5 18.2091 14.2909 20 16.5 20Z'
            stroke='black'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M16.5 22C16.5 23.1867 16.1481 24.3467 15.4888 25.3334C14.8295 26.3201 13.8925 27.0892 12.7961 27.5433C11.6997 27.9974 10.4933 28.1162 9.32946 27.8847C8.16557 27.6532 7.09648 27.0818 6.25736 26.2426C5.41825 25.4035 4.8468 24.3344 4.61529 23.1705C4.38378 22.0067 4.5026 20.8003 4.95673 19.7039C5.41085 18.6075 6.17989 17.6705 7.16658 17.0112C8.15328 16.3519 9.31331 16 10.5 16C9.31331 16 8.15328 15.6481 7.16658 14.9888C6.17989 14.3295 5.41085 13.3925 4.95673 12.2961C4.5026 11.1997 4.38378 9.99335 4.61529 8.82946C4.8468 7.66557 5.41825 6.59648 6.25736 5.75736C7.09648 4.91825 8.16557 4.3468 9.32946 4.11529C10.4933 3.88378 11.6997 4.0026 12.7961 4.45673C13.8925 4.91085 14.8295 5.67989 15.4888 6.66658C16.1481 7.65328 16.5 8.81331 16.5 10C16.5 8.81331 16.8519 7.65328 17.5112 6.66658C18.1705 5.67989 19.1075 4.91085 20.2039 4.45673C21.3003 4.0026 22.5067 3.88378 23.6705 4.11529C24.8344 4.3468 25.9035 4.91825 26.7426 5.75736C27.5818 6.59648 28.1532 7.66557 28.3847 8.82946C28.6162 9.99335 28.4974 11.1997 28.0433 12.2961C27.5892 13.3925 26.8201 14.3295 25.8334 14.9888C24.8467 15.6481 23.6867 16 22.5 16C23.6867 16 24.8467 16.3519 25.8334 17.0112C26.8201 17.6705 27.5892 18.6075 28.0433 19.7039C28.4974 20.8003 28.6162 22.0067 28.3847 23.1705C28.1532 24.3344 27.5818 25.4035 26.7426 26.2426C25.9035 27.0818 24.8344 27.6532 23.6705 27.8847C22.5067 28.1162 21.3003 27.9974 20.2039 27.5433C19.1075 27.0892 18.1705 26.3201 17.5112 25.3334C16.8519 24.3467 16.5 23.1867 16.5 22Z'
            stroke='black'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M16.5 10V12'
            stroke='black'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10.5 16H12.5'
            stroke='black'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M22.5 16H20.5'
            stroke='black'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M16.5 22V20'
            stroke='black'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M11.166 10.666L13.6727 13.1727'
            stroke='black'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M19.3262 13.1727L21.8328 10.666'
            stroke='black'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M11.166 21.3328L13.6727 18.8262'
            stroke='black'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M19.3262 18.8262L21.8328 21.3328'
            stroke='black'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'amenity-wifi':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M16 26.666H16.0133'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M2.66602 11.7608C6.33283 8.48115 11.0798 6.66797 15.9993 6.66797C20.9189 6.66797 25.6659 8.48115 29.3327 11.7608'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M6.66602 17.1454C9.1584 14.7024 12.5093 13.334 15.9993 13.334C19.4894 13.334 22.8403 14.7024 25.3327 17.1454'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M11.334 21.9057C12.5802 20.6842 14.2556 20 16.0007 20C17.7457 20 19.4211 20.6842 20.6673 21.9057'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'our_advantage_1':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 144 130'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g opacity='0.8'>
            <path
              d='M1.48004 51.7097C1.02994 51.7097 0.625696 51.4043 0.523639 50.9534C0.405881 50.4315 0.739539 49.9148 1.26945 49.7988L4.78394 49.0304C5.76408 48.8161 6.43377 47.9087 6.3497 46.909L6.05433 43.3962C6.01377 42.9155 6.34082 42.4774 6.8197 42.3731L10.335 41.6046C11.3154 41.3903 11.9852 40.4827 11.9008 39.4827L11.6047 35.9704C11.5641 35.4885 11.8899 35.0517 12.3688 34.946L15.8896 34.1743C16.8693 33.9596 17.5384 33.0526 17.4544 32.0532L17.1589 28.5382C17.1183 28.0575 17.4441 27.6207 17.923 27.5151L21.4438 26.7434C22.4235 26.5287 23.0927 25.6216 23.0086 24.6223L22.7132 21.1072C22.6726 20.6266 22.9984 20.1898 23.4773 20.0842L26.9986 19.3124C27.978 19.0977 28.6471 18.191 28.5634 17.1918L28.2687 13.6738C28.2281 13.1931 28.5539 12.7563 29.0315 12.6507L32.5622 11.8735C33.5404 11.6581 34.2085 10.7525 34.1254 9.75432L33.8321 6.23123C33.7876 5.69907 34.1894 5.23262 34.7297 5.18881C35.2858 5.13856 35.7437 5.54058 35.7869 6.07274L36.2959 12.1778C36.3364 12.6584 36.0106 13.0952 35.533 13.2009L32.0045 13.9778C31.026 14.1932 30.3579 15.0995 30.4415 16.098L30.7364 19.6177C30.777 20.0983 30.4498 20.5351 29.9722 20.6408L26.4515 21.4125C25.4718 21.6272 24.8027 22.5342 24.8867 23.5336L25.1822 27.0486C25.2227 27.5293 24.8969 27.9661 24.418 28.0717L20.8972 28.8434C19.9176 29.0581 19.2484 29.9651 19.3324 30.9645L19.6279 34.4796C19.6684 34.9602 19.3426 35.397 18.8638 35.5027L15.3434 36.2742C14.3636 36.489 13.6944 37.3963 13.7787 38.3959L14.075 41.9092C14.1155 42.3911 13.7884 42.8279 13.3095 42.9336L9.79382 43.7021C8.81364 43.9164 8.14391 44.8237 8.22796 45.8235L8.52327 49.3363C8.56383 49.8169 8.23675 50.2537 7.75917 50.3593L1.69462 51.6852C1.62135 51.702 1.54939 51.7097 1.48004 51.7097Z'
              fill='#4757EA'
            />
            <path
              d='M112.653 121.481C113.632 121.266 114.3 120.359 114.216 119.361L113.997 116.747C113.913 115.748 114.582 114.841 115.562 114.626L118.206 114.047C119.186 113.832 119.855 112.925 119.771 111.925L119.551 109.318C119.467 108.319 120.136 107.411 121.116 107.196L123.76 106.617C124.74 106.402 125.409 105.495 125.325 104.495L125.105 101.887C125.021 100.888 125.69 99.9803 126.67 99.7655L129.314 99.1861C130.294 98.9714 130.963 98.064 130.879 97.0644L130.66 94.4585C130.575 93.4585 131.245 92.5509 132.225 92.3366L134.865 91.7596C135.845 91.5453 136.515 90.6377 136.431 89.6378L136.211 87.0298C136.127 86.0315 136.796 85.1255 137.774 84.9117C139.459 84.5437 139.916 82.357 138.52 81.3449L118.383 66.7473C114.245 63.7463 108.418 64.6186 105.372 68.6942L83.078 98.521C80.0307 102.597 80.9165 108.334 85.0563 111.334L105.272 125.989C106.657 126.993 108.58 125.895 108.437 124.19C108.354 123.192 109.022 122.28 110 122.065L112.653 121.481Z'
              fill='#4757EA'
            />
            <path
              d='M108.803 129.513C108.598 129.513 108.392 129.45 108.222 129.325L84.477 112.111C82.2645 110.507 80.8173 108.15 80.4039 105.475C79.9917 102.8 80.6603 100.127 82.2906 97.9477L104.584 68.1222C106.214 65.9433 108.607 64.5182 111.323 64.1111C114.041 63.7052 116.753 64.3636 118.967 65.9691L142.712 83.1825C143.022 83.4067 143.172 83.7894 143.09 84.1605C143.011 84.5303 142.719 84.8228 142.343 84.904L138.829 85.6724C137.849 85.8867 137.179 86.7941 137.263 87.7938L137.558 91.3067C137.599 91.7873 137.272 92.2254 136.793 92.3297L133.278 93.0982C132.297 93.3125 131.628 94.2201 131.712 95.2201L132.008 98.7311C132.049 99.213 131.723 99.6499 131.244 99.7555L127.723 100.527C126.743 100.742 126.074 101.649 126.158 102.648L126.454 106.165C126.494 106.645 126.169 107.082 125.69 107.188L122.169 107.959C121.189 108.174 120.52 109.081 120.605 110.081L120.901 113.594C120.941 114.076 120.616 114.513 120.137 114.619L116.615 115.39C115.635 115.604 114.966 116.511 115.049 117.51L115.344 121.029C115.385 121.51 115.059 121.946 114.58 122.052L111.051 122.828C110.073 123.043 109.404 123.949 109.488 124.948L109.782 128.472C109.813 128.849 109.618 129.21 109.282 129.395C109.133 129.471 108.968 129.513 108.803 129.513ZM112.885 65.9253C112.465 65.9253 112.04 65.9549 111.618 66.0194C109.418 66.3479 107.482 67.4999 106.164 69.2652L83.8699 99.0906C82.5511 100.855 82.008 103.018 82.343 105.181C82.6766 107.347 83.8464 109.255 85.6389 110.553L104.406 124.158C105.678 125.08 107.446 124.083 107.316 122.517C107.275 122.037 107.601 121.6 108.08 121.494L111.608 120.718C112.586 120.503 113.255 119.597 113.171 118.598L112.876 115.077C112.836 114.597 113.163 114.16 113.64 114.054L117.16 113.284C118.14 113.069 118.81 112.162 118.726 111.162L118.429 107.649C118.389 107.167 118.714 106.73 119.193 106.625L122.714 105.853C123.694 105.638 124.363 104.731 124.279 103.732L123.984 100.216C123.943 99.7349 124.269 99.2981 124.748 99.1924L128.268 98.4209C129.248 98.2061 129.917 97.2987 129.833 96.2991L129.536 92.7872C129.496 92.3053 129.823 91.8685 130.302 91.7628L133.818 90.9943C134.798 90.78 135.468 89.8727 135.384 88.8729L135.088 85.3588C135.048 84.8782 135.375 84.4401 135.854 84.3357C137.384 84.0011 137.799 82.0148 136.531 81.0955L117.803 67.5179C116.358 66.4755 114.648 65.9253 112.885 65.9253Z'
              fill='#4757EA'
            />
            <path
              d='M72.9733 92.8222C72.7718 92.8222 72.5677 92.7603 72.3936 92.634L20.7083 55.1663C20.2713 54.8506 20.1784 54.245 20.5003 53.8159C20.8208 53.3856 21.4345 53.2954 21.8715 53.6111L73.5569 91.0788C73.9939 91.3945 74.0868 92.0001 73.7649 92.4292C73.5726 92.6856 73.2755 92.8222 72.9733 92.8222Z'
              fill='#4757EA'
            />
            <path
              d='M76.8777 87.6018C76.6762 87.6018 76.4721 87.5399 76.2981 87.4136L55.939 72.6562C55.502 72.3392 55.4092 71.7336 55.7297 71.3045C56.0503 70.8741 56.6665 70.7839 57.1022 71.0983L77.4613 85.8558C77.8983 86.1728 77.9912 86.7784 77.6706 87.2075C77.477 87.4665 77.1787 87.6018 76.8777 87.6018Z'
              fill='#4757EA'
            />
            <path
              d='M47.4756 16.5346C47.77 15.9509 48.0854 15.3801 48.419 14.8208L35.391 5.37725C34.9553 5.06027 34.3404 5.15175 34.0198 5.58212C33.6979 6.0112 33.7908 6.6168 34.2278 6.93249L47.4756 16.5346Z'
              fill='#4757EA'
            />
            <path
              d='M108.056 61.734C107.643 59.059 106.196 56.7023 103.984 55.0981L94.0345 47.8862C93.5896 48.3681 93.1226 48.8281 92.6437 49.2778L102.821 56.6546C104.611 57.9522 105.782 59.8579 106.115 62.0239C106.45 64.1886 105.907 66.3521 104.59 68.1174L82.2941 97.9428C79.5752 101.583 74.3559 102.369 70.6544 99.6849L2.06288 49.962C1.62717 49.6476 1.01094 49.7378 0.691684 50.1682C0.369812 50.5973 0.462705 51.2029 0.899719 51.5186L69.4911 101.243C71.3229 102.57 73.4583 103.21 75.5753 103.21C78.7378 103.21 81.861 101.783 83.8733 99.0883L106.169 69.2628C107.799 67.0827 108.468 64.409 108.056 61.734Z'
              fill='#4757EA'
            />
            <path
              d='M72.976 58.0184C56.7346 58.0184 43.5195 45.0043 43.5195 29.0086C43.5195 13.0141 56.7346 0 72.976 0C89.2188 0 102.434 13.0141 102.434 29.0086C102.434 45.0043 89.2188 58.0184 72.976 58.0184ZM72.976 1.93408C57.8154 1.93408 45.4822 14.0797 45.4822 29.0098C45.4822 43.94 57.8154 56.0869 72.976 56.0869C88.1367 56.0869 100.471 43.94 100.471 29.0098C100.471 14.0797 88.1367 1.93408 72.976 1.93408Z'
              fill='#4757EA'
            />
            <path
              d='M72.0242 12.48C72.3263 11.5644 73.6215 11.5645 73.9235 12.4801L77.1896 22.3812C77.3248 22.7911 77.7077 23.0679 78.1393 23.0679H88.6782C89.6506 23.0679 90.0509 24.3153 89.2601 24.8812L80.7607 30.9625C80.4049 31.2171 80.2559 31.6735 80.393 32.089L83.6448 41.9463C83.9479 42.865 82.8999 43.6358 82.1132 43.0728L73.5559 36.9494C73.2079 36.7004 72.7401 36.7004 72.3921 36.9494L63.8334 43.0731C63.0467 43.636 61.9988 42.8652 62.3018 41.9466L65.5538 32.089C65.6909 31.6735 65.5419 31.2171 65.186 30.9625L56.6866 24.8812C55.8958 24.3154 56.2961 23.0679 57.2685 23.0679H67.8075C68.2391 23.0679 68.622 22.7911 68.7572 22.3813L72.0242 12.48Z'
              fill='#A3C0FE'
            />
            <path
              d='M72.9735 53.6167C72.4318 53.6167 71.9922 53.1838 71.9922 52.6504V43.5894C71.9922 43.056 72.4318 42.623 72.9735 42.623C73.5152 42.623 73.9548 43.056 73.9548 43.5894V52.6504C73.9548 53.1838 73.5152 53.6167 72.9735 53.6167Z'
              fill='#4757EA'
            />
            <path
              d='M95.7979 37.2911C95.6972 37.2911 95.5964 37.2756 95.4956 37.2434L86.7449 34.4435C86.2281 34.2785 85.9481 33.7335 86.1143 33.2271C86.2817 32.7181 86.8352 32.4424 87.3494 32.6073L96.1001 35.4073C96.6156 35.5722 96.897 36.1173 96.7295 36.6237C96.596 37.0321 96.2114 37.2911 95.7979 37.2911Z'
              fill='#4757EA'
            />
            <path
              d='M81.6711 18.2039C81.4722 18.2039 81.2694 18.1434 81.0967 18.0184C80.6571 17.7053 80.5602 17.1009 80.8795 16.6693L86.2872 9.34016C86.6051 8.9085 87.2188 8.81186 87.6571 9.12626C88.0967 9.43937 88.1936 10.0437 87.8743 10.4753L82.4666 17.8058C82.2743 18.0648 81.9746 18.2039 81.6711 18.2039Z'
              fill='#4757EA'
            />
            <path
              d='M64.2806 18.2058C63.9771 18.2058 63.6775 18.0679 63.4864 17.8063L58.0787 10.4759C57.7595 10.0443 57.8562 9.43993 58.2959 9.12682C58.7342 8.81113 59.3478 8.90906 59.6658 9.34072L65.0735 16.6698C65.3927 17.1015 65.296 17.7058 64.8563 18.0189C64.681 18.1452 64.4795 18.2058 64.2806 18.2058Z'
              fill='#4757EA'
            />
            <path
              d='M50.157 37.2892C49.7435 37.2892 49.3589 37.0302 49.2241 36.6205C49.0567 36.1128 49.338 35.5691 49.8548 35.4041L58.6042 32.6042C59.1184 32.4341 59.6732 32.7175 59.8393 33.2239C60.0068 33.7316 59.7255 34.2754 59.21 34.4403L50.4606 37.2403C50.3599 37.2738 50.2564 37.2892 50.157 37.2892Z'
              fill='#4757EA'
            />
          </g>
        </svg>
      );
    case 'our_advantage_2':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 122 140'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g opacity='0.8'>
            <path
              d='M92.5536 139.082H29.4464C18.9984 139.082 9.64193 133.679 4.41797 124.632C-0.805989 115.585 -0.805989 104.779 4.41797 95.7306L45.0638 25.333C45.2721 24.9723 45.6562 24.75 46.0729 24.75H75.9287C76.3454 24.75 76.7309 24.9723 76.9377 25.333L117.582 95.7306C122.806 104.779 122.806 115.583 117.582 124.632C112.36 133.679 103.003 139.082 92.5536 139.082ZM46.746 27.0821L6.43761 96.8966C1.63498 105.216 1.63655 115.146 6.43917 123.466C11.2418 131.784 19.8426 136.75 29.4479 136.75H92.5552C102.16 136.75 110.761 131.784 115.564 123.466C120.367 115.146 120.367 105.216 115.564 96.8966L75.2555 27.0821H46.746Z'
              fill='#4757EA'
            />
            <path
              d='M92.5533 132.819H70.0841C69.4404 132.819 68.918 132.297 68.918 131.653C68.918 131.01 69.4404 130.487 70.0841 130.487H92.5533C99.4284 130.487 105.584 126.933 109.021 120.98C112.459 115.027 112.459 107.92 109.021 101.965C108.699 101.409 108.891 100.695 109.447 100.373C110.004 100.053 110.717 100.243 111.039 100.799C114.898 107.485 114.898 115.465 111.039 122.146C107.182 128.83 100.271 132.819 92.5533 132.819Z'
              fill='#4757EA'
            />
            <path
              d='M75.9254 28.374H46.0696C45.6482 28.374 45.2595 28.1455 45.0527 27.7801L34.4789 8.99404C34.2768 8.63334 34.2799 8.19027 34.4882 7.83267C34.6966 7.47664 35.0806 7.25586 35.4941 7.25586H86.4962C86.9113 7.25586 87.2937 7.47664 87.5021 7.83267C87.7104 8.19027 87.715 8.63334 87.5114 8.99404L76.9391 27.7801C76.7338 28.1455 76.3468 28.374 75.9254 28.374ZM46.7521 26.0419H75.2444L84.5045 9.58798H37.4904L46.7521 26.0419Z'
              fill='#4757EA'
            />
            <path
              d='M53.7129 27.2076H68.3011L73.4675 1.16406H48.5464L53.7129 27.2076Z'
              fill='#4757EA'
            />
            <path
              d='M68.3012 28.3742H53.7115C53.1549 28.3742 52.676 27.9809 52.5672 27.4352L47.4007 1.39153C47.3338 1.04949 47.4225 0.695 47.6433 0.426028C47.8656 0.155502 48.1952 0 48.545 0H73.4676C73.8174 0 74.1471 0.157057 74.3694 0.426028C74.5917 0.695 74.6804 1.04949 74.6119 1.39153L69.4455 27.4352C69.3367 27.9809 68.8578 28.3742 68.3012 28.3742ZM54.6692 26.0421H67.3435L72.0466 2.33061H49.9645L54.6692 26.0421Z'
              fill='#4757EA'
            />
            <path
              d='M60.0382 61.719C60.3376 60.7977 61.641 60.7977 61.9403 61.719L66.4426 75.5733C66.5765 75.9853 66.9604 76.2643 67.3936 76.2643H81.9607C82.9294 76.2643 83.3322 77.5038 82.5485 78.0733L70.7639 86.6365C70.4135 86.8911 70.2668 87.3425 70.4007 87.7545L74.9017 101.609C75.201 102.53 74.1465 103.296 73.3628 102.727L61.577 94.1636C61.2265 93.9089 60.7519 93.909 60.4014 94.1636L48.6172 102.727C47.8336 103.296 46.779 102.53 47.0783 101.609L51.5793 87.7545C51.7131 87.3425 51.5665 86.8911 51.216 86.6365L39.4314 78.0733C38.6477 77.5038 39.0505 76.2643 40.0192 76.2643H54.5862C55.0195 76.2643 55.4034 75.9853 55.5373 75.5733L60.0382 61.719Z'
              fill='#A3C0FE'
            />
            <path
              d='M60.9996 115.812C60.3559 115.812 59.8335 115.29 59.8335 114.646V102.889C59.8335 102.246 60.3559 101.723 60.9996 101.723C61.6432 101.723 62.1656 102.246 62.1656 102.889V114.646C62.1656 115.29 61.6432 115.812 60.9996 115.812Z'
              fill='#4757EA'
            />
            <path
              d='M90.1504 94.6309C90.0307 94.6309 89.9094 94.6123 89.7897 94.5734L78.6095 90.94C77.9969 90.741 77.6627 90.0833 77.8617 89.4723C78.0607 88.8582 78.7184 88.5208 79.3309 88.7244L90.5111 92.3579C91.1237 92.5569 91.458 93.2146 91.259 93.8256C91.1004 94.3184 90.6433 94.6309 90.1504 94.6309Z'
              fill='#4757EA'
            />
            <path
              d='M72.0971 69.8646C71.8593 69.8646 71.6198 69.7915 71.413 69.6407C70.8922 69.2629 70.7772 68.5337 71.155 68.0129L78.0643 58.5041C78.4436 57.9817 79.1713 57.8666 79.6937 58.2459C80.2146 58.6238 80.3295 59.3529 79.9517 59.8738L73.0425 69.3826C72.8139 69.6982 72.4578 69.8646 72.0971 69.8646Z'
              fill='#4757EA'
            />
            <path
              d='M49.8889 69.8642C49.5282 69.8642 49.1737 69.6963 48.9452 69.3822L42.0359 59.8734C41.6581 59.3526 41.7731 58.6234 42.2939 58.2456C42.8163 57.8693 43.544 57.9813 43.9233 58.5037L50.8326 68.0125C51.2104 68.5334 51.0954 69.2625 50.5746 69.6404C50.3662 69.7927 50.1268 69.8642 49.8889 69.8642Z'
              fill='#4757EA'
            />
            <path
              d='M31.8369 94.628C31.3456 94.628 30.8885 94.3155 30.7284 93.8211C30.5294 93.2101 30.8637 92.5524 31.4778 92.3534L42.658 88.72C43.2721 88.5148 43.9282 88.8552 44.1272 89.4678C44.3262 90.0804 43.992 90.7365 43.3778 90.9355L32.1976 94.569C32.0779 94.6094 31.9566 94.628 31.8369 94.628Z'
              fill='#4757EA'
            />
            <path
              d='M60.767 132.82H50.3658C49.7221 132.82 49.1997 132.298 49.1997 131.654C49.1997 131.011 49.7221 130.488 50.3658 130.488H60.767C61.4107 130.488 61.9331 131.011 61.9331 131.654C61.9331 132.298 61.4107 132.82 60.767 132.82Z'
              fill='#4757EA'
            />
          </g>
        </svg>
      );
    case 'our_advantage_3':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 161 111'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g opacity='0.8'>
            <path
              d='M80.687 110.913C80.0485 110.913 79.5303 110.395 79.5303 109.757V52.8516C79.5303 52.213 80.0485 51.6948 80.687 51.6948C81.3255 51.6948 81.8437 52.213 81.8437 52.8516V109.757C81.8437 110.395 81.3255 110.913 80.687 110.913Z'
              fill='#4757EA'
            />
            <path
              d='M66.0903 110.913C65.4518 110.913 64.9336 110.395 64.9336 109.756V68.2681C64.9336 67.6295 65.4518 67.1113 66.0903 67.1113C66.7288 67.1113 67.2471 67.6295 67.2471 68.2681V109.756C67.2471 110.395 66.7288 110.913 66.0903 110.913Z'
              fill='#4757EA'
            />
            <path
              d='M65.8018 54.0112H109.023C109.662 54.0112 110.18 53.493 110.18 52.8545C110.18 52.216 109.662 51.6978 109.023 51.6978H66.2259C66.1071 52.4782 65.9745 53.2509 65.8018 54.0112Z'
              fill='#4757EA'
            />
            <path
              d='M124.935 64.0903C124.296 64.0903 123.778 64.6085 123.778 65.2471V108.601H23.0068V77.2725C22.2218 76.9856 21.4491 76.6771 20.6934 76.3332V109.76C20.6934 110.398 21.2116 110.916 21.8501 110.916H124.935C125.574 110.916 126.092 110.398 126.092 109.76V65.2486C126.092 64.6085 125.574 64.0903 124.935 64.0903Z'
              fill='#4757EA'
            />
            <path
              d='M34.1439 80.4319C15.593 80.4319 0.5 65.3404 0.5 46.7895C0.5 28.2385 15.593 13.1455 34.1439 13.1455C52.6949 13.1455 67.7879 28.2385 67.7879 46.7895C67.7894 65.3404 52.6964 80.4319 34.1439 80.4319ZM34.1439 15.4574C16.8685 15.4574 2.81347 29.5125 2.81347 46.7879C2.81347 64.0633 16.8685 78.1169 34.1439 78.1169C51.4194 78.1169 65.4744 64.0633 65.4744 46.7879C65.476 29.5125 51.4209 15.4574 34.1439 15.4574Z'
              fill='#4757EA'
            />
            <path
              d='M8.16987 52.1906C7.6131 52.1906 7.12108 51.7865 7.03008 51.2189C6.79411 49.7645 6.67383 48.2731 6.67383 46.7894C6.67383 39.4511 9.53174 32.5539 14.7201 27.3656C19.9069 22.1772 26.8056 19.3193 34.1439 19.3193C34.7824 19.3193 35.3007 19.8376 35.3007 20.4761C35.3007 21.1146 34.7824 21.6328 34.1439 21.6328C27.4241 21.6328 21.1068 24.2486 16.3565 29.0004C11.6046 33.7507 8.98885 40.068 8.98885 46.7879C8.98885 48.1482 9.09835 49.5147 9.31427 50.8472C9.41606 51.4781 8.98885 52.0718 8.35805 52.1736C8.29481 52.186 8.23156 52.1906 8.16987 52.1906Z'
              fill='#4757EA'
            />
            <path
              d='M15.535 66.5505C15.2389 66.5505 14.9428 66.4379 14.7176 66.2112C12.9239 64.419 11.3877 62.3878 10.1523 60.1792C9.83924 59.6224 10.0398 58.9176 10.5966 58.6045C11.1549 58.2914 11.8582 58.4919 12.1712 59.0487C13.3033 61.0737 14.7114 62.9322 16.354 64.5748C16.8059 65.0267 16.8059 65.7577 16.354 66.2096C16.1273 66.4379 15.8311 66.5505 15.535 66.5505Z'
              fill='#4757EA'
            />
            <path
              d='M33.191 29.805C33.4903 28.8837 34.7937 28.8837 35.0931 29.805L38.4612 40.1711C38.595 40.5831 38.979 40.8621 39.4122 40.8621H50.3108C51.2795 40.8621 51.6823 42.1017 50.8985 42.6711L42.082 49.0766C41.7315 49.3312 41.5848 49.7826 41.7187 50.1946L45.0868 60.5606C45.3861 61.482 44.3317 62.2481 43.5479 61.6787L34.7298 55.2717C34.3793 55.0171 33.9047 55.0171 33.5542 55.2718L24.7378 61.6783C23.9541 62.2478 22.8995 61.4817 23.1989 60.5603L26.5668 50.1947C26.7007 49.7826 26.554 49.3312 26.2035 49.0766L17.3858 42.6711C16.6021 42.1017 17.0048 40.8621 17.9736 40.8621H28.8718C29.3051 40.8621 29.689 40.5831 29.8229 40.1711L33.191 29.805Z'
              fill='#A3C0FE'
            />
            <path
              d='M112.39 36.0048C102.521 36.0048 82.9244 32.1968 78.2173 22.7132C76.2663 18.7803 77.0991 14.4464 80.6958 9.82869C84.2909 5.21101 88.2885 3.34482 92.5793 4.26867C103.087 6.54203 111.681 25.1299 113.948 34.5766C114.03 34.919 113.953 35.2799 113.735 35.5575C113.519 35.8351 113.188 35.9986 112.836 36.0032C112.689 36.0032 112.54 36.0048 112.39 36.0048ZM90.5249 6.35849C87.7379 6.35849 85.0528 7.99797 82.5203 11.2507C79.5174 15.1065 78.7663 18.6168 80.2886 21.686C84.1567 29.4824 101.474 33.4044 111.32 33.6759C108.642 24.1968 100.596 8.36966 92.0904 6.52815C91.5644 6.41556 91.0431 6.35849 90.5249 6.35849Z'
              fill='#4757EA'
            />
            <path
              d='M157.874 71.0811C157.641 69.2072 156.691 67.5353 155.203 66.3755L144.755 58.2413C144.251 57.8496 143.526 57.9391 143.131 58.4434L143.04 58.3724C142.984 58.4449 142.944 58.5143 142.887 58.5884C129.664 75.5707 115.141 47.7829 111.817 34.843C98.242 34.6378 68.5341 27.3412 81.6144 10.5423C81.8612 10.2246 82.111 9.9547 82.3578 9.66783C82.3439 9.65703 82.3378 9.64007 82.3239 9.62927L71.8763 1.49512C70.388 0.335307 68.5371 -0.182909 66.6586 0.0576919C64.7847 0.290581 63.1144 1.24065 61.953 2.72898L55.426 11.1114C55.0342 11.6158 55.1237 12.3422 55.628 12.7355L148.282 84.8848C148.486 85.0436 148.737 85.1284 148.993 85.1284C149.041 85.1284 149.089 85.1254 149.137 85.1192C149.441 85.0822 149.718 84.9249 149.906 84.6827L156.435 76.2987C157.596 74.8073 158.107 72.955 157.874 71.0811Z'
              fill='#4757EA'
            />
            <path
              d='M135.181 65.6542C134.485 65.6542 133.782 65.5771 133.069 65.4244C122.562 63.151 113.968 44.5631 111.701 35.1164C111.619 34.774 111.697 34.4131 111.913 34.1355C112.129 33.8579 112.459 33.6944 112.813 33.6898C122.543 33.5587 142.653 37.3497 147.433 46.9783C149.384 50.9112 148.549 55.2451 144.954 59.8628C141.955 63.714 138.676 65.6542 135.181 65.6542ZM114.329 36.0156C117.006 45.4946 125.052 61.3218 133.558 63.1633C136.908 63.8852 140.124 62.2981 143.128 58.4408C146.131 54.585 146.882 51.0747 145.36 48.0055C141.492 40.2107 124.175 36.2886 114.329 36.0156Z'
              fill='#4757EA'
            />
            <path
              d='M150.146 45.5016C149.538 45.5016 149.028 45.0266 148.992 44.4128C148.955 43.7758 149.44 43.2268 150.078 43.1897C154.219 42.9445 157.788 39.2229 158.38 34.5297C159.158 28.3697 154.915 23.1829 147.032 20.6535C134.99 16.7962 124.539 24.2378 118.706 29.9166C124.818 27.0695 134.556 24.6126 145.334 29.8611C145.909 30.1402 146.147 30.8327 145.868 31.4065C145.587 31.9802 144.895 32.2193 144.322 31.9401C127.699 23.8461 114.147 35.2345 113.578 35.7219C113.137 36.1013 112.481 36.0936 112.046 35.7018C111.615 35.3101 111.541 34.6577 111.875 34.1811C112.031 33.9606 127.685 12.0181 147.737 18.4526C158.37 21.8611 161.391 29.1439 160.675 34.8212C159.934 40.6943 155.535 45.1855 150.214 45.5016C150.192 45.5016 150.169 45.5016 150.146 45.5016Z'
              fill='#4757EA'
            />
          </g>
        </svg>
      );
    case 'paw':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 33 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M14.6667 7.99935C16.1394 7.99935 17.3333 6.80544 17.3333 5.33268C17.3333 3.85992 16.1394 2.66602 14.6667 2.66602C13.1939 2.66602 12 3.85992 12 5.33268C12 6.80544 13.1939 7.99935 14.6667 7.99935Z'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M24.0007 13.3333C25.4734 13.3333 26.6673 12.1394 26.6673 10.6667C26.6673 9.19391 25.4734 8 24.0007 8C22.5279 8 21.334 9.19391 21.334 10.6667C21.334 12.1394 22.5279 13.3333 24.0007 13.3333Z'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M26.6667 23.9993C28.1394 23.9993 29.3333 22.8054 29.3333 21.3327C29.3333 19.8599 28.1394 18.666 26.6667 18.666C25.1939 18.666 24 19.8599 24 21.3327C24 22.8054 25.1939 23.9993 26.6667 23.9993Z'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12.001 13.334C12.8764 13.334 13.7434 13.5064 14.5522 13.8415C15.361 14.1765 16.096 14.6675 16.715 15.2866C17.3341 15.9057 17.8251 16.6406 18.1602 17.4494C18.4952 18.2583 18.6676 19.1252 18.6676 20.0007V24.6673C18.6673 25.7826 18.2675 26.8609 17.5407 27.7068C16.814 28.5528 15.8082 29.1105 14.7058 29.2789C13.6033 29.4474 12.4769 29.2154 11.5307 28.625C10.5845 28.0347 9.88099 27.1249 9.54763 26.0607C8.97874 24.2251 7.77874 23.0229 5.94763 22.454C4.88388 22.1208 3.97452 21.4179 3.38412 20.4723C2.79371 19.5268 2.56125 18.4012 2.72882 17.2992C2.89638 16.1971 3.45289 15.1914 4.29764 14.4641C5.1424 13.7368 6.21959 13.3359 7.3343 13.334H12.001Z'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'face':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9 12H9.01'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M15 12H15.01'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10 16C10.5 16.3 11.2 16.5 12 16.5C12.8 16.5 13.5 16.3 14 16'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M19.0005 6.3C19.9065 7.43567 20.524 8.77378 20.8005 10.2C21.1386 10.3638 21.4238 10.6195 21.6233 10.9378C21.8229 11.2562 21.9287 11.6243 21.9287 12C21.9287 12.3757 21.8229 12.7438 21.6233 13.0622C21.4238 13.3805 21.1386 13.6362 20.8005 13.8C20.3688 15.8135 19.2597 17.618 17.6582 18.9125C16.0567 20.207 14.0597 20.9132 12.0005 20.9132C9.94124 20.9132 7.94428 20.207 6.3428 18.9125C4.74132 17.618 3.63219 15.8135 3.20049 13.8C2.86234 13.6362 2.57717 13.3805 2.37763 13.0622C2.1781 12.7438 2.07227 12.3757 2.07227 12C2.07227 11.6243 2.1781 11.2562 2.37763 10.9378C2.57717 10.6195 2.86234 10.3638 3.20049 10.2C3.61475 8.1705 4.71638 6.34602 6.31951 5.03437C7.92264 3.72271 9.92915 3.00418 12.0005 3C14.0005 3 15.5005 4.1 15.5005 5.5C15.5005 6.9 14.6005 8 13.5005 8C12.7005 8 12.0005 7.6 12.0005 7'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'check-mark':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 16 11'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M14.334 1L5.39648 10L1.33398 5.90909'
            stroke={color ? color : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'ruler':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M28.3938 20.393C28.692 20.6901 28.9286 21.0433 29.0901 21.4321C29.2515 21.8209 29.3346 22.2378 29.3346 22.6588C29.3346 23.0798 29.2515 23.4966 29.0901 23.8854C28.9286 24.2743 28.692 24.6274 28.3938 24.9246L24.9285 28.3899C24.6313 28.6881 24.2782 28.9247 23.8893 29.0862C23.5005 29.2476 23.0837 29.3307 22.6627 29.3307C22.2417 29.3307 21.8248 29.2476 21.436 29.0862C21.0472 28.9247 20.694 28.6881 20.3969 28.3899L3.60328 11.5963C3.00426 10.9944 2.66797 10.1797 2.66797 9.33052C2.66797 8.48131 3.00426 7.66665 3.60328 7.06472L7.06863 3.59938C7.67056 3.00035 8.48522 2.66406 9.33443 2.66406C10.1836 2.66406 10.9983 3.00035 11.6002 3.59938L28.3938 20.393Z'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M19.332 16.6667L21.9987 14'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M15.332 12.6667L17.9987 10'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M11.332 8.66667L13.9987 6'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M23.332 20.6667L25.9987 18'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'parentsChld':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 88 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M18.668 9.33398H13.3346C11.868 9.33398 10.668 10.534 10.668 12.0007V18.6673C10.668 19.4007 11.268 20.0007 12.0013 20.0007H13.3346V28.0007C13.3346 28.734 13.9346 29.334 14.668 29.334H17.3346C18.068 29.334 18.668 28.734 18.668 28.0007V20.0007H20.0013C20.7346 20.0007 21.3346 19.4007 21.3346 18.6673V12.0007C21.3346 10.534 20.1346 9.33398 18.668 9.33398Z'
            fill={color ? color : '#1A1F4C'}
          />
          <path
            d='M15.9987 7.99935C17.4715 7.99935 18.6654 6.80544 18.6654 5.33268C18.6654 3.85992 17.4715 2.66602 15.9987 2.66602C14.5259 2.66602 13.332 3.85992 13.332 5.33268C13.332 6.80544 14.5259 7.99935 15.9987 7.99935Z'
            fill={color ? color : '#1A1F4C'}
          />
          <path
            d='M34.668 9.33398H29.3346C27.868 9.33398 26.668 10.534 26.668 12.0007V18.6673C26.668 19.4007 27.268 20.0007 28.0013 20.0007H29.3346V28.0007C29.3346 28.734 29.9346 29.334 30.668 29.334H33.3346C34.068 29.334 34.668 28.734 34.668 28.0007V20.0007H36.0013C36.7346 20.0007 37.3346 19.4007 37.3346 18.6673V12.0007C37.3346 10.534 36.1346 9.33398 34.668 9.33398Z'
            fill={color ? color : '#1A1F4C'}
          />
          <path
            d='M31.9987 7.99935C33.4715 7.99935 34.6654 6.80544 34.6654 5.33268C34.6654 3.85992 33.4715 2.66602 31.9987 2.66602C30.5259 2.66602 29.332 3.85992 29.332 5.33268C29.332 6.80544 30.5259 7.99935 31.9987 7.99935Z'
            fill={color ? color : '#1A1F4C'}
          />
          <path
            d='M48.528 16.2V15.144H51.424V12.392H52.576V15.144H55.472V16.2H52.576V18.952H51.424V16.2H48.528Z'
            fill={color ? color : '#1A1F4C'}
          />
          <path
            d='M71.9987 10.6673C73.4715 10.6673 74.6654 9.47341 74.6654 8.00065C74.6654 6.52789 73.4715 5.33398 71.9987 5.33398C70.5259 5.33398 69.332 6.52789 69.332 8.00065C69.332 9.47341 70.5259 10.6673 71.9987 10.6673Z'
            fill={color ? color : '#1A1F4C'}
          />
          <path
            d='M74.6656 12H69.3323C69.1253 12 68.9211 12.0482 68.736 12.1408C68.5509 12.2333 68.3898 12.3677 68.2656 12.5333L64.2656 17.8667L66.399 19.4667L67.999 17.3333V26.6667H70.6656V21.3333H73.3323V26.6667H75.999V17.3333L77.599 19.4667L79.7323 17.8667L75.7323 12.5333C75.6081 12.3677 75.4471 12.2333 75.2619 12.1408C75.0768 12.0482 74.8726 12 74.6656 12Z'
            fill={color ? color : '#1A1F4C'}
          />
        </svg>
      );
    case 'parentsChld':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 88 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M18.668 9.33398H13.3346C11.868 9.33398 10.668 10.534 10.668 12.0007V18.6673C10.668 19.4007 11.268 20.0007 12.0013 20.0007H13.3346V28.0007C13.3346 28.734 13.9346 29.334 14.668 29.334H17.3346C18.068 29.334 18.668 28.734 18.668 28.0007V20.0007H20.0013C20.7346 20.0007 21.3346 19.4007 21.3346 18.6673V12.0007C21.3346 10.534 20.1346 9.33398 18.668 9.33398Z'
            fill={color ? color : '#1A1F4C'}
          />
          <path
            d='M15.9987 7.99935C17.4715 7.99935 18.6654 6.80544 18.6654 5.33268C18.6654 3.85992 17.4715 2.66602 15.9987 2.66602C14.5259 2.66602 13.332 3.85992 13.332 5.33268C13.332 6.80544 14.5259 7.99935 15.9987 7.99935Z'
            fill={color ? color : '#1A1F4C'}
          />
          <path
            d='M34.668 9.33398H29.3346C27.868 9.33398 26.668 10.534 26.668 12.0007V18.6673C26.668 19.4007 27.268 20.0007 28.0013 20.0007H29.3346V28.0007C29.3346 28.734 29.9346 29.334 30.668 29.334H33.3346C34.068 29.334 34.668 28.734 34.668 28.0007V20.0007H36.0013C36.7346 20.0007 37.3346 19.4007 37.3346 18.6673V12.0007C37.3346 10.534 36.1346 9.33398 34.668 9.33398Z'
            fill={color ? color : '#1A1F4C'}
          />
          <path
            d='M31.9987 7.99935C33.4715 7.99935 34.6654 6.80544 34.6654 5.33268C34.6654 3.85992 33.4715 2.66602 31.9987 2.66602C30.5259 2.66602 29.332 3.85992 29.332 5.33268C29.332 6.80544 30.5259 7.99935 31.9987 7.99935Z'
            fill={color ? color : '#1A1F4C'}
          />
          <path
            d='M48.528 16.2V15.144H51.424V12.392H52.576V15.144H55.472V16.2H52.576V18.952H51.424V16.2H48.528Z'
            fill={color ? color : '#1A1F4C'}
          />
          <path
            d='M71.9987 10.6673C73.4715 10.6673 74.6654 9.47341 74.6654 8.00065C74.6654 6.52789 73.4715 5.33398 71.9987 5.33398C70.5259 5.33398 69.332 6.52789 69.332 8.00065C69.332 9.47341 70.5259 10.6673 71.9987 10.6673Z'
            fill={color ? color : '#1A1F4C'}
          />
          <path
            d='M74.6656 12H69.3323C69.1253 12 68.9211 12.0482 68.736 12.1408C68.5509 12.2333 68.3898 12.3677 68.2656 12.5333L64.2656 17.8667L66.399 19.4667L67.999 17.3333V26.6667H70.6656V21.3333H73.3323V26.6667H75.999V17.3333L77.599 19.4667L79.7323 17.8667L75.7323 12.5333C75.6081 12.3677 75.4471 12.2333 75.2619 12.1408C75.0768 12.0482 74.8726 12 74.6656 12Z'
            fill={color ? color : '#1A1F4C'}
          />
        </svg>
      );
    case 'back-arrow':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 44 44'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='44' height='44' rx='22' fill='#FEFEFE' />
          <path
            d='M18.414 23.3426L22.364 27.2926C22.5462 27.4812 22.647 27.7338 22.6447 27.996C22.6424 28.2582 22.5372 28.509 22.3518 28.6944C22.1664 28.8798 21.9156 28.985 21.6534 28.9873C21.3912 28.9895 21.1386 28.8888 20.95 28.7066L15.293 23.0496C15.1998 22.9569 15.1259 22.8468 15.0754 22.7254C15.0249 22.6041 14.999 22.474 14.999 22.3426C14.999 22.2112 15.0249 22.0811 15.0754 21.9597C15.1259 21.8384 15.1998 21.7282 15.293 21.6356L20.95 15.9786C21.0422 15.8831 21.1526 15.8069 21.2746 15.7545C21.3966 15.7021 21.5278 15.6745 21.6606 15.6733C21.7934 15.6722 21.9251 15.6975 22.048 15.7478C22.1709 15.7981 22.2825 15.8723 22.3764 15.9662C22.4703 16.0601 22.5445 16.1717 22.5948 16.2946C22.6451 16.4175 22.6704 16.5492 22.6693 16.682C22.6681 16.8148 22.6405 16.946 22.5881 17.068C22.5357 17.19 22.4595 17.3003 22.364 17.3926L18.414 21.3426L28 21.3426C28.2652 21.3426 28.5196 21.4479 28.7071 21.6355C28.8946 21.823 29 22.0774 29 22.3426C29 22.6078 28.8946 22.8622 28.7071 23.0497C28.5196 23.2372 28.2652 23.3426 28 23.3426L18.414 23.3426Z'
            fill='#1C3003'
          />
        </svg>
      );
    case 'google':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 21 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10.5371 19.998C7.84077 19.9592 5.2672 18.8645 3.36911 16.949C2.44139 16.0131 1.70985 14.9015 1.21736 13.6792C0.72488 12.4569 0.48137 11.1486 0.501111 9.831C0.563513 7.20067 1.66519 4.70212 3.56511 2.882C5.4888 1.03895 8.04802 0.00695449 10.7121 0H10.8881C13.3331 0.0121352 15.6878 0.924977 17.5021 2.564L14.9571 4.88C13.8191 3.86847 12.3487 3.31105 10.8261 3.314C9.0408 3.30745 7.32245 3.99314 6.03211 5.227C5.40104 5.83009 4.89548 6.55203 4.54451 7.35126C4.19355 8.1505 4.00411 9.01126 3.98711 9.884C3.97298 10.7566 4.13204 11.6233 4.45508 12.434C4.77813 13.2447 5.25874 13.9833 5.86911 14.607C7.11725 15.8819 8.81072 16.6238 10.5941 16.677H10.7371C12.1471 16.749 13.5371 16.323 14.6541 15.477C15.7657 14.6395 16.5371 13.4284 16.8261 12.067L16.8691 11.95H10.7201V8.54H20.3981C20.4734 9.158 20.5068 9.77767 20.4981 10.399C20.3991 16.14 16.4811 19.999 10.7521 19.999L10.5371 19.998Z'
            fill={color ? color : '#FEFEFE'}
          />
        </svg>
      );
    case 'vkontakte':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 22 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M11.9825 13.7277C4.46596 13.7277 0.178638 8.57464 0 0H3.76515C3.88882 6.29357 6.66459 8.9594 8.86321 9.50906V0H12.4085V5.42786C14.5796 5.19425 16.8607 2.7208 17.6302 0H21.1755C20.8855 1.41108 20.3075 2.74716 19.4776 3.92464C18.6477 5.10213 17.5837 6.09571 16.3523 6.84322C17.7269 7.52625 18.941 8.49302 19.9145 9.67972C20.888 10.8664 21.5988 12.2461 22 13.7277H18.0974C17.7373 12.4408 17.0054 11.2889 15.9934 10.4162C14.9814 9.54352 13.7343 8.98895 12.4085 8.82199V13.7277H11.9825Z'
            fill={color ? color : '#FEFEFE'}
          />
        </svg>
      );
    case 'yandex':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 11 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M8.2507 2.52795H7.02228C4.7702 2.52795 3.58565 3.61137 3.58565 5.20873C3.58565 7.01444 4.4046 7.86047 6.08635 8.94516L7.47563 9.83412L3.48329 15.5H0.5L4.08287 10.4314C2.02222 9.0285 0.865599 7.66601 0.865599 5.36152C0.865599 2.47239 2.98607 0.5 7.00766 0.5H11V15.4861H8.2507V2.52795Z'
            fill={color ? color : '#FEFEFE'}
          />
        </svg>
      );
    case 'room-guests':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 36 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M15.752 7H11.252C10.0145 7 9.00195 7.9 9.00195 9V14C9.00195 14.55 9.5082 15 10.127 15H11.252V21C11.252 21.55 11.7582 22 12.377 22H14.627C15.2457 22 15.752 21.55 15.752 21V15H16.877C17.4957 15 18.002 14.55 18.002 14V9C18.002 7.9 16.9895 7 15.752 7Z'
            fill='#1A1F4C'
          />
          <path
            d='M13.498 6C14.7407 6 15.748 5.10457 15.748 4C15.748 2.89543 14.7407 2 13.498 2C12.2554 2 11.248 2.89543 11.248 4C11.248 5.10457 12.2554 6 13.498 6Z'
            fill='#1A1F4C'
          />
          <path
            d='M25.584 7H21.4173C20.2715 7 19.334 7.9 19.334 9V14C19.334 14.55 19.8027 15 20.3757 15H21.4173V21C21.4173 21.55 21.8861 22 22.459 22H24.5423C25.1152 22 25.584 21.55 25.584 21V15H26.6257C27.1986 15 27.6673 14.55 27.6673 14V9C27.6673 7.9 26.7298 7 25.584 7Z'
            fill='#1A1F4C'
          />
          <path
            d='M23.4993 6C24.6499 6 25.5827 5.10457 25.5827 4C25.5827 2.89543 24.6499 2 23.4993 2C22.3488 2 21.416 2.89543 21.416 4C21.416 5.10457 22.3488 6 23.4993 6Z'
            fill='#1A1F4C'
          />
        </svg>
      );
    case 'bed':
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2 20V12C2 11.4696 2.21071 10.9609 2.58579 10.5858C2.96086 10.2107 3.46957 10 4 10H20C20.5304 10 21.0391 10.2107 21.4142 10.5858C21.7893 10.9609 22 11.4696 22 12V20'
            stroke='#1A1F4C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M4 10V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V10'
            stroke='#1A1F4C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12 4V10'
            stroke='#1A1F4C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M2 18H22'
            stroke='#1A1F4C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'square_room':
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M21.2944 15.2947C21.518 15.5176 21.6955 15.7824 21.8166 16.0741C21.9377 16.3657 22 16.6783 22 16.9941C22 17.3098 21.9377 17.6225 21.8166 17.9141C21.6955 18.2057 21.518 18.4705 21.2944 18.6934L18.6954 21.2924C18.4725 21.5161 18.2076 21.6935 17.916 21.8146C17.6244 21.9357 17.3118 21.998 16.996 21.998C16.6803 21.998 16.3676 21.9357 16.076 21.8146C15.7844 21.6935 15.5196 21.5161 15.2967 21.2924L2.70149 8.69724C2.25222 8.24579 2 7.6348 2 6.99789C2 6.36098 2.25222 5.74999 2.70149 5.29854L5.30049 2.69953C5.75194 2.25026 6.36294 1.99805 6.99984 1.99805C7.63675 1.99805 8.24774 2.25026 8.69919 2.69953L21.2944 15.2947Z'
            stroke='#1A1F4C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M14.5 12.5L16.5 10.5'
            stroke='#1A1F4C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M11.5 9.5L13.5 7.5'
            stroke='#1A1F4C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M8.5 6.5L10.5 4.5'
            stroke='#1A1F4C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M17.5 15.5L19.5 13.5'
            stroke='#1A1F4C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'icutlery_items':
      return (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2.5 1.66602V7.49935C2.5 8.41602 3.25 9.16602 4.16667 9.16602H7.5C7.94203 9.16602 8.36595 8.99042 8.67851 8.67786C8.99107 8.3653 9.16667 7.94138 9.16667 7.49935V1.66602'
            stroke='#1A1F4C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M5.83398 1.66602V18.3327'
            stroke='#1A1F4C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M17.5007 12.4993V1.66602C16.3956 1.66602 15.3358 2.105 14.5544 2.8864C13.773 3.66781 13.334 4.72761 13.334 5.83268V10.8327C13.334 11.7493 14.084 12.4993 15.0007 12.4993H17.5007ZM17.5007 12.4993V18.3327'
            stroke='#1A1F4C'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    case 'room_guest_child':
      return (
        <svg
          width={width}
          height={height}
          viewBox='0 0 33 32'
          strokeWidth={strokeWidth}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M16.6667 10.6673C18.1394 10.6673 19.3333 9.47341 19.3333 8.00065C19.3333 6.52789 18.1394 5.33398 16.6667 5.33398C15.1939 5.33398 14 6.52789 14 8.00065C14 9.47341 15.1939 10.6673 16.6667 10.6673Z'
            fill='#1A1F4C'
          />
          <path
            d='M19.3336 12H14.0003C13.7933 12 13.5891 12.0482 13.404 12.1408C13.2188 12.2333 13.0578 12.3677 12.9336 12.5333L8.93359 17.8667L11.0669 19.4667L12.6669 17.3333V26.6667H15.3336V21.3333H18.0003V26.6667H20.6669V17.3333L22.2669 19.4667L24.4003 17.8667L20.4003 12.5333C20.2761 12.3677 20.115 12.2333 19.9299 12.1408C19.7447 12.0482 19.5406 12 19.3336 12Z'
            fill='#1A1F4C'
          />
        </svg>
      );
    case 'eat':
      return (
        <svg
          className={className ?? ''}
          width={width}
          height={height}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M3 2V9C3 10.1 3.9 11 5 11H9C9.53043 11 10.0391 10.7893 10.4142 10.4142C10.7893 10.0391 11 9.53043 11 9V2'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M7 2V22'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M21 15V2C19.6739 2 18.4021 2.52678 17.4645 3.46447C16.5268 4.40215 16 5.67392 16 7V13C16 14.1 16.9 15 18 15H21ZM21 15V22'
            stroke={color ? color : '#1A1F4C'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
  }
}
