import localFont from 'next/font/local';

export const jost = localFont({
  src: [
    {
      path: './fonts/Jost-300-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Jost-300-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Jost-400-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Jost-400-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Jost-500-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Jost-500-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Jost-600-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Jost-600-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Jost-700-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Jost-700-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
});
