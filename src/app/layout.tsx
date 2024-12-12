import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const futura = localFont({
  src: [
    {
      path: './fonts/FuturaPTBook.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/FuturaPTMedium.otf',
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
    <html lang='ru'>
      <body className={futura.className}>{children}</body>
    </html>
  );
}
