import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Head from 'next/head';
import './globals.css';

import StoreProvider from '@/rtk/StoreProvider';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

const futura = localFont({
  src: [
    {
      path: './fonts/FuturaPTBook.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/FuturaPT-Medium.woff',
      weight: '500',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Куда угодно',
  description: 'Сайт бронирования туров и отелей',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang='ru'>
        <Head>
          <link
            rel='icon'
            href='/icon?<generated>'
            type='image/<generated>'
            sizes='<generated>'
          />
          <link
            rel='prefetch'
            href='/fonts/FuturaPTBook.otf'
            as='font'
            type='font/otf'
            crossOrigin='anonymous'
          />
          <link rel='prefetch' href='/globals.css' as='style' />
        </Head>
        <body className={`${futura.className} flex min-h-screen flex-col`}>
          <Header />
          <main className='grow'> {children}</main>
          <Footer className='shrink-0' />
          <div id='modal'></div>
        </body>
      </html>
    </StoreProvider>
  );
}
