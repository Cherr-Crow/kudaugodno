import type { Metadata } from 'next';
import Head from 'next/head';
import './globals.css';

import StoreProvider from '@/rtk/StoreProvider';
import { AdaptiveToastContainer } from '@/shared/ui/toast/AdaptiveToastContainer';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import { jost } from './fonts';

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
      <html lang='ru' className={jost.className}>
        <Head>
          <link
            rel='icon'
            href='/icon?<generated>'
            type='image/<generated>'
            sizes='<generated>'
          />
          <link rel='prefetch' href='/globals.css' as='style' />
        </Head>
        <body className='flex min-h-screen flex-col'>
          <Header />
          <main className='grow'> {children}</main>
          <AdaptiveToastContainer />
          <Footer className='shrink-0' />
          <div id='modal'></div>
        </body>
      </html>
    </StoreProvider>
  );
}
