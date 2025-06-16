import localFont from 'next/font/local';

export const futura = localFont({
  src: [
    {
      path: './FuturaPTBook.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './FuturaPT-Medium.woff',
      weight: '500',
      style: 'normal',
    },
  ],
});
