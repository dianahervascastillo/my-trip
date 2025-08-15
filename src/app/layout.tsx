import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './css/app.scss';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'My trip',
  description: 'A page displaying my current trip information'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.variable}`}>{children}</body>
    </html>
  );
}
