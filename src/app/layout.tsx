import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import StoreProvider from './rtk/StoreProvider';

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
        <body className={`${futura.className} flex min-h-screen flex-col`}>
          <Header />
          <main className='grow'> {children}</main>
          <Footer className='shrink-0' />
        </body>
      </html>
    </StoreProvider>
  );
}
